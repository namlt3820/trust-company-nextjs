import { UpdateCommentParams, updateComment } from '@/api/updateComment'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { useComments } from '@/hooks/useComments'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  content: z.string().max(5000).min(10),
})

export type CommentEditProps = {
  id: string
  content: string
  setIsEditDialogOpen: (isOpen: boolean) => void
}

export const CommentEdit: React.FC<CommentEditProps> = ({
  id,
  content,
  setIsEditDialogOpen,
}) => {
  const t = useTranslations()
  const { toast } = useToast()
  const { refetch: refetchComments } = useComments()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content,
    },
  })

  const updateCommentMutation = useMutation({
    mutationFn: (params: UpdateCommentParams) => updateComment(params),
    onSuccess: async () => {
      toast({
        title: t('Comment.update_success'),
      })
      await setIsEditDialogOpen(false)
      refetchComments()
    },
    onError: () => {
      toast({
        title: t('Comment.update_fail'),
        description: t('General.fail_suggest'),
      })
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await updateCommentMutation.mutate({
      content: data.content,
      id,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 py-4"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-7 items-center gap-4">
                  <Label htmlFor="content" className="text-right">
                    {t('Comment.content')}
                  </Label>
                  <Textarea
                    id="branch"
                    placeholder={t('Comment.content_placeholder')}
                    className="col-span-6"
                    {...field}
                  />
                  <FormMessage className="col-span-6 col-start-2" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          <Button type="submit">{t('Comment.update')}</Button>
        </div>
      </form>
    </Form>
  )
}
