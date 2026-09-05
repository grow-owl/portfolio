import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const accessKey =
      process.env.SPLITFORMS_KEY || process.env.NEXT_PUBLIC_SPLITFORMS_KEY;

    if (!accessKey) {
      console.warn("SPLITFORMS_KEY or NEXT_PUBLIC_SPLITFORMS_KEY not configured.");
      // In development / preview, allow demonstration response
      return NextResponse.json({
        success: true,
        preview: true,
        message: "Message received (demo mode).",
      });
    }

    const response = await fetch("https://splitforms.com/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: body.name,
        email: body.email,
        phone: body.phone || "Not provided",
        service: body.service || "Website Development",
        message: body.message,
      }),
    });

    const result = await response.json().catch(() => ({}));

    if (response.ok && result.success !== false) {
      return NextResponse.json({
        success: true,
        message: "Message sent successfully!",
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: result.message || "Failed to send message via SplitForms.",
      },
      { status: response.status || 400 }
    );
  } catch (err) {
    console.error("API contact submission error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
