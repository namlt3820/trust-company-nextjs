'use client'

import LocaleSwitcher from '@/app/[locale]/home/locale-switcher'
import { LoginForm } from '@/app/[locale]/home/login-form'
import { Icons } from '@/components/icons'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { useAuth } from '@/providers/Auth'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useRef } from 'react'
import { RemoveScroll } from 'react-remove-scroll'

const LinkClassname =
  'text-sm font-medium underline-offset-4 hover:underline focus:outline-none'

export const NavBar: React.FC = () => {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = useRef(searchParams.get('redirect'))

  const onLogoutClick = async () => {
    try {
      await logout()
      toast({
        title: 'Logged out successfully',
      })
      router.push('/')
    } catch (_) {
      toast({
        title: 'Logged out failed',
      })
    }
  }

  return (
    <header
      className={cn(
        RemoveScroll.classNames.zeroRight,
        'md:translate-y-0/2 fixed inset-x-0 top-0 z-50 translate-y-0 bg-white shadow-lg dark:bg-gray-950'
      )}
    >
      <div className="container flex h-14 items-center px-16 md:px-20">
        <Link
          href="/"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <Icons.logo className="h-8 w-8 pr-2" />
          <span className="text-sm font-medium">TrustCompany</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          {user ? (
            <>
              <Link
                href={`/reviews?user=${user.id}&page=1&limit=10`}
                className={LinkClassname}
                prefetch={false}
              >
                My Reviews
              </Link>
              <Link
                href={`/comments?user=${user.id}&page=1&limit=10`}
                className={LinkClassname}
                prefetch={false}
              >
                My Comments
              </Link>
            </>
          ) : null}
          <Link href="/guide" className={LinkClassname} prefetch={false}>
            Guide
          </Link>
          <a href="#feedback_section" className={LinkClassname}>
            Feedback
          </a>
          {user ? null : (
            <Popover>
              <PopoverTrigger className={LinkClassname}>Login</PopoverTrigger>
              <PopoverContent align="end" className="w-[34rem]">
                <LoginForm />
              </PopoverContent>
            </Popover>
          )}
          <LocaleSwitcher />
          {user ? (
            <button className={LinkClassname} onClick={onLogoutClick}>
              Logout
            </button>
          ) : null}
        </nav>
      </div>
    </header>
  )
}
