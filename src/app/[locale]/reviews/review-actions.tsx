import { ReviewDelete } from '@/app/[locale]/reviews/review-delete'
import { ReviewEdit } from '@/app/[locale]/reviews/review-edit'
import { ReportForm } from '@/components/report-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Review, User } from '@/lib/payloadTypes'
import { useAuth } from '@/providers/Auth'
import { Flag, PencilLine, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export type ReviewActionsProps = {
  review: Review
}

export const ReviewActions: React.FC<ReviewActionsProps> = ({ review }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const t = useTranslations('Review')
  const t_general = useTranslations('General')

  const { user } = useAuth()
  const { id: reviewId, user: author } = review
  const { id } = author as User
  const isFromLoggedInUser = user?.id === id

  return (
    <>
      <Dialog
        open={isEditDialogOpen || isDeleteDialogOpen || isReportDialogOpen}
        onOpenChange={() => {
          setIsDeleteDialogOpen(false)
          setIsEditDialogOpen(false)
          setIsReportDialogOpen(false)
        }}
      >
        <DialogContent className="max-h-screen max-w-screen-xl overflow-y-scroll">
          {isEditDialogOpen ? (
            <>
              <DialogHeader>
                <DialogTitle>{t('update')}</DialogTitle>
                <DialogDescription>
                  {t_general('follow_guide')}
                </DialogDescription>
              </DialogHeader>
              <ReviewEdit
                id={reviewId}
                review={review}
                setIsEditDialogOpen={setIsEditDialogOpen}
              />
            </>
          ) : null}
          {isDeleteDialogOpen ? (
            <>
              <DialogHeader>
                <DialogTitle>{t('delete')}</DialogTitle>
                <DialogDescription>{t('delete_ask')}</DialogDescription>
              </DialogHeader>
              <ReviewDelete
                id={reviewId}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
              />
            </>
          ) : null}
          {isReportDialogOpen ? (
            <>
              <DialogHeader>
                <DialogTitle>{t('report')}</DialogTitle>
                <DialogDescription>
                  {t_general('follow_guide')}
                </DialogDescription>
              </DialogHeader>
              <ReportForm
                targetId={reviewId}
                targetType="reviews"
                setIsReportDialogOpen={setIsReportDialogOpen}
              />
            </>
          ) : null}
        </DialogContent>
      </Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size={'sm'}>
            ...
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {isFromLoggedInUser ? (
            <>
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                <PencilLine className="mr-2 h-4 w-4" />
                <span>{t_general('update')}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                <X className="mr-2 h-4 w-4" />
                <span>{t_general('delete')}</span>
              </DropdownMenuItem>
            </>
          ) : null}
          {!isFromLoggedInUser ? (
            <>
              <DropdownMenuItem onClick={() => setIsReportDialogOpen(true)}>
                <Flag className="mr-2 h-4 w-4" />
                <span>{t_general('report')}</span>
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
