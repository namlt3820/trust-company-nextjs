import {
  ReactionCountByType,
  getReactionCountByType,
} from '@/api/getReactionCountByType'
import { GetPaginationResponse } from '@/lib/paginationResponse'
import { Comment, Review } from '@/lib/payloadTypes'
import { useQuery } from '@tanstack/react-query'

export const useReactions = ({
  reviews,
  comments,
}: {
  reviews?: GetPaginationResponse<Review>
  comments?: GetPaginationResponse<Comment>
}) => {
  const reviewIds = reviews?.docs?.map((review) => review.id) || []
  const commentIds = comments?.docs?.map((comment) => comment.id) || []

  const { data, isLoading, isError, refetch } = useQuery<ReactionCountByType[]>(
    {
      queryKey: [
        'reactions/count-by-type',
        { reviews: reviewIds, comments: commentIds },
      ],
      queryFn: () =>
        getReactionCountByType({ reviews: reviewIds, comments: commentIds }),
      enabled: !!reviews || !!comments,
    }
  )

  return {
    data,
    isLoading,
    isError,
    refetch,
  }
}
