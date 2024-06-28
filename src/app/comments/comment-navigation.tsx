import { CommentForm } from '@/components/comment-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PencilLine } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export const CommentNavigation: React.FC = () => {
  const searchParams = useSearchParams()
  const review = searchParams.get('review')
  const router = useRouter()

  return (
    <div className="flex justify-between md:mb-10">
      <Dialog>
        <DialogTrigger asChild>
          {review ? (
            <Button className="flex gap-1">
              <PencilLine className="h-4 w-4" />
              Create comment
            </Button>
          ) : (
            <div></div>
          )}
        </DialogTrigger>
        <DialogContent className="max-h-screen max-w-screen-xl overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Create comment</DialogTitle>
            <DialogDescription>
              Please follow our guide and try to be as descriptive and helpful
              as you&apos;d like.
            </DialogDescription>
          </DialogHeader>
          <CommentForm />
        </DialogContent>
      </Dialog>
      <Button variant={'outline'} onClick={router.back}>
        Back to reviews
      </Button>
    </div>
  )
}
