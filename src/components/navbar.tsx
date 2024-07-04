'use client'

import { LocaleSwitcher } from '@/app/[locale]/home/locale-switcher'
import { LoginForm } from '@/app/[locale]/home/login-form'
import { Icons } from '@/components/icons'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { Link, useRouter } from '@/navigation'
import { useAuth } from '@/providers/Auth'
import { useTranslations } from 'next-intl'
import React from 'react'
import { RemoveScroll } from 'react-remove-scroll'

const LinkClassname =
  'text-sm font-medium underline-offset-4 hover:underline focus:outline-none'

export const NavBar: React.FC = () => {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const t_logout = useTranslations('Logout')
  const t_navbar = useTranslations('Navbar')
  const t_login = useTranslations('Login')

  const onLogoutClick = async () => {
    try {
      await logout()
      toast({
        title: t_logout('success'),
      })
      router.push('/')
    } catch (_) {
      toast({
        title: t_logout('fail'),
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
                {t_navbar('my_reviews')}
              </Link>
              <Link
                href={`/comments?user=${user.id}&page=1&limit=10`}
                className={LinkClassname}
                prefetch={false}
              >
                {t_navbar('my_comments')}
              </Link>
            </>
          ) : null}
          <Link href="/guide" className={LinkClassname} prefetch={false}>
            {t_navbar('guide')}
          </Link>
          <Link href="/#feedback_section" className={LinkClassname}>
            {t_navbar('feedback')}
          </Link>
          {user ? null : (
            <Popover>
              <PopoverTrigger className={LinkClassname}>
                {t_login('action')}
              </PopoverTrigger>
              <PopoverContent align="end" className="w-[34rem]">
                <LoginForm />
              </PopoverContent>
            </Popover>
          )}
          <LocaleSwitcher />
          {user ? (
            <button className={LinkClassname} onClick={onLogoutClick}>
              {t_logout('action')}
            </button>
          ) : null}
        </nav>
      </div>
    </header>
  )
}
