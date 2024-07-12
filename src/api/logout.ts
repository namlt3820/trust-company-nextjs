import { getPayloadUrl } from '@/lib/getPayloadUrl'

export type Logout = () => Promise<void>

export const logout: Logout = async () => {
  try {
    const res = await fetch(`${getPayloadUrl()}/api/users/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) {
      return
    }

    throw new Error('An error occurred while attempting to logout.')
  } catch (e) {
    throw new Error('An error occurred while attempting to logout.')
  }
}
