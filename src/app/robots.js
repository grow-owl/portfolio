export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "Google-Extended",
          "Googlebot",
          "Bingbot",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://www.growowl.online/sitemap.xml",
  };
}

