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
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/providers/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  branch: z.string().max(100),
  detailed_review: z.string(),
  duration: z.coerce.number().min(1),
  title: z.string().max(100),
  facilities: z.string().max(500),
  team: z.string().max(500),
  process: z.string().max(500),
  benefits: z.string().max(500),
})

export type ReviewFormProps = {}

export const ReviewForm: React.FC<ReviewFormProps> = () => {
  const { user } = useAuth()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branch: '',
      detailed_review: '',
      duration: 1,
      title: '',
      facilities: '',
      team: '',
      process: '',
      benefits: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log({ data })
      toast({
        title: 'Created review successfully',
      })
    } catch (_) {
      toast({
        title: 'Created review failed',
        description:
          'There was an error with the data provided. Please try again.',
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 py-4"
      >
        <FormField
          control={form.control}
          name="detailed_review"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-7 items-center gap-4">
                  <Label htmlFor="detailed_review" className="text-right">
                    Detailed review (*)
                  </Label>
                  <RichTextEditor className="col-span-6" />
                  <FormMessage className="col-span-6 col-start-2" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

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
                    placeholder="Optional. Specify how long you have worked at that company. Must be at least one month."
                    className="col-span-6"
                    type="number"
                    {...field}
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
