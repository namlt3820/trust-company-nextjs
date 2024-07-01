import { ReactionCountByType } from '@/api/getReactionCountByType'
import { ReviewActions } from '@/app/reviews/review-actions'
import { ReviewReactions } from '@/app/reviews/review-reactions'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/formatDate'
import { Review } from '@/lib/payloadTypes'
import React from 'react'

type RatingColors = {
  [key in Review['rate']]: string
}

const ratingColors: RatingColors = {
  excellent: 'bg-[#4CAF50]', // Green
  good: 'bg-[#8bc34a]', // Light Green
  normal: 'bg-[#FFEB3B]', // Yellow
  bad: 'bg-[#FF9800]', // Orange
  terrible: 'bg-[#F44336]', // Red
}

export type ReviewHeaderProps = {
  name: string | null | undefined
  rate: Review['rate']
  updatedAt: string
  reactions: ReactionCountByType | undefined
  review: Review
}

export const ReviewHeader: React.FC<ReviewHeaderProps> = ({
  name,
  rate,
  updatedAt,
  reactions,
  review,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <span className="text-lg font-semibold">{name}</span>
        <Badge variant={'outline'} className={`${ratingColors[rate]}`}>
          {rate}
        </Badge>
        <ReviewReactions reactions={reactions} reviewId={review.id} />
        <ReviewActions review={review} />
      </div>
      <span className="font-medium text-gray-500">
        {formatDate(new Date(updatedAt))}
      </span>
    </div>
  )
}
