import { CreateCommentParams, createComment } from '@/api/createComment'
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
import { useAuth } from '@/providers/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  content: z.string().max(5000).min(10),
})

export type CommentFormProps = {}

export const CommentForm: React.FC<CommentFormProps> = () => {
  const { user } = useAuth()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const router = useRouter()
  const review = searchParams.get('review')
  const t = useTranslations('Comment')
  const t_general = useTranslations('General')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  })

  const createCommentMutation = useMutation({
    mutationFn: (params: CreateCommentParams) => createComment(params),
    onSuccess: async () => {
      toast({
        title: t('create_success'),
      })

      location.reload()
    },
    onError: () => {
      toast({
        title: t('create_fail'),
        description: t_general('fail_suggest'),
      })
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!user) {
      return toast({
        title: t_general('login_first'),
      })
    }

    if (!review) {
      toast({
        title: t('review_first'),
      })
      router.push('/')
    }

    await createCommentMutation.mutate({
      user: user.id,
      review: review as string,
      content: data.content,
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
                    {t('content')}
                  </Label>
                  <Textarea
                    id="branch"
                    placeholder={t('content_placeholder')}
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
          <Button type="submit">{t('create')}</Button>
        </div>
      </form>
    </Form>
  )
}
