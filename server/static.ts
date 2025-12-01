import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export function serveStatic(app: Express) {
  // In production, files are at ../public relative to the built server
  // Or in Vercel, they're at ./dist/public relative to project root
  const distPath = process.env.VERCEL 
    ? path.join(process.cwd(), "dist", "public")
    : path.join(path.dirname(__dirname), "dist", "public");
    
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath, {
    setHeaders: (res, filePath) => {
      // Ensure HTML files are served with correct content-type
      if (filePath.endsWith('.html')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
      }
    }
  }));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
