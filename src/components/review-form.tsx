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
import { useRouter } from '@/navigation'
import { useAuth } from '@/providers/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
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
  const t = useTranslations('Review')
  const t_general = useTranslations('General')

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

    if (!company) {
      toast({
        title: t('company_first'),
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
                  {t('rate')} (*)
                </Label>
                <div className="col-span-6">
                  <Select onValueChange={field.onChange}>
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
          <Label htmlFor="detailed_review" className="text-right">
            {t('detailed_review')} (*)
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
                    {t('branch')}
                  </Label>
                  <Input
                    id="branch"
                    placeholder={t('branch_placeholder')}
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
                    {t('duration')}
                  </Label>
                  <Input
                    id="duration"
                    placeholder={t('duration_placeholder')}
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
                    {t('title')}
                  </Label>
                  <Input
                    id="title"
                    placeholder={t('title_placeholder')}
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
                    {t('facilities')}
                  </Label>
                  <Textarea
                    id="facilities"
                    placeholder={t('facilities_placeholder')}
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
                    {t('team')}
                  </Label>
                  <Textarea
                    id="team"
                    placeholder={t('team_placeholder')}
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
                    {t('process')}
                  </Label>
                  <Textarea
                    id="process"
                    placeholder={t('process_placeholder')}
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
                    {t('benefits')}
                  </Label>
                  <Textarea
                    id="benefits"
                    placeholder={t('benefits_placeholder')}
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
