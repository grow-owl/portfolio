import { NextResponse } from "next/server";
import { readCalendars, getCalendarByClient } from "../../../lib/calendars.js";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const clientId = url.searchParams.get("client");

    if (clientId) {
      const calendar = getCalendarByClient(clientId);
      if (!calendar) {
        return NextResponse.json(
          { success: false, message: "Calendar not found." },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, calendar });
    }

    const all = readCalendars();
    return NextResponse.json({ success: true, calendars: all });
  } catch (err) {
    console.error("Public calendar fetch error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch calendar." },
      { status: 500 }
    );
  }
}
