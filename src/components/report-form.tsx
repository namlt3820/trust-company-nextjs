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
import { Report } from '@/lib/payloadTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  content: z.string().max(5000).min(10),
})

export type ReportFormProps = {
  targetId: string
  targetType: 'comments' | 'reviews'
  type: Report['type']
  otherType: string
  setIsReportDialogOpen: (isOpen: boolean) => void
}

export const ReportForm: React.FC<ReportFormProps> = ({
  targetId,
  targetType,
  type,
  otherType,
  setIsReportDialogOpen,
}) => {
  const { toast } = useToast()
  const { refetch: refetchComments } = useComments()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content,
    },
  })

  const createReportMutation = useMutation({
    mutationFn: (params: UpdateCommentParams) => updateComment(params),
    onSuccess: async () => {
      toast({
        title: 'Updated comment successfully',
      })
      await setIsEditDialogOpen(false)
      refetchComments()
    },
    onError: () => {
      toast({
        title: 'Updating comment failed',
        description:
          'There was an error with the data provided. Please try again.',
      })
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await createReportMutation.mutate({
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
          <Button type="submit">Update comment</Button>
        </div>
      </form>
    </Form>
  )
}
