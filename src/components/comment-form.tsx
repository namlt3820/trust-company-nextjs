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
        title: 'Created comment successfully',
      })

      location.reload()
    },
    onError: () => {
      toast({
        title: 'Created comment failed',
        description:
          'There was an error with the data provided. Please try again.',
      })
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!user) {
      return toast({
        title: 'Please log in to create a comment',
      })
    }

    if (!review) {
      toast({
        title: 'Please select a review to create a comment',
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
                    Content
                  </Label>
                  <Textarea
                    id="branch"
                    placeholder="Required. Your comment on the review. Max 5000 characters. "
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
          <Button type="submit">Create content</Button>
        </div>
      </form>
    </Form>
  )
}
