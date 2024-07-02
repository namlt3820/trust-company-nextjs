import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { GetPaginationResponse } from '@/lib/paginationResponse'
import { Review } from '@/lib/payloadTypes'
import { useSearchParams } from 'next/navigation'

export type ReviewPaginationProps = {
  response: GetPaginationResponse<Review> | undefined
}

export const ReviewPagination: React.FC<ReviewPaginationProps> = ({
  response,
}) => {
  const searchParams = useSearchParams()
  const company = searchParams.get('company') || undefined
  const user = searchParams.get('user') || undefined

  if (!response) return null

  const { limit, page, nextPage, prevPage } = response

  const items: JSX.Element[] = []

  let path = `/reviews?`
  if (company) path += `company=${company}&`
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
