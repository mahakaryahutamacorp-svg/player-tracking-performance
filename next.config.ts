import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Monorepo / nested lockfiles: trace files from repo root (parent of `player-tracking`)
  outputFileTracingRoot: path.join(__dirname, ".."),
};

export default nextConfig;
