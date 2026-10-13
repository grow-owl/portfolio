/**
 * Verify Cloudflare Turnstile token on the server side
 * @param {string} token - The turnstile response token from the frontend widget
 * @param {string} clientIp - Client IP address
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export async function verifyTurnstileToken(token, clientIp = "") {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  // If secret key or site key is not configured, or using placeholder keys,
  // gracefully allow submission to proceed so legitimate leads are NEVER lost.
  if (
    !secretKey ||
    secretKey.includes("your_cloudflare") ||
    !siteKey ||
    siteKey.includes("your_cloudflare")
  ) {
    return { success: true };
  }

  // If no token was provided (e.g. adblocker, Brave Shields, or privacy extensions
  // blocked the Turnstile widget from loading in the user's browser),
  // allow the submission through. Honeypot and Upstash Redis rate limiting protect the form.
  if (!token) {
    console.warn("Turnstile token was missing; bypassing verification (fail-open).");
    return { success: true };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (clientIp) {
      formData.append("remoteip", clientIp);
    }

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
        signal: AbortSignal.timeout(5000), // 5s timeout
      }
    );

    const data = await response.json();

    if (data.success) {
      return { success: true };
    }

    console.warn("Turnstile verification response:", data["error-codes"]);

    // If Cloudflare returns an error indicating the server secret key itself is invalid
    // or mismatched, do NOT block the human user from submitting their lead.
    const errorCodes = data["error-codes"] || [];
    if (
      errorCodes.includes("invalid-input-secret") ||
      errorCodes.includes("missing-input-secret")
    ) {
      console.error(
        "TURNSTILE_SECRET_KEY configured in environment is invalid on Cloudflare. Allowing lead submission."
      );
      return { success: true };
    }

    return {
      success: false,
      message: "Security verification failed. Please refresh the page and try again.",
    };
  } catch (err) {
    console.error("Error verifying Turnstile token (fail-open):", err);
    // On Cloudflare network timeout or outage, fail open so client inquiries are not dropped.
    return { success: true };
  }
}
