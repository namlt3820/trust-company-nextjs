import { ReactionCountByType } from '@/api/getReactionCountByType'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/formatDate'
import { Review } from '@/lib/payloadTypes'
import React from 'react'
import { ReviewReactions } from './review-reactions'

type RatingColors = {
  [key in Review['rate']]: string
}

const ratingColors: RatingColors = {
  excellent: '#4CAF50', // Green
  good: '#8bc34a', // Light Green
  normal: '#FFEB3B', // Yellow
  bad: '#FF9800', // Orange
  terrible: '#F44336', // Red
}

export type ReviewHeaderProps = {
  name: string | null | undefined
  rate: Review['rate']
  updatedAt: string
  reactions: ReactionCountByType | undefined
  reviewId: string
}

export const ReviewHeader: React.FC<ReviewHeaderProps> = ({
  name,
  rate,
  updatedAt,
  reactions,
  reviewId,
}) => {
  const backgroundColor = `bg-[${ratingColors[rate]}]`
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <span className="text-lg font-semibold">{name}</span>
        <Badge variant={'outline'} className={backgroundColor}>
          {rate}
        </Badge>
        <ReviewReactions reactions={reactions} reviewId={reviewId} />
      </div>
      <span className="font-medium text-gray-500">
        {formatDate(new Date(updatedAt))}
      </span>
    </div>
  )
}
