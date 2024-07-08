import { CommentDelete } from '@/app/[locale]/comments/comment-delete'
import { CommentEdit } from '@/app/[locale]/comments/comment-edit'
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
import { Comment, User } from '@/lib/payloadTypes'
import { useAuth } from '@/providers/Auth'
import { Flag, PencilLine, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export type CommentActionsProps = {
  comment: Comment
}

export const CommentActions: React.FC<CommentActionsProps> = ({ comment }) => {
  const t = useTranslations()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)

  const { user } = useAuth()
  const { id: commentId, user: author, content } = comment
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
                <DialogTitle>{t('Comment.update')}</DialogTitle>
                <DialogDescription>
                  {t('General.follow_guide')}
                </DialogDescription>
              </DialogHeader>
              <CommentEdit
                id={commentId}
                content={content}
                setIsEditDialogOpen={setIsEditDialogOpen}
              />
            </>
          ) : null}
          {isDeleteDialogOpen ? (
            <>
              <DialogHeader>
                <DialogTitle>{t('Comment.delete')}</DialogTitle>
                <DialogDescription>{t('Comment.delete_ask')}</DialogDescription>
              </DialogHeader>
              <CommentDelete
                id={commentId}
                setIsDeleteDialogOpen={setIsDeleteDialogOpen}
              />
            </>
          ) : null}
          {isReportDialogOpen ? (
            <>
              <DialogHeader>
                <DialogTitle>{t('Comment.report')}</DialogTitle>
                <DialogDescription>
                  {t('General.follow_guide')}
                </DialogDescription>
              </DialogHeader>
              <ReportForm
                targetType="comments"
                targetId={commentId}
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
                <span>{t('General.update')}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                <X className="mr-2 h-4 w-4" />
                <span>{t('General.delete')}</span>
              </DropdownMenuItem>
            </>
          ) : null}
          {!isFromLoggedInUser ? (
            <>
              <DropdownMenuItem onClick={() => setIsReportDialogOpen(true)}>
                <Flag className="mr-2 h-4 w-4" />
                <span>{t('General.report')}</span>
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
