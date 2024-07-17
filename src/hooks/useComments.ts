import { getComments } from '@/api/getComments'
import { GetPaginationResponse } from '@/lib/paginationResponse'
import { Comment } from '@/lib/payloadTypes'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

export const useComments = () => {
  const searchParams = useSearchParams()
  const review = searchParams.get('review') || undefined
  const user = searchParams.get('user')
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10

  // if review id exists, do not search with user id
  const params = review
    ? { review, page, limit }
    : user
      ? { user, page, limit }
      : { page, limit }

  const { data, isLoading, isError, refetch } = useQuery<
    GetPaginationResponse<Comment>
  >({
    queryKey: ['get-comments', params],
    queryFn: () => getComments(params),
  })

  return {
    data,
    refetch,
    isLoading,
    isError,
  }
}
