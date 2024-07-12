import { getPayloadUrl } from '@/lib/getPayloadUrl'

export type ResetPassword = (params: ResetPasswordParams) => Promise<boolean>

export type ResetPasswordParams = {
  token: string
  password: string
}

export const resetPassword: ResetPassword = async (
  params: ResetPasswordParams
) => {
  try {
    const { token, password } = params
    const res = await fetch(`${getPayloadUrl()}/api/users/reset-password`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        password,
      }),
    })

    if (res.ok) {
      const { errors } = await res.json()
      if (errors) throw new Error(errors[0].message)
      return true
    }

    throw new Error('An error occurred while providing the new password.')
  } catch (e) {
    throw new Error('An error occurred while providing the new password.')
  }
}
