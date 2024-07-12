export const getPayloadUrl = () =>
  typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_PAYLOAD_URL_FROM_SERVER
    : process.env.NEXT_PUBLIC_PAYLOAD_URL_FROM_CLIENT
