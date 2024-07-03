import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import type { User } from '@/lib/payloadTypes'

export const getMeServer = async (args?: {
  nullUserRedirect?: string
  validUserRedirect?: string
}): Promise<{
  user: User
  token: string
}> => {
  const { nullUserRedirect, validUserRedirect } = args || {}
  const cookieStore = cookies()
  const token = cookieStore.get('payload-token')?.value

  const meUserReq = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_SERVER_URL}/api/users/me`,
    {
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
  )

  const {
    user,
  }: {
    user: User
  } = await meUserReq.json()

  if (validUserRedirect && meUserReq.ok && user) {
    redirect(validUserRedirect)
  }

  if (nullUserRedirect && (!meUserReq.ok || !user)) {
    redirect(nullUserRedirect)
  }

  return {
    user,
    token: token as string,
  }
}
