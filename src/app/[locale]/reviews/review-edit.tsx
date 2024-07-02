import { UpdateReviewParams, updateReview } from '@/api/updateReview'
import { RichTextEditor } from '@/components/rich-text-editor'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { useReviews } from '@/hooks/useReviews'
import { Review } from '@/lib/payloadTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Descendant } from 'slate'
import { z } from 'zod'

const formSchema = z.object({
  rate: z.enum(['terrible', 'bad', 'normal', 'good', 'excellent']),
  branch: z.string().max(100).optional(),
  duration: z.coerce.number().min(1).max(1000).optional(),
  title: z.string().max(100).optional(),
  facilities: z.string().max(500).optional(),
  team: z.string().max(500).optional(),
  process: z.string().max(500).optional(),
  benefits: z.string().max(500).optional(),
})

export type ReviewEditProps = {
  id: string
  review: Review
  setIsEditDialogOpen: (isOpen: boolean) => void
}

export const ReviewEdit: React.FC<ReviewEditProps> = ({
  id,
  review,
  setIsEditDialogOpen,
}) => {
  const { toast } = useToast()
  const { refetch: refetchReviews } = useReviews()
  const { basicReview, relevantInformation, detailedReview, rate } = review
  const [editorData, setEditorData] = useState<Descendant[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branch: relevantInformation?.branch || '',
      duration: relevantInformation?.duration || 1,
      benefits: basicReview?.benefits || '',
      facilities: basicReview?.facilities || '',
      title: relevantInformation?.title || '',
      team: basicReview?.team || '',
      process: basicReview?.process || '',
      rate: rate || 'normal',
    },
  })

  const updateReviewMutation = useMutation({
    mutationFn: (params: UpdateReviewParams) => updateReview(params),
    onSuccess: async () => {
      toast({
        title: 'Updated review successfully',
      })
      await setIsEditDialogOpen(false)
      refetchReviews()
    },
    onError: () => {
      toast({
        title: 'Updating review failed',
        description:
          'There was an error with the data provided. Please try again.',
      })
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await updateReviewMutation.mutate({
      ...data,
      id,
      detailedReview: editorData,
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
          name="rate"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-7 items-center gap-4">
                <Label htmlFor="rate" className="text-right">
                  Rate (*)
                </Label>
                <div className="col-span-6">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Required. Select a rating for your company" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="excellent">excellent</SelectItem>
                      <SelectItem value="good">good</SelectItem>
                      <SelectItem value="normal">normal</SelectItem>
                      <SelectItem value="bad">bad</SelectItem>
                      <SelectItem value="terrible">terrible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-7 items-center gap-4">
          <Label htmlFor="detailed_review" className="text-right">
            Detailed review (*)
          </Label>
          <RichTextEditor
            className="col-span-6"
            onChange={setEditorData}
            editValue={detailedReview as Descendant[]}
          />
          <FormMessage className="col-span-6 col-start-2" />
        </div>

        <FormField
          control={form.control}
          name="branch"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-7 items-center gap-4">
                  <Label htmlFor="branch" className="text-right">
                    Branch
                  </Label>
                  <Input
                    id="branch"
                    placeholder="Optional. Max 100 characters. A large company can have many branches. Specify the geographical location or the name of the branch where you work. "
                    className="col-span-6"
                    {...field}
                  />
                  <FormMessage className="col-span-6 col-start-2" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-7 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Duration (months)
                  </Label>
                  <Input
                    id="duration"
                    placeholder="Optional. Specify how many months you have worked at the company. Must be at least one month."
                    className="col-span-6"
                    type="number"
                    min={1}
                    {...field}
                  />
                  <FormMessage className="col-span-6 col-start-2" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-7 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Optional. Max 100 characters. List all the titles you have held while working at the company."
                    className="col-span-6"
                    {...field}
                  />
                  <FormMessage className="col-span-6 col-start-2" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="facilities"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-7 items-center gap-4">
                  <Label htmlFor="facilities" className="text-right">
                    Facilities
                  </Label>
                  <Textarea
                    id="facilities"
                    placeholder="Optional. Max 500 characters. Provide a brief description of the company's infrastructure or office working conditions, focusing on factors that support or hinder your work. "
                    className="col-span-6"
                    {...field}
                  />

                  <FormMessage className="col-span-6 col-start-2" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="team"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-7 items-center gap-4">
                  <Label htmlFor="team" className="text-right">
                    Team
                  </Label>
                  <Textarea
                    id="team"
                    placeholder="Optional. Max 500 characters. Provide a brief description of your work team. Include the number, quality, and teamwork capabilities. Focus on general experiences—positive or negative—working with them, without going into specific individuals.  "
                    className="col-span-6"
                    {...field}
                  />
                  <FormMessage className="col-span-6 col-start-2" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="process"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-7 items-center gap-4">
                  <Label htmlFor="process" className="text-right">
                    Process
                  </Label>
                  <Textarea
                    id="process"
                    placeholder="Optional. Max 500 characters. Provide a brief description of the company's workflow and how it has either supported or hindered your job functions.  "
                    className="col-span-6"
                    {...field}
                  />
                  <FormMessage className="col-span-6 col-start-2" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="benefits"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-7 items-center gap-4">
                  <Label htmlFor="benefits" className="text-right">
                    Benefits
                  </Label>
                  <Textarea
                    id="benefits"
                    placeholder="Optional. Max 500 characters. Provide a brief description of the benefits you receive while working at the company. Have they met your expectations? Are there any benefits you feel are lacking? "
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
          <Button type="submit">Update review</Button>
        </div>
      </form>
    </Form>
  )
}
