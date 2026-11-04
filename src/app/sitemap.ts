import type { MetadataRoute } from "next";
import { products, categories, events } from "@/lib/data";
import { SITE_URL } from "@/lib/contact";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "shop",
    "about",
    "contact",
    "delivery",
    "terms",
    "privacy",
    "cancellations",
    "accessibility",
  ];

  const staticRoutes = staticPaths.map((path) => ({
    url: path ? `${SITE_URL}/${path}` : SITE_URL,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${SITE_URL}/category/${c.slug}`,
    lastModified: new Date(),
  }));

  const eventRoutes = events.map((e) => ({
    url: `${SITE_URL}/event/${e.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes, ...eventRoutes];
}
