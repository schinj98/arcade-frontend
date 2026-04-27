/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://a.impactradius-go.com https://imp.pxf.io",
              "img-src 'self' data: blob: https://a.impactradius-go.com https://imp.pxf.io https://liquidweb.i3f2.net https://network-solutions.7eer.net https://kamatera.sjv.io https://pagead2.googlesyndication.com https://www.google.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
              "frame-src 'self' https://a.impactradius-go.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
              "connect-src 'self' https://a.impactradius-go.com https://imp.pxf.io https://www.google-analytics.com https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;