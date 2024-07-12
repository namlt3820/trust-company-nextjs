import { getPayloadUrl } from '@/lib/getPayloadUrl'
import { User } from '@/lib/payloadTypes'

export type GetMe = () => Promise<User>

export const getMeClient: GetMe = async () => {
  try {
    const res = await fetch(`${getPayloadUrl()}/api/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) {
      const { user, errors } = await res.json()
      if (errors) throw new Error(errors[0].message)
      return user
    }

    throw new Error('An error occurred while fetching your account.')
  } catch (e) {
    throw new Error('An error occurred while fetching your account.')
  }
}
