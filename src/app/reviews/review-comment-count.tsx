import { Separator } from '@/components/ui/separator'
import { MoveRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export type ReviewCommentCountProps = {
  commentCount: number
  review: string
  company: string | null
}

export const ReviewCommentCount: React.FC<ReviewCommentCountProps> = ({
  commentCount,
  review,
  company,
}) => {
  return (
    <div className="grid gap-3 text-gray-500 dark:text-gray-400">
      <Separator />
      <Link
        href={`/comments?review=${review}&company=${company}&page=1&limit=10`}
        className="font-medium"
        prefetch={false}
      >
        Comments: {commentCount}
        &nbsp;&nbsp;
        <MoveRight className="inline-block" size={16} />
      </Link>
    </div>
  )
}
