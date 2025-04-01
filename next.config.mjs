const nextPwa = await import("next-pwa");
const withPWA = nextPwa.default;

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
      },
    ],
  },
};

const pwaConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
};

export default withPWA(pwaConfig)(nextConfig);
