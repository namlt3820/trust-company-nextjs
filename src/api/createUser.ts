import { User } from '@/lib/payloadTypes'

export type CreateUser = (params: CreateUserParams) => Promise<User>

export type CreateUserParams = {
  name: string
  email: string
  password: string
}

export const createUser: CreateUser = async (params: CreateUserParams) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_SERVER_URL}/api/users`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      }
    )

    if (res.ok) {
      const { doc, errors } = await res.json()
      if (errors) throw new Error(errors[0].message)
      return doc
    }

    throw new Error('An error occurred while creating user.')
  } catch (e) {
    throw new Error('An error occurred while creating user.')
  }
}
