const baseUrl = "https://www.growowl.online";

export default function sitemap() {
  const routes = [
    "",
    "/services/web-development",
    "/services/web-design",
    "/services/seo-services",
    "/services/digital-marketing",
    "/pricing",
    "/work",
    "/about",
    "/process",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
