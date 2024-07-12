import { getPayloadUrl } from '@/lib/getPayloadUrl'

export type VerifyEmail = (params: VerifyEmailParams) => Promise<boolean>

export type VerifyEmailParams = {
  token: string
}

export const verifyEmail: VerifyEmail = async (params: VerifyEmailParams) => {
  try {
    const res = await fetch(
      `${getPayloadUrl()}/api/users/verify/${params.token}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (res.ok) {
      const { errors } = await res.json()
      if (errors) throw new Error(errors[0].message)
      return true
    }

    throw new Error('An error occurred while verify email.')
  } catch (e) {
    throw new Error('An error occurred while verify email.')
  }
}
