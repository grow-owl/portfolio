/**
 * Verify Cloudflare Turnstile token on the server side
 * @param {string} token - The turnstile response token from the frontend widget
 * @param {string} clientIp - Client IP address
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export async function verifyTurnstileToken(token, clientIp = "") {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // If secret key is not configured and in development, allow bypass for testing
  if (!secretKey || secretKey.includes("your_cloudflare")) {
    if (process.env.NODE_ENV === "production") {
      return {
        success: false,
        message: "CAPTCHA configuration is missing in production.",
      };
    }
    // Dev bypass when keys not set
    return { success: true };
  }

  if (!token) {
    return {
      success: false,
      message: "Please complete the anti-bot verification challenge.",
    };
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

    console.warn("Turnstile verification failed:", data["error-codes"]);
    return {
      success: false,
      message: "Security verification failed. Please refresh and try again.",
    };
  } catch (err) {
    console.error("Error verifying Turnstile token:", err);
    return {
      success: false,
      message: "Could not verify anti-bot challenge. Please try again.",
    };
  }
}
