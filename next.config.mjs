import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const payloadUrl = new URL(process.env.NEXT_PUBLIC_PAYLOAD_URL_FROM_SERVER)

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: payloadUrl.protocol.slice(0, -1),
        hostname: payloadUrl.hostname,
        port: '3000',
        pathname: '/media/**',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
