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
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReviews } from '@/hooks/useReviews'
import { Review } from '@/lib/payloadTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
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
  const t = useTranslations('Review')
  const t_general = useTranslations('General')
  const isDesktop = useMediaQuery('(min-width: 768px)')

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
        title: t('update_success'),
      })
      await setIsEditDialogOpen(false)
      refetchReviews()
    },
    onError: () => {
      toast({
        title: t('update_fail'),
        description: t_general('fail_suggest'),
      })
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await updateReviewMutation.mutate({
      ...data,
      id,
      detailedReview: editorData.length
        ? editorData
        : (detailedReview as Descendant[]),
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
                <Label
                  htmlFor="rate"
                  className="col-span-7 text-left md:col-span-1 md:text-right"
                >
                  {t('rate')} (*)
                </Label>
                <div className="col-span-7 md:col-span-6">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('rate_placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="excellent">
                        {t('excellent')}
                      </SelectItem>
                      <SelectItem value="good">{t('good')}</SelectItem>
                      <SelectItem value="normal">{t('normal')}</SelectItem>
                      <SelectItem value="bad">{t('bad')}</SelectItem>
                      <SelectItem value="terrible">{t('terrible')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-7 items-center gap-4">
          <Label
            htmlFor="detailed_review"
            className="col-span-7 text-left md:col-span-1 md:text-right"
          >
            {t('detailed_review')} (*)
          </Label>
          <RichTextEditor
            className="col-span-7 md:col-span-6"
            onChange={setEditorData}
            editValue={detailedReview as Descendant[]}
          />
          <FormMessage className="col-span-7 md:col-span-6 md:col-start-2" />
        </div>

        <FormField
          control={form.control}
          name="branch"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-7 items-center gap-4">
                  <Label
                    htmlFor="branch"
                    className="col-span-7 text-left md:col-span-1 md:text-right"
                  >
                    {t('branch')}
                  </Label>
                  {isDesktop ? (
                    <Input
                      id="branch"
                      placeholder={t('branch_placeholder')}
                      className="col-span-7 md:col-span-6"
                      {...field}
                    />
                  ) : (
                    <Textarea
                      id="branch"
                      placeholder={t('branch_placeholder')}
                      className="col-span-7 md:col-span-6"
                      {...field}
                    />
                  )}
                  <FormMessage className="col-span-7 md:col-span-6 md:col-start-2" />
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
                  <Label
                    htmlFor="duration"
                    className="col-span-7 text-left md:col-span-1 md:text-right"
                  >
                    {t('duration')}
                  </Label>
                  <Input
                    id="duration"
                    placeholder={t('duration_placeholder')}
                    className="col-span-7 md:col-span-6"
                    type="number"
                    min={1}
                    {...field}
                  />
                  <FormMessage className="col-span-7 md:col-span-6 md:col-start-2" />
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
                  <Label
                    htmlFor="title"
                    className="col-span-7 text-left md:col-span-1 md:text-right"
                  >
                    {t('title')}
                  </Label>
                  {isDesktop ? (
                    <Input
                      id="title"
                      placeholder={t('title_placeholder')}
                      className="col-span-7 md:col-span-6"
                      {...field}
                    />
                  ) : (
                    <Textarea
                      id="title"
                      placeholder={t('title_placeholder')}
                      className="col-span-7 md:col-span-6"
                      {...field}
                    />
                  )}
                  <FormMessage className="col-span-7 md:col-span-6 md:col-start-2" />
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
                  <Label
                    htmlFor="facilities"
                    className="col-span-7 text-left md:col-span-1 md:text-right"
                  >
                    {t('facilities')}
                  </Label>
                  <Textarea
                    id="facilities"
                    placeholder={t('facilities_placeholder')}
                    className="col-span-7 md:col-span-6"
                    {...field}
                  />

                  <FormMessage className="col-span-7 md:col-span-6 md:col-start-2" />
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
                  <Label
                    htmlFor="team"
                    className="col-span-7 text-left md:col-span-1 md:text-right"
                  >
                    {t('team')}
                  </Label>
                  <Textarea
                    id="team"
                    placeholder={t('team_placeholder')}
                    className="col-span-7 md:col-span-6"
                    {...field}
                  />
                  <FormMessage className="col-span-7 md:col-span-6 md:col-start-2" />
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
                  <Label
                    htmlFor="process"
                    className="col-span-7 text-left md:col-span-1 md:text-right"
                  >
                    {t('process')}
                  </Label>
                  <Textarea
                    id="process"
                    placeholder={t('process_placeholder')}
                    className="col-span-7 md:col-span-6"
                    {...field}
                  />
                  <FormMessage className="col-span-7 md:col-span-6 md:col-start-2" />
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
                  <Label
                    htmlFor="benefits"
                    className="col-span-7 text-left md:col-span-1 md:text-right"
                  >
                    {t('benefits')}
                  </Label>
                  <Textarea
                    id="benefits"
                    placeholder={t('benefits_placeholder')}
                    className="col-span-7 md:col-span-6"
                    {...field}
                  />
                  <FormMessage className="col-span-7 md:col-span-6 md:col-start-2" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          <Button type="submit">{t('update')}</Button>
        </div>
      </form>
    </Form>
  )
}
