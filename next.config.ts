import path from "node:path";
import type { NextConfig } from "next";

// `outputFileTracingRoot` ke parent membantu supaya warning lockfile lokal hilang,
// tetapi di Vercel membuat tracing salah (path dobel → ENOENT routes-manifest.json).
const nextConfig: NextConfig = {
  ...(!process.env.VERCEL && {
    outputFileTracingRoot: path.join(__dirname, ".."),
  }),
};

export default nextConfig;
