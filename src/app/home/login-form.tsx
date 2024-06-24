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
import { useAuth } from '@/providers/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter valid email',
  }),
  password: z.string(),
})

export const LoginForm: React.FC = () => {
  const { toast } = useToast()
  const { login } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = useCallback(
    async (data: z.infer<typeof formSchema>) => {
      try {
        await login(data)
        toast({
          title: 'Logged in successfully',
        })
        location.reload()
      } catch (_) {
        toast({
          title: 'Logged in failed',
          description:
            'There was an error with the credentials provided. Please try again.',
        })
      }
    },
    [login, toast]
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto grid gap-6 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[1fr_1fr]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your_email@gmail.com" {...field} />
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
              <FormLabel>Password</FormLabel>
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

        <Button type="submit" className="col-span-2">
          Login
        </Button>

        <Separator className="col-span-2" />

        <p className="col-span-2 text-center text-sm leading-none">
          If you can&apos;t login, please
          <Link
            href={'/account/create'}
            className="underline decoration-1 underline-offset-4"
          >
            {' '}
            create an account
          </Link>{' '}
          or check{' '}
          <Link
            href={'/account/forgot-password'}
            className="underline decoration-1 underline-offset-4"
          >
            forgot password
          </Link>
        </p>
      </form>
    </Form>
  )
}
