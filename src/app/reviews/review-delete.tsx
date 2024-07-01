import { DeleteReviewParams, deleteReview } from '@/api/deleteReview'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useReviews } from '@/hooks/useReviews'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

export type ReviewDeleteProps = {
  id: string
  setIsDeleteDialogOpen: (isOpen: boolean) => void
}

export const ReviewDelete: React.FC<ReviewDeleteProps> = ({
  id,
  setIsDeleteDialogOpen,
}) => {
  const { toast } = useToast()
  const { refetch: refetchReviews } = useReviews()

  const deleteReviewMutation = useMutation({
    mutationFn: (params: DeleteReviewParams) => deleteReview(params),
    onSuccess: async () => {
      toast({
        title: 'Deleted review successfully',
      })
      await setIsDeleteDialogOpen(false)
      refetchReviews()
    },
    onError: () => {
      toast({
        title: 'Deleting review failed',
        description:
          'There was an error with the data provided. Please try again.',
      })
    },
  })

  return (
    <div className="flex justify-between md:px-80">
      <Button variant={'outline'} onClick={() => setIsDeleteDialogOpen(false)}>
        No, I want to keep it
      </Button>
      <Button onClick={() => deleteReviewMutation.mutate({ id })}>
        Yes, delete it
      </Button>
    </div>
  )
}
