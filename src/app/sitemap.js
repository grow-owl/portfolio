const baseUrl = "https://www.growowl.online";

export default function sitemap() {
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/services/web-development", priority: 0.9, changeFrequency: "weekly" },
    { path: "/services/web-design", priority: 0.9, changeFrequency: "weekly" },
    { path: "/services/seo-services", priority: 0.9, changeFrequency: "weekly" },
    { path: "/services/digital-marketing", priority: 0.9, changeFrequency: "weekly" },
    { path: "/work", priority: 0.9, changeFrequency: "weekly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/process", priority: 0.8, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.8, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];

  return routes.map((item) => ({
    url: `${baseUrl}${item.path}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));
}
