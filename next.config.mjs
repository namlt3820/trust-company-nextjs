import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()
const payloadUrl = new URL(process.env.NEXT_PUBLIC_PAYLOAD_URL_FROM_SERVER)

/** @type {import('next').NextConfig} */

const remotePattern = {
  protocol: payloadUrl.protocol.slice(0, -1),
  hostname: payloadUrl.hostname,
  pathname: '/media/**',
}

if (process.env.NODE_ENV !== 'production') {
  remotePattern.port === '3000'
}

const nextConfig = {
  images: {
    remotePatterns: [remotePattern],
  },
}

export default withNextIntl(nextConfig)
