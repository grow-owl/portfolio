import { NextResponse } from "next/server";
import {
  getInternshipApplications,
  updateApplicationStatus,
  getResumeSignedUrl,
  isSupabaseConfigured,
} from "../../../../lib/supabase";

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE;

function verifyAdminAuth(request) {
  if (!ADMIN_PASSCODE) {
    console.error("ADMIN_PASSCODE is not configured in server environment (.env).");
    return false;
  }
  const authHeader = request.headers.get("x-admin-passcode");
  const url = new URL(request.url);
  const authQuery = url.searchParams.get("passcode");

  const provided = authHeader || authQuery;
  return Boolean(provided && provided === ADMIN_PASSCODE);
}

export async function GET(request) {
  try {
    const isAuthorized = verifyAdminAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Please enter the valid Admin Access Key.",
        },
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const role = url.searchParams.get("role") || "all";
    const status = url.searchParams.get("status") || "all";
    const search = url.searchParams.get("search") || "";
    const action = url.searchParams.get("action");
    const storagePath = url.searchParams.get("storagePath");

    // Action: Generate signed preview URL for a specific resume
    if (action === "get-signed-url" && storagePath) {
      const signedData = await getResumeSignedUrl(storagePath);
      return NextResponse.json({
        success: true,
        signedUrl: signedData?.url || null,
        isDemo: signedData?.isDemo || false,
      });
    }

    // Default: Fetch applications and metrics
    const data = await getInternshipApplications({ role, status, search });

    return NextResponse.json({
      success: true,
      ...data,
      isSupabaseActive: isSupabaseConfigured(),
    });
  } catch (error) {
    console.error("Admin applications API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error fetching applications." },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const isAuthorized = verifyAdminAuth(request);
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access." },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || !body.id || !body.status) {
      return NextResponse.json(
        { success: false, message: "Application ID and new status are required." },
        { status: 400 }
      );
    }

    const { id, status, notes } = body;
    const allowedStatuses = ["new", "in_review", "shortlisted", "rejected"];
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status value provided." },
        { status: 400 }
      );
    }

    const result = await updateApplicationStatus(id, status, notes);
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message || "Failed to update application." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Application status updated successfully.",
      application: result.application,
    });
  } catch (error) {
    console.error("Admin update status error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update candidate status." },
      { status: 500 }
    );
  }
}
