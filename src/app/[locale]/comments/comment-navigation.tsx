import { CommentForm } from '@/components/comment-form'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Link } from '@/navigation'
import { PencilLine } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export const CommentNavigation: React.FC = () => {
  const searchParams = useSearchParams()
  const review = searchParams.get('review')
  const company = searchParams.get('company')
  const user = searchParams.get('user')
  const t = useTranslations()

  return (
    <div className="mb-6 flex justify-between md:mb-10">
      <Dialog>
        <DialogTrigger asChild>
          {review ? (
            <Button className="flex gap-1">
              <PencilLine className="h-4 w-4" />
              {t('Comment.create')}
            </Button>
          ) : (
            <div></div>
          )}
        </DialogTrigger>
        <DialogContent className="max-h-screen max-w-screen-xl overflow-y-scroll">
          <DialogHeader>
            <DialogTitle> {t('Comment.create')}</DialogTitle>
            <DialogDescription>{t('General.follow_guide')}</DialogDescription>
          </DialogHeader>
          <CommentForm />
        </DialogContent>
      </Dialog>
      {review ? (
        <Link
          className={buttonVariants({ variant: 'outline' })}
          href={`/reviews?company=${company}&user=${user}&page=1&limit=10`}
          prefetch={false}
        >
          {t('Comment.back_reviews')}
        </Link>
      ) : null}
    </div>
  )
}
