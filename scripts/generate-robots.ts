import { writeFileSync } from "fs";
import { resolve } from "path";

const SITE_URL = process.env.VITE_SITE_URL;

if (!SITE_URL) {
  console.error("ERROR: VITE_SITE_URL environment variable is required");
  process.exit(1);
}

function generateRobotsTxt() {
  const robotsTxtContent = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  try {
    const outputPath = resolve("./dist/robots.txt");
    writeFileSync(outputPath, robotsTxtContent, "utf8");
    console.log("✅ Generated robots.txt");
  } catch (error) {
    console.error("❌ Error generating robots.txt:", error);
    process.exit(1);
  }
}

try {
  generateRobotsTxt();
} catch (error) {
  console.error("❌ Fatal error:", error);
  process.exit(1);
}

