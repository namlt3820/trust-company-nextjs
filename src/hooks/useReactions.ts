import {
  ReactionCountByType,
  getReactionCountByType,
} from '@/api/getReactionCountByType'
import { GetPaginationResponse } from '@/lib/paginationResponse'
import { Review } from '@/lib/payloadTypes'
import { useQuery } from '@tanstack/react-query'

export const useReactions = (
  reviews: GetPaginationResponse<Review> | undefined
) => {
  const reviewIds = reviews?.docs?.map((review) => review.id) || []

  const { data, isLoading, isError, refetch } = useQuery<ReactionCountByType[]>(
    {
      queryKey: ['reactions/count-by-type', { reviews: reviewIds }],
      queryFn: () => getReactionCountByType({ reviews: reviewIds }),
      enabled: !!reviewIds,
    }
  )

  return {
    data,
    isLoading,
    isError,
    refetch,
  }
}
