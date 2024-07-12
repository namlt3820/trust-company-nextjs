import { getPayloadUrl } from '@/lib/getPayloadUrl'
import { Reaction } from '@/lib/payloadTypes'

export type CreateReaction = (params: CreateReactionParams) => Promise<Reaction>

export type CreateReactionParams = {
  type: Reaction['type']
  user: string
  target: {
    value: string
    relationTo: 'comments' | 'reviews'
  }
}

export const createReaction: CreateReaction = async (
  params: CreateReactionParams
) => {
  try {
    const res = await fetch(`${getPayloadUrl()}/api/reactions`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (res.ok) {
      const { doc, errors } = await res.json()
      if (errors) throw new Error(errors[0].message)
      return doc
    }

    throw new Error('An error occurred while creating reaction.')
  } catch (e) {
    throw new Error('An error occurred while creating reaction.')
  }
}
