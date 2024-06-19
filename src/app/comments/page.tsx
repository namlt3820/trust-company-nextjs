'use client'

import { getComments } from '@/api/getComments'
import { SectionHeader } from '@/components/section-header'
import { SectionWrapper } from '@/components/section-wrapper'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { formatDate } from '@/lib/formatDate'
import { GetPaginationResponse } from '@/lib/paginationResponse'
import { Comment } from '@/lib/payloadTypes'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

function CommentPagination({
  response,
}: {
  response: GetPaginationResponse<Comment> | undefined
}) {
  const searchParams = useSearchParams()
  const review = searchParams.get('review') || undefined
  const user = searchParams.get('user') || undefined

  if (!response) return null

  const { limit, page, nextPage, prevPage } = response

  const items: JSX.Element[] = []

  let path = `/comments?`
  if (review) path += `review=${review}&`
  if (user) path += `user=${user}&`
  path += `limit=${limit}&`

  if (prevPage) {
    items.push(
      <PaginationPrevious href={`${path}page=${prevPage}`}></PaginationPrevious>
    )
  }

  if (page) {
    items.push(<PaginationItem className="font-medium">{page}</PaginationItem>)
  }

  if (nextPage) {
    items.push(
      <PaginationNext href={`${path}page=${nextPage}`}></PaginationNext>
    )
  }

  return (
    <div className="mx-auto w-full p-4">
      <Pagination>
        <PaginationContent> {...items}</PaginationContent>
      </Pagination>
    </div>
  )
}

export default function Comments() {
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

  return (
    <SectionWrapper backgroundColor="bg-white">
      <SectionHeader title="Comments" />
      <div className="mx-auto w-full">
        {isLoading && <div className="p-4 text-center">Searching...</div>}
        {!isError && !isLoading && !data?.docs.length && (
          <div className="p-4 text-center">No comments found</div>
        )}
        {isError && <div className="p-4 text-center">Something went wrong</div>}

        <div className="grid gap-4">
          {data?.docs.map((comment) => {
            const { id, populatedUser, content, updatedAt } = comment

            const { name } = populatedUser!
            return (
              <Card key={id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-semibold">{name}</span>
                    </div>
                    <span className="font-medium text-gray-500 dark:text-gray-400">
                      {formatDate(new Date(updatedAt))}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-gray-500 dark:text-gray-400">
                    {content}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <CommentPagination response={data} />
      </div>
    </SectionWrapper>
  )
}
