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
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  content: z.string().max(5000).min(10),
  name: z.string().max(100).optional(),
  email: z.string().optional(),
})

export const Feedback: React.FC = () => {
  const t = useTranslations()
  const { toast } = useToast()
  const isDesktop = useMediaQuery('(min-width: 768px)')

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
        title: t('Feedback.create_success'),
      })
    },
    onError: () => {
      toast({
        title: t('Feedback.create_fail'),
        description: t('General.fail_suggest'),
      })
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await createFeedbackMutation.mutate(data)
    form.reset()
  }

  return (
    <SectionWrapper backgroundColor="bg-white">
      <SectionHeader
        title={t('Feedback.share')}
        subtitle={t('Feedback.share_reason')}
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
                      <Label htmlFor="name">{t('Feedback.name')}</Label>
                      <Input
                        id="name"
                        placeholder={t('Feedback.name_placeholder')}
                        {...field}
                        autoComplete="name"
                      />
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
                      <Label htmlFor="email">{t('Feedback.email')}</Label>
                      {isDesktop ? (
                        <Input
                          id="email"
                          placeholder={t('Feedback.email_placeholder')}
                          {...field}
                          autoComplete="email"
                        />
                      ) : (
                        <Textarea
                          id="email"
                          placeholder={t('Feedback.email_placeholder')}
                          {...field}
                          autoComplete="email"
                        />
                      )}
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
                      <Label htmlFor="content">
                        {t('Feedback.content')} (*)
                      </Label>
                      <Textarea
                        id="content"
                        placeholder={t('Feedback.content_placeholder')}
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button type="submit">{t('Feedback.create')}</Button>
            </div>
          </form>
        </Form>
      </div>
    </SectionWrapper>
  )
}
