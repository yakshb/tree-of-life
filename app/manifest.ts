import type { MetadataRoute } from "next";
import { siteDescription } from "@/lib/discovery";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Genosphere — Interactive Tree of Life",
    short_name: "Genosphere",
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#16a34a",
    categories: ["education", "science", "reference"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
