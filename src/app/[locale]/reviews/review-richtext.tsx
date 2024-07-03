import { RichText } from '@/components/rich-text'
import { Review } from '@/lib/payloadTypes'
import { useTranslations } from 'next-intl'

export type ReviewRichtextProps = { review: Review }

export const ReviewRichtext: React.FC<ReviewRichtextProps> = ({ review }) => {
  const t = useTranslations('Review')
  return (
    <div className="grid gap-3 text-gray-500 dark:text-gray-400">
      <p className="font-medium">{t('detailed_review')}: </p>{' '}
      <RichText content={review.detailedReview} />
    </div>
  )
}
