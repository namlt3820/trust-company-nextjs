import { getPayloadUrl } from '@/lib/getPayloadUrl'
import { Comment } from '@/lib/payloadTypes'

export type DeleteComment = (params: DeleteCommentParams) => Promise<Comment>

export type DeleteCommentParams = {
  id: string
}

export const deleteComment: DeleteComment = async (
  params: DeleteCommentParams
) => {
  const { id } = params
  try {
    const res = await fetch(`${getPayloadUrl()}/api/comments/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) {
      const { doc, errors } = await res.json()
      if (errors) throw new Error(errors[0].message)
      return doc
    }

    throw new Error('An error occurred while delete comment.')
  } catch (e) {
    throw new Error('An error occurred while delete comment.')
  }
}
