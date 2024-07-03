import { Separator } from '@/components/ui/separator'
import { Review } from '@/lib/payloadTypes'
import { useTranslations } from 'next-intl'
import React from 'react'

export type BasicReviewProps = {
  review: Review
}

export const BasicReview: React.FC<BasicReviewProps> = ({ review }) => {
  const t = useTranslations('Review')
  const { basicReview, id } = review
  if (!basicReview) return null

  const items = []

  for (const key in basicReview) {
    items.push(
      <div className="text-gray-500 dark:text-gray-400" key={`${id}_${key}`}>
        <span className="font-medium">{t(key)}: </span>{' '}
        {basicReview[key as keyof Review['basicReview']]}
      </div>
    )
  }

  return items.length ? (
    <div className="grid gap-3">
      {...items} <Separator />
    </div>
  ) : null
}
