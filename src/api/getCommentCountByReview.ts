import { getPayloadUrl } from '@/lib/getPayloadUrl'
import qs from 'qs'

export type CommentCountByReview = {
  review: string
  commentCount: number
}

export type GetCommentCountByReview = (
  params: GetCommentCountByReviewParams
) => Promise<CommentCountByReview[]>

export type GetCommentCountByReviewParams = {
  reviews: string[]
}

export const getCommentCountByReview: GetCommentCountByReview = async (
  params: GetCommentCountByReviewParams
) => {
  const stringifiedQuery = qs.stringify(params, { addQueryPrefix: true })

  try {
    const res = await fetch(
      `${getPayloadUrl()}/api/comments/count-by-review${stringifiedQuery}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (res.ok) {
      const { comments, error } = await res.json()
      if (error) throw new Error(error.message)

      return comments
    }

    throw new Error('An error occurred while fetching comment count by review.')
  } catch (e) {
    throw new Error('An error occurred while fetching comment count by review.')
  }
}
