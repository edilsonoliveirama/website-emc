import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Link",
            value:
              '</sitemap.xml>; rel="alternate"; type="application/xml", </llms.txt>; rel="alternate"; type="text/plain"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
