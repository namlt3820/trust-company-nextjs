'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import { Link } from '@/navigation'
import { useAuth } from '@/providers/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export type LoginFormProps = {
  setLoginFormOpen: (state: boolean) => void
  setNavbarClose?: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({
  setLoginFormOpen,
  setNavbarClose,
}) => {
  const { toast } = useToast()
  const { login } = useAuth()
  const t = useTranslations()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const formSchema = z.object({
    email: z.string().email({
      message: t('Login.email_valid'),
    }),
    password: z.string(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await login(data)
      toast({
        title: t('Login.success'),
      })
      location.reload()
    } catch (_) {
      toast({
        title: t('Login.fail'),
        description: t('General.fail_suggest'),
      })
    }
  }

  const onCloseModal = () => {
    setNavbarClose && setNavbarClose()
    setLoginFormOpen(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto grid grid-cols-1 gap-6 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] lg:grid-cols-[1fr_1fr]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Login.email')}</FormLabel>
              <FormControl>
                <Input
                  placeholder="user@gmail.com"
                  {...field}
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('Login.password')}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="w5R#xG3U@LdF9b&2m7$H"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className={cn({ 'col-span-2': isDesktop })}>
          {t('Login.action')}
        </Button>

        <Separator className={cn({ 'col-span-2': isDesktop })} />

        <p className={cn({ 'col-span-2': isDesktop }, 'text-center text-sm')}>
          {t('Login.you_cant')}
          <br />
          <Link href={'/account/create'}>
            {' '}
            <span
              className="underline decoration-1 underline-offset-4"
              onClick={onCloseModal}
            >
              {t('Login.create_account')}
            </span>
          </Link>{' '}
          {t('Login.check')}{' '}
          <Link href={'/account/forgot-password'}>
            <span
              className="underline decoration-1 underline-offset-4"
              onClick={onCloseModal}
            >
              {t('Login.forgot_password')}
            </span>
          </Link>
        </p>
      </form>
    </Form>
  )
}
