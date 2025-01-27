import { getPayloadUrl } from '@/lib/getPayloadUrl'
import { Comment } from '@/lib/payloadTypes'

export type UpdateComment = (params: UpdateCommentParams) => Promise<Comment>

export type UpdateCommentParams = {
  content: string
  id: string
}

export const updateComment: UpdateComment = async (
  params: UpdateCommentParams
) => {
  const { content, id } = params
  try {
    const res = await fetch(`${getPayloadUrl()}/api/comments/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
      }),
    })

    if (res.ok) {
      const { doc, errors } = await res.json()
      if (errors) throw new Error(errors[0].message)
      return doc
    }

    throw new Error('An error occurred while updating comment.')
  } catch (e) {
    throw new Error('An error occurred while updating comment.')
  }
}
