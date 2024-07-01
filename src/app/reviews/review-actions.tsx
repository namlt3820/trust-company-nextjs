import { ReviewDelete } from '@/app/reviews/review-delete'
import { ReviewEdit } from '@/app/reviews/review-edit'
import { CommentForm } from '@/components/comment-form'
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
import { Review } from '@/lib/payloadTypes'
import { useAuth } from '@/providers/Auth'
import { Flag, PencilLine, X } from 'lucide-react'
import { useState } from 'react'

export type ReviewActionsProps = {
  review: Review
}

export const ReviewActions: React.FC<ReviewActionsProps> = ({ review }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)

  const { user } = useAuth()
  const { id: reviewId, populatedUser, updatedAt } = review
  const { name, id } = populatedUser!
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
                <DialogTitle>Update comment</DialogTitle>
                <DialogDescription>
                  Please follow our guide and try to be as descriptive and
                  helpful as you&apos;d like.
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
                <DialogTitle>Delete review</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete your review?
                </DialogDescription>
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
                <DialogTitle>Report comment</DialogTitle>
                <DialogDescription>
                  Please follow our guide and try to be as descriptive and
                  helpful as you&apos;d like.
                </DialogDescription>
              </DialogHeader>
              <CommentForm />
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
                <span>Update</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                <X className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </>
          ) : null}
          {!isFromLoggedInUser ? (
            <>
              <DropdownMenuItem onClick={() => setIsReportDialogOpen(true)}>
                <Flag className="mr-2 h-4 w-4" />
                <span>Report</span>
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
