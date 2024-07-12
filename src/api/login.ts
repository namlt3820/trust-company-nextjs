import { getPayloadUrl } from '@/lib/getPayloadUrl'
import { User } from '@/lib/payloadTypes'

export type Login = (args: { email: string; password: string }) => Promise<User>

export const login: Login = async (args) => {
  try {
    const res = await fetch(`${getPayloadUrl()}/api/users/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: args.email,
        password: args.password,
      }),
    })

    if (res.ok) {
      const { user, errors } = await res.json()
      if (errors) throw new Error(errors[0].message)
      return user
    }

    throw new Error('An error occurred while attempting to login.')
  } catch (e) {
    throw new Error('An error occurred while attempting to login.')
  }
}
