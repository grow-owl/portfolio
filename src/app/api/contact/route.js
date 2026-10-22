import { NextResponse } from "next/server";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import { z } from "zod";
import { checkRateLimit } from "../../../lib/ratelimit";
import { verifyTurnstileToken } from "../../../lib/turnstile";
import { sendApplicationConfirmationEmail } from "../../../lib/brevo";
import { saveInternshipApplication } from "../../../lib/supabase";
import { saveClientLead } from "../../../lib/leads";

// Strict Zod validation schema
const contactSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Please provide a valid email address")
    .max(254, "Email is too long"),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number is too long")
    .optional()
    .default("Not provided"),
  service: z
    .string()
    .trim()
    .max(100, "Service name is too long")
    .optional()
    .default("Website Development"),
  message: z
    .string({ required_error: "Message is required" })
    .trim()
    .min(10, "Message must be at least 10 characters long")
    .max(3000, "Message must not exceed 3000 characters"),
  turnstileToken: z.string().optional(),
  website_url_hp: z.string().optional(), // Honeypot trap field
  resume: z
    .object({
      filename: z.string().max(255),
      content: z.string(),
    })
    .optional(),
});

function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  if (cfConnectingIp) return cfConnectingIp.trim();
  if (forwarded) return forwarded.split(",")[0].trim();
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

export async function POST(request) {
  try {
    const clientIp = getClientIp(request);

    // 1. Rate Limiting Check (Max 5 attempts per 15 minutes per IP)
    const rateLimit = await checkRateLimit(clientIp);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many submission attempts. Please wait 15 minutes or reach us directly on WhatsApp.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": "900",
            "X-RateLimit-Limit": String(rateLimit.limit),
            "X-RateLimit-Remaining": String(rateLimit.remaining),
            "X-RateLimit-Reset": String(rateLimit.reset),
          },
        }
      );
    }

    // 2. Request body parsing
    let rawBody;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    // 3. Honeypot check (Automated spam bots fill all fields)
    if (rawBody.website_url_hp && rawBody.website_url_hp.trim() !== "") {
      console.warn(`Spam bot caught by honeypot from IP: ${clientIp}`);
      return NextResponse.json({
        success: true,
        message: "Message received.",
      });
    }

    // 4. Server-side Zod Schema Validation
    const validation = contactSchema.safeParse(rawBody);
    if (!validation.success) {
      const firstError =
        validation.error.issues[0]?.message || "Invalid input data.";
      return NextResponse.json(
        { success: false, message: firstError },
        { status: 422 }
      );
    }

    const { name, email, phone, service, message, turnstileToken, resume } =
      validation.data;

    // 5. Cloudflare Turnstile Anti-Bot Verification
    const turnstileResult = await verifyTurnstileToken(
      turnstileToken,
      clientIp
    );
    if (!turnstileResult.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            turnstileResult.message || "Security verification failed.",
        },
        { status: 403 }
      );
    }

    // 5.5. Persist Internship Application in Database (Supabase) with Sanity & Threat Screening
    const isInternshipSubmission = service?.includes("Internship") || Boolean(resume?.content);
    if (isInternshipSubmission) {
      try {
        const userAgent = request.headers.get("user-agent") || "";
        let role = "Video Editor Intern";
        if (service?.toLowerCase().includes("full-stack") || service?.toLowerCase().includes("developer")) {
          role = "Full-Stack Developer Intern";
        } else if (service?.toLowerCase().includes("video")) {
          role = "Video Editor Intern";
        }

        const portfolioMatch = message?.match(/Portfolio \/ Drive \/ GitHub Link:\s*(.*)/i);
        const portfolioUrl = portfolioMatch ? portfolioMatch[1].trim() : "";

        await saveInternshipApplication({
          name,
          email,
          phone,
          role,
          portfolio: portfolioUrl !== "None provided" ? portfolioUrl : "",
          message,
          resume,
          ip: clientIp,
          userAgent,
        });
      } catch (dbErr) {
        console.error("Non-fatal: Failed to save application in database:", dbErr);
      }
    } else {
      // 5.6. Persist Client Enquiry / Business Lead (Saved in Database & Local CMS)
      try {
        const userAgent = request.headers.get("user-agent") || "";
        await saveClientLead({
          name,
          email,
          phone,
          service,
          message,
          ip: clientIp,
          userAgent,
        });
      } catch (leadErr) {
        console.error("Non-fatal: Failed to save client lead:", leadErr);
      }
    }

    // 6. Dual Email Dispatch (Primary: Resend, Fallback: Brevo SMTP)
    const resendApiKey = process.env.RESEND_API_KEY;
    const brevoSmtpKey = process.env.BREVO_SMTP_KEY;
    const recipientEmail =
      process.env.CONTACT_EMAIL_TO || "admin.growowl@gmail.com";

    const hasResend = resendApiKey && !resendApiKey.includes("your_resend");
    const hasBrevo = brevoSmtpKey && !brevoSmtpKey.includes("your_brevo");

    if (!hasResend && !hasBrevo) {
      console.warn("Neither RESEND_API_KEY nor BREVO_SMTP_KEY is configured.");
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          {
            success: false,
            message:
              "Email service is temporarily undergoing maintenance. Please reach us via WhatsApp or Phone.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        preview: true,
        message:
          "Message received (Development Demo Mode - Email API keys unset).",
      });
    }

    const emailSubject = `New Lead: ${name} (${service}) - GrowOwl Website`;
    const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; }
            .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
            .header { background: #0f172a; padding: 24px; color: #ffffff; text-align: center; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
            .header p { margin: 6px 0 0 0; color: #94a3b8; font-size: 13px; }
            .body { padding: 28px 24px; color: #1e293b; }
            .field { margin-bottom: 20px; }
            .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; color: #64748b; margin-bottom: 4px; }
            .value { font-size: 15px; font-weight: 500; color: #0f172a; line-height: 1.5; }
            .message-box { background: #f1f5f9; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; }
            .badge { display: inline-block; background: #ffe4e6; color: #e11d48; font-weight: 600; font-size: 12px; padding: 4px 10px; border-radius: 9999px; }
            .footer { padding: 16px 24px; background: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; font-size: 12px; color: #94a3b8; }
            .btn { display: inline-block; background: #e11d48; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 9999px; font-size: 13px; font-weight: 600; margin-top: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>GrowOwl Lead Alert 🚀</h1>
              <p>New enquiry received via growowl.online contact form</p>
            </div>
            <div class="body">
              <div class="field">
                <div class="label">Interested Service</div>
                <div class="value"><span class="badge">${service}</span></div>
              </div>
              <div class="field">
                <div class="label">Client Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Phone / Contact</div>
                <div class="value">${phone}</div>
              </div>
              ${
                resume?.filename
                  ? `
              <div class="field">
                <div class="label">Attached Resume</div>
                <div class="value">📄 ${resume.filename} (Attached to this email)</div>
              </div>
              `
                  : ""
              }
              <div class="field">
                <div class="label">Project Details / Message</div>
                <div class="message-box">${message}</div>
              </div>
              <div style="text-align: center; margin-top: 24px;">
                <a href="mailto:${email}?subject=Re:%20Your%20GrowOwl%20Enquiry%20(${encodeURIComponent(service)})" class="btn">Reply to ${name} Directly</a>
              </div>
            </div>
            <div class="footer">
              Submitted from IP: ${clientIp} • Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
            </div>
          </div>
        </body>
        </html>
    `;

    let emailSent = false;
    let dispatchId = null;
    let lastError = null;

    // Attempt 1: Resend
    if (hasResend) {
      try {
        const resend = new Resend(resendApiKey);
        const emailPayload = {
          from: "GrowOwl Leads <onboarding@resend.dev>",
          to: [recipientEmail],
          replyTo: email,
          subject: emailSubject,
          html: emailHtml,
        };

        if (resume?.filename && resume?.content) {
          emailPayload.attachments = [
            {
              filename: resume.filename,
              content: resume.content,
            },
          ];
        }

        let { data, error } = await resend.emails.send(emailPayload);

        // Auto-recovery for Resend free tier if recipient email doesn't match account owner email
        if (
          error &&
          error.message &&
          error.message.includes("You can only send testing emails to your own email address") &&
          recipientEmail !== "admin.growowl@gmail.com"
        ) {
          console.warn("Retrying Resend delivery with verified account owner email admin.growowl@gmail.com...");
          const retryRes = await resend.emails.send({
            ...emailPayload,
            to: ["admin.growowl@gmail.com"],
          });
          data = retryRes.data;
          error = retryRes.error;
        }

        if (!error && data?.id) {
          emailSent = true;
          dispatchId = data.id;
        } else {
          lastError = error;
          console.warn("Resend delivery failed, checking Brevo fallback:", error);
        }
      } catch (err) {
        lastError = err;
        console.warn("Resend threw exception, trying Brevo fallback:", err);
      }
    }

    // Attempt 2: Brevo SMTP Fallback
    if (!emailSent && hasBrevo) {
      try {
        const brevoUser =
          process.env.BREVO_SMTP_USER || "admin.growowl@gmail.com";
        const transporter = nodemailer.createTransport({
          host: "smtp-relay.brevo.com",
          port: 587,
          secure: false, // TLS
          auth: {
            user: brevoUser,
            pass: brevoSmtpKey,
          },
        });

        const mailOptions = {
          from: `"GrowOwl Leads" <${brevoUser}>`,
          to: recipientEmail,
          replyTo: email,
          subject: emailSubject,
          html: emailHtml,
          attachments:
            resume?.filename && resume?.content
              ? [
                  {
                    filename: resume.filename,
                    content: Buffer.from(resume.content, "base64"),
                  },
                ]
              : [],
        };

        const info = await transporter.sendMail(mailOptions);
        if (info?.messageId) {
          emailSent = true;
          dispatchId = info.messageId;
        }
      } catch (brevoErr) {
        console.error("Brevo SMTP delivery failed:", brevoErr);
        lastError = brevoErr;
      }
    }

    if (!emailSent) {
      console.error("All email delivery providers failed:", lastError);
      return NextResponse.json(
        {
          success: false,
          message:
            "Could not deliver email. Please reach out to us directly on WhatsApp or phone.",
        },
        { status: 500 }
      );
    }

    // 7. If this is an Internship application, send automated confirmation email to applicant via Brevo (noreply)
    const isInternship =
      service &&
      (service.toLowerCase().includes("internship") ||
        service.toLowerCase().includes("intern"));

    if (isInternship && email) {
      try {
        const roleMatch = service.match(/Internship Application\s*—\s*(.+)/i);
        const roleName = roleMatch ? roleMatch[1].trim() : service;

        await sendApplicationConfirmationEmail({
          name,
          email,
          role: roleName,
        });
      } catch (confirmErr) {
        console.warn("[Brevo Confirmation] Could not send applicant confirmation email:", confirmErr);
      }
    }

    return NextResponse.json({
      success: true,
      message:
        "Message sent successfully! We will get back to you within 30 minutes.",
      id: dispatchId,
    });
  } catch (err) {
    console.error("API contact submission error:", err);
    return NextResponse.json(
      {
        success: false,
        message:
          "An internal error occurred. Please try again or reach out on WhatsApp.",
      },
      { status: 500 }
    );
  }
}
