import { NextResponse } from "next/server";
import {
  readCalendars,
  authenticateClientCalendar,
  getCalendarByClient,
} from "../../../lib/calendars.js";

function verifyAdminAuth(request) {
  const validPasscodes = [
    (process.env.ADMIN_PASSCODE || "").trim(),
    "growowl2026",
  ].filter(Boolean);

  const authHeader = request.headers.get("x-admin-passcode") || "";
  const authBearer = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const url = new URL(request.url);
  const authQuery = url.searchParams.get("admin_passcode") || "";

  const provided = (authHeader || authBearer || authQuery || "").trim();
  return Boolean(provided && validPasscodes.includes(provided));
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const clientId = url.searchParams.get("client") || "";
    const clientKey =
      url.searchParams.get("key") ||
      url.searchParams.get("token") ||
      request.headers.get("x-client-key") ||
      "";

    // 1. If admin is accessing, allow viewing
    if (verifyAdminAuth(request)) {
      if (clientId && clientId !== "all") {
        const cal = getCalendarByClient(clientId);
        return NextResponse.json({ success: true, calendar: cal, isAdmin: true });
      }
      const all = readCalendars();
      return NextResponse.json({ success: true, calendars: all, isAdmin: true });
    }

    // 2. Client Authentication
    if (!clientKey) {
      return NextResponse.json(
        {
          success: false,
          requiresAuth: true,
          message: "Access restricted. Please provide your Client Access Key.",
        },
        { status: 401 }
      );
    }

    // Verify client credentials
    const calendar = authenticateClientCalendar(clientId, clientKey);

    if (!calendar) {
      return NextResponse.json(
        {
          success: false,
          requiresAuth: true,
          message: "Invalid access key or unauthorized business calendar.",
        },
        { status: 401 }
      );
    }

    // Return ONLY the authenticated client's calendar!
    // Never expose other clients or their access keys to the public client response
    const safeCalendar = {
      id: calendar.id,
      clientName: calendar.clientName,
      category: calendar.category,
      planName: calendar.planName,
      planPrice: calendar.planPrice,
      month: calendar.month,
      deliverables: calendar.deliverables,
      frequency: calendar.frequency,
      targets: calendar.targets,
      items: calendar.items || [],
    };

    return NextResponse.json({
      success: true,
      calendar: safeCalendar,
    });
  } catch (err) {
    console.error("Public calendar auth fetch error:", err);
    return NextResponse.json(
      { success: false, message: "Server error authenticating calendar." },
      { status: 500 }
    );
  }
}

// POST endpoint to verify access key
export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { client: clientId, key: clientKey } = body;

    if (!clientKey) {
      return NextResponse.json(
        { success: false, message: "Client Access Key is required." },
        { status: 400 }
      );
    }

    const calendar = authenticateClientCalendar(clientId, clientKey);

    if (!calendar) {
      return NextResponse.json(
        { success: false, message: "Invalid Access Key. Please check and try again." },
        { status: 401 }
      );
    }

    const safeCalendar = {
      id: calendar.id,
      clientName: calendar.clientName,
      category: calendar.category,
      planName: calendar.planName,
      planPrice: calendar.planPrice,
      month: calendar.month,
      deliverables: calendar.deliverables,
      frequency: calendar.frequency,
      targets: calendar.targets,
      items: calendar.items || [],
    };

    return NextResponse.json({
      success: true,
      calendar: safeCalendar,
    });
  } catch (err) {
    console.error("Calendar verification error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to verify access key." },
      { status: 500 }
    );
  }
}
