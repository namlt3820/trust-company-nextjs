'use client'

import { forgotPassword, ForgotPasswordParams } from '@/api/forgotPassword'
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
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email(),
})

export default function ForgotPasswordPage() {
  const t = useTranslations('ForgotPassword')
  const t_general = useTranslations('General')
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const forgotPasswordMutation = useMutation({
    mutationFn: (params: ForgotPasswordParams) => forgotPassword(params),
    onError: () => {
      toast({
        title: t('reset_fail'),
        description: t_general('fail_suggest'),
      })
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await forgotPasswordMutation.mutate(data)
    form.reset()
  }

  return (
    <SectionWrapper backgroundColor="bg-white">
      <SectionHeader title={t('title')} />
      <div className="mx-auto w-full max-w-lg space-y-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email">{t('email')} (*)</Label>
                      <Input
                        id="email"
                        placeholder={t('email_placeholder')}
                        {...field}
                        autoComplete="email"
                      />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button type="submit">{t('request')}</Button>
            </div>
            {forgotPasswordMutation.status === 'success' ? (
              <p className="text-center">{t('request_success')}</p>
            ) : null}
          </form>
        </Form>
      </div>
    </SectionWrapper>
  )
}
