import { RichText } from '@/components/rich-text'
import { Review } from '@/lib/payloadTypes'

export type ReviewRichtextProps = { review: Review }

export const ReviewRichtext: React.FC<ReviewRichtextProps> = ({ review }) => {
  return (
    <div className="grid gap-3 text-gray-500 dark:text-gray-400">
      <p className="font-medium">Detailed review: </p>{' '}
      <RichText content={review.detailedReview} />
    </div>
  )
}
