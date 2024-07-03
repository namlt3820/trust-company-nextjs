import { CreateReportParams, createReport } from '@/api/createReport'
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
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/providers/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  type: z.enum([
    'defamation',
    'law_violation',
    'misinformation',
    'scam',
    'spam',
    'violence',
  ]),
  otherType: z.string().optional(),
})

export type ReportFormProps = {
  targetId: string
  targetType: 'comments' | 'reviews'
  setIsReportDialogOpen: (isOpen: boolean) => void
}

export const ReportForm: React.FC<ReportFormProps> = ({
  targetId,
  targetType,
  setIsReportDialogOpen,
}) => {
  const { toast } = useToast()
  const { user } = useAuth()
  const t = useTranslations('Report')
  const t_general = useTranslations('General')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'spam',
    },
  })

  const createReportMutation = useMutation({
    mutationFn: (params: CreateReportParams) => createReport(params),
    onSuccess: async () => {
      toast({
        title: t('creat_success'),
      })
      await setIsReportDialogOpen(false)
    },
    onError: () => {
      toast({
        title: t('create_fail'),
        description: t_general('fail_suggest'),
      })
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { type, otherType } = data

    if (!user) {
      toast({
        title: t_general('login_first'),
      })
      return
    }

    await createReportMutation.mutate({
      targetId,
      targetType,
      user: user.id,
      type,
      otherType,
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-7 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  {t('type')}
                </Label>
                <div className="col-span-6">
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('type_placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="defamation">
                        {t('defamation')}
                      </SelectItem>
                      <SelectItem value="law_violation">
                        {t('law_violation')}
                      </SelectItem>
                      <SelectItem value="misinformation">
                        {t('misinformation')}
                      </SelectItem>
                      <SelectItem value="scam">{t('scam')}</SelectItem>
                      <SelectItem value="spam">Spam</SelectItem>
                      <SelectItem value="violation">
                        {t('violation')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="otherType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-7 items-center gap-4">
                  <Label htmlFor="otherType" className="text-right">
                    {t('other_type')}
                  </Label>
                  <Input
                    id="otherType"
                    placeholder={t('other_type_placeholder')}
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
