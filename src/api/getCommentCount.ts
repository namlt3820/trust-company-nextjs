import { getPayloadUrl } from '@/lib/getPayloadUrl'
import qs from 'qs'

export type GetCommentCount = (params: GetCommentCountParams) => Promise<number>

export type GetCommentCountParams = {
  review?: string
  user?: string
}

export const getCommentCount: GetCommentCount = async (
  params: GetCommentCountParams
) => {
  const { review, user } = params

  const query: {
    review?: {
      equals: string
    }
    user?: {
      equals: string
    }
  } = {}

  if (review) {
    query.review = {
      equals: review,
    }
  }

  if (user) {
    query.user = {
      equals: user,
    }
  }

  const stringifiedQuery = qs.stringify(
    {
      where: query,
    },
    { addQueryPrefix: true }
  )

  try {
    const res = await fetch(
      `${getPayloadUrl()}/api/comments/count${stringifiedQuery}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (res.ok) {
      const { totalDocs, errors } = await res.json()
      if (errors) throw new Error(errors[0].message)
      return totalDocs
    }

    throw new Error('An error occurred while fetching comment count.')
  } catch (e) {
    throw new Error('An error occurred while fetching comment count.')
  }
}
