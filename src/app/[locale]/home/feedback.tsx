'use client'

import { CreateFeedbackParams, createFeedback } from '@/api/createFeedback'
import { SectionHeader } from '@/components/section-header'
import { SectionWrapper } from '@/components/section-wrapper'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  content: z.string().max(5000).min(10),
  name: z.string().max(100).optional(),
  email: z.string().optional(),
})

export const Feedback: React.FC = () => {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      content: '',
    },
  })

  const createFeedbackMutation = useMutation({
    mutationFn: (params: CreateFeedbackParams) => createFeedback(params),
    onSuccess: async () => {
      toast({
        title: 'Created feedback successfully',
      })
    },
    onError: () => {
      toast({
        title: 'Creating feedback failed',
        description:
          'There was an error with the data provided. Please try again.',
      })
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await createFeedbackMutation.mutate(data)
    form.reset()
  }

  return (
    <SectionWrapper>
      <SectionHeader
        title="Share Your Feedback"
        subtitle="Your feedback is a crucial factor in helping the website develop and serve users better. Please be as specific and detailed as possible. Rest assured that your opinions are always listened to and responded to promptly."
      />
      <div className="mx-auto w-full max-w-lg space-y-2" id="feedback_section">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="branch" placeholder="Optional." {...field} />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="branch"
                        placeholder="Optional. Only needed if you require a response from us. "
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="content">Feedback (*)</Label>
                      <Textarea
                        id="branch"
                        placeholder="Required. Max 5000 characters. Your feedback on any areas that need improvement on the website."
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button type="submit">Create feedback</Button>
            </div>
          </form>
        </Form>
      </div>
    </SectionWrapper>
  )
}
