'use client'

import { LoginForm } from '@/app/home/login-form'
import { Icons } from '@/components/icons'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/providers/Auth'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useRef } from 'react'

const LinkClassname = 'text-sm font-medium underline-offset-4 hover:underline'

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
    <header className="container flex h-14 items-center px-16 md:px-20">
      <Link
        href="/"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <Icons.logo className="h-8 w-8 pr-2" />
        <span className="text-sm font-medium">TrustCompany</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link href="/reviews" className={LinkClassname} prefetch={false}>
          Reviews
        </Link>
        <Link href="/companies" className={LinkClassname} prefetch={false}>
          Companies
        </Link>
        <Link href="/about" className={LinkClassname} prefetch={false}>
          About
        </Link>
        <Link href="/feedback" className={LinkClassname} prefetch={false}>
          Feedback
        </Link>
        {user ? null : (
          <Popover>
            <PopoverTrigger className={LinkClassname}>Login</PopoverTrigger>
            <PopoverContent align="end" className="w-[34rem]">
              <LoginForm />
            </PopoverContent>
          </Popover>
        )}
        {user ? (
          <button className={LinkClassname} onClick={onLogoutClick}>
            Logout
          </button>
        ) : null}
      </nav>
    </header>
  )
}
