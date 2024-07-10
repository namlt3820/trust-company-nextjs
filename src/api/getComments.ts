import { GetPaginationResponse } from '@/lib/paginationResponse'
import { Comment } from '@/lib/payloadTypes'
import qs from 'qs'

export type GetComments = (
  params: GetCommentsParams
) => Promise<GetPaginationResponse<Comment>>

export type GetCommentsParams = {
  page?: number
  limit?: number
  review?: string
  user?: string
}

export const getComments: GetComments = async (params: GetCommentsParams) => {
  const { review, page = 1, limit = 10, user } = params

  const query: {
    review?: {
      equals: string
    }
    user?: {
      equals: string
    }
    depth?: number
  } = {
    depth: 1,
  }

  if (review && review !== 'null') {
    query.review = {
      equals: review,
    }
  }

  if (user && user !== 'null') {
    query.user = {
      equals: user,
    }
  }

  const stringifiedQuery = qs.stringify(
    {
      where: query,
      page,
      limit,
    },
    { addQueryPrefix: true }
  )

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_SERVER_URL}/api/comments${stringifiedQuery}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (res.ok) {
      const data: GetPaginationResponse<Comment> = await res.json()
      if (data.errors) throw new Error(data.errors[0].message)
      return data
    }

    throw new Error('An error occurred while fetching comments.')
  } catch (e) {
    throw new Error('An error occurred while fetching comments.')
  }
}
