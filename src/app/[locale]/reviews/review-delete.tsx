import { DeleteReviewParams, deleteReview } from '@/api/deleteReview'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useReviews } from '@/hooks/useReviews'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
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
  const t = useTranslations('Review')
  const t_general = useTranslations('General')

  const deleteReviewMutation = useMutation({
    mutationFn: (params: DeleteReviewParams) => deleteReview(params),
    onSuccess: async () => {
      toast({
        title: t('delete_success'),
      })
      await setIsDeleteDialogOpen(false)
      refetchReviews()
    },
    onError: () => {
      toast({
        title: t('delete_fail'),
        description: t_general('fail_suggest'),
      })
    },
  })

  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:gap-0 md:px-80">
      <Button variant={'outline'} onClick={() => setIsDeleteDialogOpen(false)}>
        {t_general('no_delete')}
      </Button>
      <Button onClick={() => deleteReviewMutation.mutate({ id })}>
        {t_general('yes_delete')}
      </Button>
    </div>
  )
}
