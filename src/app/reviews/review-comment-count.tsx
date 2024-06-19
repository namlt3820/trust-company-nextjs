import { getCommentCount } from '@/api/getCommentCount'
import { Separator } from '@/components/ui/separator'
import { Review } from '@/lib/payloadTypes'
import { useQuery } from '@tanstack/react-query'
import { MoveRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export type ReviewCommentCountProps = {
  review: Review
}

export const ReviewCommentCount: React.FC<ReviewCommentCountProps> = ({
  review,
}) => {
  const { data, isLoading, isError } = useQuery<number>({
    queryKey: ['get-comment-count', { review }],
    queryFn: () => getCommentCount({ review: review.id }),
  })

  return (
    <div className="grid gap-3 text-gray-500 dark:text-gray-400">
      <Separator />
      <Link
        href={`/comments?review=${review.id}&page=1&limit=10`}
        className="font-medium"
      >
        Comments: {isLoading || isError ? 0 : data}
        &nbsp;&nbsp;
        {isLoading || isError || data === 0 ? null : (
          <MoveRight className="inline-block" size={16} />
        )}
      </Link>
    </div>
  )
}
