import { Separator } from '@/components/ui/separator'
import { Link } from '@/navigation'
import { MoveRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

export type ReviewCommentCountProps = {
  commentCount: number
  review: string
  company: string | null
  user: string | null
}

export const ReviewCommentCount: React.FC<ReviewCommentCountProps> = ({
  commentCount,
  review,
  company,
  user,
}) => {
  const t = useTranslations('Review')
  return (
    <div className="grid gap-3 text-gray-500 dark:text-gray-400">
      <Separator />
      <Link
        href={`/comments?review=${review}&page=1&limit=10&company=${company || ''}&user=${user || ''}`}
        className="font-medium"
        prefetch={false}
      >
        {t('comments')}: {commentCount}
        &nbsp;&nbsp;
        <MoveRight className="inline-block" size={16} />
      </Link>
    </div>
  )
}
