import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Scrum Dashboard",
    short_name: "ScrumDash",
    description: "Premium daily Scrum workspace",
    start_url: "/widget",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#0f172a",
    orientation: "landscape",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
