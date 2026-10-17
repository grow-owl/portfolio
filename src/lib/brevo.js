import nodemailer from "nodemailer";

/**
 * Builds a responsive, beautifully branded HTML email for internship applicants.
 */
export function generateApplicationConfirmationHtml({ name, role }) {
  const safeName = name ? name.trim() : "Applicant";
  const safeRole = role ? role.trim() : "Internship Position";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received - GrowOwl Careers</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f3f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e1e1e;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f3f0; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 580px; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid rgba(30, 30, 30, 0.08); box-shadow: 0 8px 30px rgba(0,0,0,0.04);">
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #0a0a0a; padding: 32px 28px; text-align: center;">
              <span style="display: inline-block; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.03em; margin-bottom: 8px;">
                Grow<span style="color: #fc3637;">Owl</span> Careers
              </span>
              <p style="margin: 6px 0 0 0; color: rgba(255, 255, 255, 0.7); font-size: 13px; font-weight: 500;">
                Application Confirmation & Next Steps
              </p>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 32px 28px;">
              <div style="display: inline-block; padding: 6px 14px; background: rgba(252, 54, 55, 0.1); border-radius: 9999px; font-size: 11px; font-weight: 700; color: #fc3637; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px;">
                ✓ Application Received
              </div>

              <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #1e1e1e; line-height: 1.3;">
                Hi ${safeName}, we’ve received your application!
              </h1>

              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: rgba(30, 30, 30, 0.8);">
                Thank you for applying for the <strong>${safeRole}</strong> at GrowOwl. We’re excited that you want to gain practical hands-on experience and build real-world digital solutions with us.
              </p>

              <!-- Position Card Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #fbf9f6; border: 1px solid rgba(30, 30, 30, 0.08); border-radius: 14px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(30, 30, 30, 0.5); font-weight: 700; margin-bottom: 4px;">Applied Role</div>
                    <div style="font-size: 16px; font-weight: 700; color: #1e1e1e; margin-bottom: 14px;">${safeRole}</div>

                    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(30, 30, 30, 0.5); font-weight: 700; margin-bottom: 4px;">Current Status</div>
                    <div style="font-size: 14px; font-weight: 600; color: #16a34a;">
                      ● Under Review by GrowOwl Team
                    </div>
                  </td>
                </tr>
              </table>

              <h2 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #1e1e1e;">
                What happens next?
              </h2>
              <ol style="margin: 0 0 24px 0; padding-left: 20px; font-size: 14px; line-height: 1.65; color: rgba(30, 30, 30, 0.75);">
                <li style="margin-bottom: 8px;">
                  <strong>Review:</strong> Our lead team will review your resume, past projects, and portfolio links.
                </li>
                <li style="margin-bottom: 8px;">
                  <strong>Shortlisting:</strong> If your profile is shortlisted, we will reach out directly via WhatsApp or phone call for a short intro discussion.
                </li>
                <li>
                  <strong>Timeline:</strong> We review applications on a rolling basis, typically within 3–5 business days.
                </li>
              </ol>

              <div style="padding: 14px 18px; background-color: #ebe8e4; border-radius: 12px; font-size: 12px; line-height: 1.5; color: rgba(30, 30, 30, 0.7); margin-bottom: 24px;">
                ℹ️ <em>This is an automated confirmation sent from a no-reply address (<strong>noreply@growowl.online</strong>). Please do not reply directly to this email. If you have any urgent queries, reach us at <a href="mailto:admin.growowl@gmail.com" style="color: #fc3637; text-decoration: none; font-weight: 600;">admin.growowl@gmail.com</a>.</em>
              </div>

              <div style="text-align: center; margin-top: 10px;">
                <a href="https://www.growowl.online" style="display: inline-block; background: #fc3637; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 700; padding: 12px 28px; border-radius: 9999px; box-shadow: 0 4px 14px rgba(252,54,55,0.25);">
                  Explore GrowOwl Work →
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 28px; background-color: #0a0a0a; color: rgba(255, 255, 255, 0.6); text-align: center; font-size: 12px; line-height: 1.5;">
              <p style="margin: 0 0 6px 0; font-weight: 600; color: #ffffff;">
                GrowOwl Studio
              </p>
              <p style="margin: 0; font-size: 11px; color: rgba(255, 255, 255, 0.5);">
                We help brands scale through design, technology, and social storytelling. Siliguri, India.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Sends confirmation email using Brevo (REST API or SMTP Relay) with a noreply sender.
 */
export async function sendApplicationConfirmationEmail({ name, email, role }) {
  if (!email) {
    console.warn("[Brevo Confirmation] No recipient email provided.");
    return { success: false, reason: "No recipient email" };
  }

  const brevoApiKey = process.env.BREVO_API_KEY;
  const brevoSmtpKey = process.env.BREVO_SMTP_KEY;
  const brevoUser = process.env.BREVO_SMTP_USER || "admin.growowl@gmail.com";

  const emailSubject = `Application Received: ${role || "Internship"} — GrowOwl Careers`;
  const emailHtml = generateApplicationConfirmationHtml({ name, role });

  // 1. Try Brevo Transactional REST API if BREVO_API_KEY or key is present
  const apiKeyCandidate = brevoApiKey || (brevoSmtpKey?.startsWith("xkeysib-") ? brevoSmtpKey : null);
  if (apiKeyCandidate) {
    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": apiKeyCandidate,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: {
            name: "GrowOwl Careers",
            email: "noreply@growowl.online",
          },
          to: [
            {
              email,
              name: name || "Applicant",
            },
          ],
          replyTo: {
            email: "noreply@growowl.online",
            name: "GrowOwl No-Reply",
          },
          subject: emailSubject,
          htmlContent: emailHtml,
        }),
      });

      if (response.ok) {
        const result = await response.json().catch(() => ({}));
        console.log(`[Brevo API] Confirmation email sent successfully to ${email}. MessageId:`, result.messageId);
        return { success: true, method: "brevo-api", messageId: result.messageId };
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.warn("[Brevo API] Failed response:", response.status, errorData);
      }
    } catch (apiErr) {
      console.warn("[Brevo API] Network error:", apiErr.message);
    }
  }

  // 2. Try Brevo SMTP Relay via nodemailer
  if (brevoSmtpKey) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
          user: brevoUser,
          pass: brevoSmtpKey,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOptions = {
        from: '"GrowOwl Careers" <noreply@growowl.online>',
        to: email,
        replyTo: "noreply@growowl.online",
        subject: emailSubject,
        html: emailHtml,
      };

      const info = await transporter.sendMail(mailOptions);
      if (info?.messageId) {
        console.log(`[Brevo SMTP] Confirmation email delivered to ${email}. MessageId:`, info.messageId);
        return { success: true, method: "brevo-smtp", messageId: info.messageId };
      }
    } catch (smtpErr) {
      console.warn("[Brevo SMTP] Delivery error:", smtpErr.message);
    }
  }

  console.warn(`[Brevo Confirmation] Could not deliver confirmation email to ${email}. Please check Brevo credentials in .env.`);
  return { success: false, reason: "Brevo delivery failed" };
}
