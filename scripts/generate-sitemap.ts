import { createWriteStream } from "fs";
import { resolve } from "path";
import { SitemapStream, streamToPromise } from "sitemap";
import { allProjectsSortedByPriority } from "../src/data/projects/index.js";
import { ROUTES } from "../src/constants/routes.js";

const SITE_URL = process.env.VITE_SITE_URL;

if (!SITE_URL) {
  console.error("ERROR: VITE_SITE_URL environment variable is required");
  process.exit(1);
}

async function generateSitemap() {
  const staticRoutes = [
    { url: ROUTES.HOME, changefreq: "weekly", priority: 1.0 },
    { url: ROUTES.ABOUT, changefreq: "monthly", priority: 0.8 },
    { url: ROUTES.PROJECTS, changefreq: "weekly", priority: 0.9 },
    { url: ROUTES.LEGAL, changefreq: "yearly", priority: 0.3 },
  ];

  const projectRoutes = allProjectsSortedByPriority.map((project) => ({
    url: `/projects/${project.id}`,
    changefreq: "monthly",
    priority: 0.7,
  }));

  const routes = [...staticRoutes, ...projectRoutes];

  const sitemapStream = new SitemapStream({ hostname: SITE_URL });
  const outputPath = resolve("./dist/sitemap.xml");
  const writeStream = createWriteStream(outputPath);

  sitemapStream.pipe(writeStream);

  try {
    routes.forEach((route) => {
      sitemapStream.write({
        url: route.url,
        changefreq: route.changefreq,
        priority: route.priority,
      });
    });

    sitemapStream.end();

    await streamToPromise(sitemapStream);
    console.log("✅ Generated sitemap.xml");
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    process.exit(1);
  }
}

generateSitemap().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});

