import { GetPaginationResponse } from '@/lib/paginationResponse'
import { Review } from '@/lib/payloadTypes'
import qs from 'qs'

export type GetReviews = (
  params: GetReviewsParams
) => Promise<GetPaginationResponse<Review>>

export type GetReviewsParams = {
  page?: number
  limit?: number
  company?: string
  user?: string
}

export const getReviews: GetReviews = async (params: GetReviewsParams) => {
  const { company, page = 1, limit = 10, user } = params

  const query: {
    company?: {
      equals: string
    }
    user?: {
      equals: string
    }
    depth?: number
  } = {
    depth: 1,
  }

  if (company) {
    query.company = {
      equals: company,
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
      limit,
      page,
    },
    {
      addQueryPrefix: true,
    }
  )

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_SERVER_URL}/api/reviews${stringifiedQuery}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (res.ok) {
      const data: GetPaginationResponse<Review> = await res.json()
      if (data.errors) throw new Error(data.errors[0].message)
      return data
    }

    throw new Error('An error occurred while fetching reviews.')
  } catch (e) {
    throw new Error('An error occurred while fetching reviews.')
  }
}
