import { CreateReviewParams, createReview } from '@/api/createReview'
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
import { useAuth } from '@/providers/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
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

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

export type ReviewFormProps = {}

export const ReviewForm: React.FC<ReviewFormProps> = () => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [editorData, setEditorData] = useState<Descendant[]>(initialValue)
  const searchParams = useSearchParams()
  const router = useRouter()
  const company = searchParams.get('company')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branch: '',
      duration: 1,
      benefits: '',
      facilities: '',
      title: '',
      team: '',
      process: '',
      rate: 'normal',
    },
  })

  const createReviewMutation = useMutation({
    mutationFn: (params: CreateReviewParams) => createReview(params),
    onSuccess: async () => {
      toast({
        title: 'Created review successfully',
      })

      location.reload()
    },
    onError: () => {
      toast({
        title: 'Created review failed',
        description:
          'There was an error with the data provided. Please try again.',
      })
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!user) {
      return toast({
        title: 'Please log in to create a review',
      })
    }

    if (!company) {
      toast({
        title: 'Please select a company to create a review',
      })
      router.push('/')
    }

    const {
      branch,
      title,
      duration,
      benefits,
      process,
      team,
      facilities,
      rate,
    } = data

    await createReviewMutation.mutate({
      user: user.id,
      company: company as string,
      branch,
      title,
      duration,
      benefits,
      process,
      team,
      facilities,
      detailedReview: editorData,
      rate,
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
                  <Select onValueChange={field.onChange}>
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
          <RichTextEditor className="col-span-6" onChange={setEditorData} />
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
                    placeholder="Optional. A large company can have many branches. Specify the geographical location or the name of the branch where you work. Max 200 characters. "
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
                    Duration
                  </Label>
                  <Input
                    id="duration"
                    placeholder="Optional. Specify how many months you have worked at the company. Must be at least one month."
                    className="col-span-6"
                    type="number"
                    onChange={field.onChange}
                    min={1}
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
                    placeholder="Optional. List all the titles you have held while working at the company. Max 100 characters. "
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
                    placeholder="Optional. Provide a brief description of the company's infrastructure or office working conditions, focusing on factors that support or hinder your work. Max 500 characters. "
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
                    placeholder="Optional. Provide a brief description of your work team. Include the number, quality, and teamwork capabilities. Focus on general experiences—positive or negative—working with them, without going into specific individuals. Max 500 characters. "
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
                    placeholder="Optional. Provide a brief description of the company's workflow and how it has either supported or hindered your job functions. Max 500 characters. "
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
                    placeholder="Optional. Provide a brief description of the benefits you receive while working at the company. Have they met your expectations? Are there any benefits you feel are lacking? Max 500 characters. "
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
          <Button type="submit">Create review</Button>
        </div>
      </form>
    </Form>
  )
}
