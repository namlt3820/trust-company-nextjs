import { DeleteCommentParams, deleteComment } from '@/api/deleteComment'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useComments } from '@/hooks/useComments'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React from 'react'

export type CommentDeleteProps = {
  id: string
  setIsDeleteDialogOpen: (isOpen: boolean) => void
}

export const CommentDelete: React.FC<CommentDeleteProps> = ({
  id,
  setIsDeleteDialogOpen,
}) => {
  const t = useTranslations()
  const { toast } = useToast()
  const { refetch: refetchComments } = useComments()

  const deleteCommentMutation = useMutation({
    mutationFn: (params: DeleteCommentParams) => deleteComment(params),
    onSuccess: async () => {
      toast({
        title: t('Comment.delete_successfully'),
      })
      await setIsDeleteDialogOpen(false)
      refetchComments()
    },
    onError: () => {
      toast({
        title: t('Comment.delete_fail'),
        description: t('Home.action_fail_suggest'),
      })
    },
  })

  return (
    <div className="flex justify-between md:px-80">
      <Button variant={'outline'} onClick={() => setIsDeleteDialogOpen(false)}>
        No, I want to keep it
      </Button>
      <Button onClick={() => deleteCommentMutation.mutate({ id })}>
        Yes, delete it
      </Button>
    </div>
  )
}
