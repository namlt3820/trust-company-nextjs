import { Reaction } from '@/lib/payloadTypes'
import qs from 'qs'

export type ReactionCountByType = {
  type: 'review' | 'comment'
  id: string
  thumbUp: number
  thumbDown: number
  redHeart: number
  skull: number
  hasReactions?: Reaction[]
}

export type GetReactionCountByType = (
  params: GetReactionCountParams
) => Promise<ReactionCountByType[]>

export type GetReactionCountParams = {
  reviews?: string[]
  comments?: string[]
}

export const getReactionCountByType: GetReactionCountByType = async (
  params: GetReactionCountParams
) => {
  const { reviews, comments } = params

  const query: {
    reviews?: string[]
    comments?: string[]
  } = {}

  if (reviews && reviews.length) {
    query.reviews = reviews
  }

  if (comments && comments.length) {
    query.comments = comments
  }

  const stringifiedQuery = qs.stringify(query, { addQueryPrefix: true })

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_SERVER_URL}/api/reactions/count-by-type${stringifiedQuery}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (res.ok) {
      const { reactions, error } = await res.json()
      if (error) throw new Error(error.message)

      return reactions
    }

    throw new Error('An error occurred while fetching reaction count by type.')
  } catch (e) {
    throw new Error('An error occurred while fetching reaction count by type.')
  }
}
