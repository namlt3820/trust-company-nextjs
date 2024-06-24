import {
  CommentCountByReview,
  getCommentCountByReview,
} from '@/api/getCommentCountByReview'
import { GetPaginationResponse } from '@/lib/paginationResponse'
import { Review } from '@/lib/payloadTypes'
import { useQuery } from '@tanstack/react-query'

export const useCommentCountByReview = (
  reviews: GetPaginationResponse<Review> | undefined
) => {
  const reviewIds = reviews?.docs?.map((review) => review.id) || []

  const { data, isLoading, isError, refetch } = useQuery<
    CommentCountByReview[]
  >({
    queryKey: ['comments/count-by-review', { reviews: reviewIds }],
    queryFn: () => getCommentCountByReview({ reviews: reviewIds }),
    enabled: !!reviews,
  })

  return {
    data,
    isLoading,
    isError,
    refetch,
  }
}
