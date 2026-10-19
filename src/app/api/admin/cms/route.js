import { NextResponse } from "next/server";
import { getCmsData, saveCmsData, resetCmsData, DEFAULTS } from "../../../../lib/cms";

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "growowl2026";

function verifyAdmin(request) {
  const authHeader = request.headers.get("x-admin-passcode");
  const url = new URL(request.url);
  const authQuery = url.searchParams.get("passcode");
  const provided = authHeader || authQuery;
  return Boolean(provided && provided === ADMIN_PASSCODE);
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const collection = url.searchParams.get("collection");

    if (collection) {
      if (!DEFAULTS[collection]) {
        return NextResponse.json(
          { success: false, message: `Invalid collection: ${collection}` },
          { status: 400 }
        );
      }
      const data = await getCmsData(collection);
      return NextResponse.json({ success: true, collection, data });
    }

    // Return all collections if no specific collection requested
    const allData = {};
    for (const key of Object.keys(DEFAULTS)) {
      allData[key] = await getCmsData(key);
    }

    return NextResponse.json({ success: true, data: allData });
  } catch (error) {
    console.error("GET /api/admin/cms error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch CMS content" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    if (!verifyAdmin(request)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Valid Admin Passcode required." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { collection, data, action = "save" } = body;

    if (!collection || !DEFAULTS[collection]) {
      return NextResponse.json(
        { success: false, message: `Invalid or missing collection: ${collection}` },
        { status: 400 }
      );
    }

    if (action === "reset") {
      const resetData = await resetCmsData(collection);
      return NextResponse.json({
        success: true,
        message: `Reset ${collection} to default values`,
        data: resetData,
      });
    }

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Missing data payload" },
        { status: 400 }
      );
    }

    const savedData = await saveCmsData(collection, data);

    return NextResponse.json({
      success: true,
      message: `Successfully saved ${collection}`,
      data: savedData,
    });
  } catch (error) {
    console.error("POST /api/admin/cms error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to save CMS content" },
      { status: 500 }
    );
  }
}
