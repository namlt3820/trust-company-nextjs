'use client'

import { createUser, CreateUserParams } from '@/api/createUser'
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
  name: z.string().max(50).min(1),
  password: z.string().min(8),
  email: z.string().email(),
})

export default function CreateAccount() {
  const t = useTranslations('CreateAccount')
  const t_general = useTranslations('General')
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const createAccountMutation = useMutation({
    mutationFn: (params: CreateUserParams) => createUser(params),
    onError: () => {
      toast({
        title: t('create_fail'),
        description: t_general('fail_suggest'),
      })
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await createAccountMutation.mutate(data)
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">{t('name')} (*)</Label>
                      <Input
                        id="name"
                        placeholder={t('name_placeholder')}
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
                      />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button type="submit">{t('create')}</Button>
            </div>
            {createAccountMutation.status === 'success' ? (
              <p className="text-center">{t('create_success')}</p>
            ) : null}
          </form>
        </Form>
      </div>
    </SectionWrapper>
  )
}
