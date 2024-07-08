'use client'

import { resetPassword, ResetPasswordParams } from '@/api/resetPassword'
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
import { useRouter } from '@/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  password: z.string().min(8),
})

export default function ResetPasswordPage() {
  const t = useTranslations('ForgotPassword')
  const t_general = useTranslations('General')
  const searchParams = useSearchParams()
  const token = searchParams.get('token') || ''
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  })

  const forgotPasswordMutation = useMutation({
    mutationFn: (params: ResetPasswordParams) => resetPassword(params),
    onError: () => {
      toast({
        title: t('reset_fail'),
        description: t_general('fail_suggest'),
      })
    },
    onSuccess: () => {
      setTimeout(() => {
        router.push('/')
      }, 3000)
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await forgotPasswordMutation.mutate({
      password: data.password,
      token,
    })
    form.reset()
  }

  return (
    <SectionWrapper backgroundColor="bg-white">
      <SectionHeader title={t('reset_title')} />
      <div className="mx-auto w-full max-w-lg space-y-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="password">{t('password')} (*)</Label>
                      <Input
                        id="password"
                        placeholder={t('password_placeholder')}
                        {...field}
                        autoComplete="password"
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
              <p className="text-center">{t('reset_success')}</p>
            ) : null}
          </form>
        </Form>
      </div>
    </SectionWrapper>
  )
}
