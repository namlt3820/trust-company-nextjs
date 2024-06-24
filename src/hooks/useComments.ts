import { getComments } from '@/api/getComments'
import { GetPaginationResponse } from '@/lib/paginationResponse'
import { Comment } from '@/lib/payloadTypes'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

export const useComments = () => {
  const searchParams = useSearchParams()
  const review = searchParams.get('review') || undefined
  const user = searchParams.get('user') || undefined
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10

  const { data, isLoading, isError } = useQuery<GetPaginationResponse<Comment>>(
    {
      queryKey: ['get-comments', { review, user, page, limit }],
      queryFn: () => getComments({ review, user, page, limit }),
    }
  )

  return {
    data,
    isLoading,
    isError,
  }
}
