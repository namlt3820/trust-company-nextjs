import { ReactionCountByType } from '@/api/getReactionCountByType'
import { ReviewActions } from '@/app/[locale]/reviews/review-actions'
import { ReviewReactions } from '@/app/[locale]/reviews/review-reactions'
import { Badge } from '@/components/ui/badge'
import { LocaleType } from '@/config'
import { formatDate } from '@/lib/formatDate'
import { Review } from '@/lib/payloadTypes'
import { cn } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'
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
  const t = useTranslations('Review')
  const locale = useLocale()

  return (
    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div className="grid w-full grid-cols-2 items-center gap-y-4 md:w-auto md:grid-cols-[auto,auto,auto,auto] md:gap-x-2 md:gap-y-0">
        <span className="col-span-1 justify-self-start text-lg font-semibold">
          {name}
        </span>
        <Badge
          variant={'outline'}
          className={cn(ratingColors[rate], 'col-span-1 justify-self-end')}
        >
          {t(rate)}
        </Badge>
        <div className="col-span-1 justify-self-start">
          <ReviewReactions reactions={reactions} reviewId={review.id} />
        </div>
        <div className="col-span-1 justify-self-end md:justify-self-start">
          <ReviewActions review={review} />
        </div>
      </div>
      <span className="text-sm font-medium text-gray-500 md:text-base">
        {formatDate(new Date(updatedAt), locale as LocaleType)}
      </span>
    </div>
  )
}
