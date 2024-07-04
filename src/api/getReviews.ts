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
  sort?: string
}

export const getReviews: GetReviews = async (params: GetReviewsParams) => {
  const { company, page = 1, limit = 10, user, sort } = params

  const queryWhere: {
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

  let querySort: string = ''

  if (sort) {
    querySort = sort === 'newest' ? '-updatedAt' : 'updatedAt'
  }

  if (company) {
    queryWhere.company = {
      equals: company,
    }
  }

  if (user) {
    queryWhere.user = {
      equals: user,
    }
  }

  const stringifiedQuery = qs.stringify(
    {
      where: queryWhere,
      limit,
      page,
      sort: querySort,
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
