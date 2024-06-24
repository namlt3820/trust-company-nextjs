import { CommentCountByReview } from '@/api/getCommentCountByReview'
import { Separator } from '@/components/ui/separator'
import { MoveRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export type ReviewCommentCountProps = CommentCountByReview

export const ReviewCommentCount: React.FC<ReviewCommentCountProps> = ({
  commentCount,
  review,
}) => {
  return (
    <div className="grid gap-3 text-gray-500 dark:text-gray-400">
      <Separator />
      <Link
        href={`/comments?review=${review}&page=1&limit=10`}
        className="font-medium"
      >
        Comments: {commentCount}
        &nbsp;&nbsp;
        {commentCount !== 0 ? (
          <MoveRight className="inline-block" size={16} />
        ) : null}
      </Link>
    </div>
  )
}
