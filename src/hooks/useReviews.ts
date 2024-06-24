import { getReviews } from '@/api/getReviews'
import { GetPaginationResponse } from '@/lib/paginationResponse'
import { Review } from '@/lib/payloadTypes'
import { useQuery } from '@tanstack/react-query'
import _ from 'lodash'
import { useSearchParams } from 'next/navigation'

export const useReviews = () => {
  const searchParams = useSearchParams()
  const company = searchParams.get('company') 
  const user = searchParams.get('user') 
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10
  const getReviewsParams = _.omitBy({ company, user, page, limit }, _.isNil)

  const { data, isLoading, isError, refetch } = useQuery<
    GetPaginationResponse<Review>
  >({
    queryKey: ['get-reviews', getReviewsParams],
    queryFn: () => getReviews(getReviewsParams),
  })

  return {
    data,
    isLoading,
    isError,
    refetch,
  }
}
