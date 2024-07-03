import { User } from '@/lib/payloadTypes'

export type GetMe = () => Promise<User>

export const getMeClient: GetMe = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_SERVER_URL}/api/users/me`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

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
