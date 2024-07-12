import { getPayloadUrl } from '@/lib/getPayloadUrl'
import { Comment } from '@/lib/payloadTypes'

export type CreateComment = (params: CreateCommentParams) => Promise<Comment>

export type CreateCommentParams = {
  content: string
  user: string
  review: string
}

export const createComment: CreateComment = async (
  params: CreateCommentParams
) => {
  try {
    const res = await fetch(`${getPayloadUrl()}/api/comments`, {
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

    throw new Error('An error occurred while creating comment.')
  } catch (e) {
    throw new Error('An error occurred while creating comment.')
  }
}
