import { Separator } from '@/components/ui/separator'
import { Review } from '@/lib/payloadTypes'
import { useTranslations } from 'next-intl'
import React from 'react'

export type RelevantInformationProps = {
  review: Review
}

export const RelevantInformation: React.FC<RelevantInformationProps> = ({
  review,
}) => {
  const t = useTranslations('Review')
  const { relevantInformation, id } = review
  if (!relevantInformation) return null
  const items = []

  for (const key in relevantInformation) {
    items.push(
      <div className="text-gray-500 dark:text-gray-400" key={`${id}_${key}`}>
        <span className="font-medium">{t(key)}: </span>{' '}
        {relevantInformation[key as keyof Review['relevantInformation']]}
      </div>
    )
  }

  return items.length ? (
    <div className="grid gap-2">
      {...items} <Separator />
    </div>
  ) : null
}
