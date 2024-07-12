import { getPayloadUrl } from '@/lib/getPayloadUrl'

export type ForgotPassword = (params: ForgotPasswordParams) => Promise<boolean>

export type ForgotPasswordParams = {
  email: string
}

export const forgotPassword: ForgotPassword = async (
  params: ForgotPasswordParams
) => {
  try {
    const res = await fetch(`${getPayloadUrl()}/api/users/forgot-password`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: params.email,
      }),
    })

    if (res.ok) {
      const { errors } = await res.json()
      if (errors) throw new Error(errors[0].message)
      return true
    }

    throw new Error('An error occurred while resetting the password.')
  } catch (e) {
    throw new Error('An error occurred while resetting the password.')
  }
}
