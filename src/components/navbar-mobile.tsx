'use client'

import { GetCompaniesCommand } from '@/app/[locale]/home/get-companies-command'
import { LocaleSwitcher } from '@/app/[locale]/home/locale-switcher'
import { LoginForm } from '@/app/[locale]/home/login-form'
import { Icons } from '@/components/icons'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useToast } from '@/components/ui/use-toast'
import { Company } from '@/lib/payloadTypes'
import { cn } from '@/lib/utils'
import { Link, usePathname, useRouter } from '@/navigation'
import { useAuth } from '@/providers/Auth'
import { MenuIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { useCallback, useState } from 'react'
import { RemoveScroll } from 'react-remove-scroll'

const LinkClassname =
  'text-sm font-medium underline-offset-4 hover:underline focus:outline-none'

export function GetCompaniesCombobox() {
  const t = useTranslations('Company')

  const [selected, setSelected] = React.useState<Company | undefined>()
  const router = useRouter()

  const handleSetActive = React.useCallback(
    (company: Company) => {
      setSelected(company)
      router.push(`/reviews?company=${company.id}&page=1&limit=10`)
    },
    [router]
  )

  return (
    <GetCompaniesCommand
      selectedResult={selected}
      onSelectResult={handleSetActive}
    />
  )
}

export const NavbarMobile: React.FC = () => {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const t_logout = useTranslations('Logout')
  const t_navbar = useTranslations('Navbar')
  const t_login = useTranslations('Login')
  const pathName = usePathname()
  const [loginFormOpen, setLoginFormOpen] = useState(false)
  const [navbarOpen, setNavbarOpen] = useState(false)

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

  const setNavbarClose = useCallback(() => setNavbarOpen(false), [])

  return (
    <header
      className={cn(
        RemoveScroll.classNames.zeroRight,
        'md:translate-y-0/2 fixed inset-x-0 top-0 z-50 translate-y-0 bg-white shadow-lg dark:bg-gray-950'
      )}
    >
      <div
        className={cn(
          'container flex items-center justify-between px-10 md:px-20',
          { 'h-14': pathName === '/' },
          { 'mt-4': pathName !== '/' }
        )}
      >
        <Link
          href="/"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <Icons.logo className="h-8 w-8 pr-2" />
          <span className="text-sm font-medium">TrustCompany</span>
        </Link>

        <Sheet open={navbarOpen} onOpenChange={setNavbarOpen}>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <SheetTrigger asChild>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col items-start gap-6">
              {user ? (
                <>
                  <Link
                    href={`/reviews?user=${user.id}&page=1&limit=10`}
                    className={LinkClassname}
                    prefetch={false}
                  >
                    <span onClick={setNavbarClose}>
                      {t_navbar('my_reviews')}
                    </span>
                  </Link>
                  <Link
                    href={`/comments?user=${user.id}&page=1&limit=10`}
                    className={LinkClassname}
                    prefetch={false}
                  >
                    <span onClick={setNavbarClose}>
                      {t_navbar('my_comments')}
                    </span>
                  </Link>
                </>
              ) : null}
              <Link href="/guide" className={LinkClassname} prefetch={false}>
                <span onClick={setNavbarClose}>{t_navbar('guide')}</span>
              </Link>
              <Link href="/#feedback_section" className={LinkClassname}>
                <span onClick={setNavbarClose}>{t_navbar('feedback')}</span>
              </Link>
              {user ? null : (
                <Popover
                  open={loginFormOpen}
                  onOpenChange={setLoginFormOpen}
                  modal={true}
                >
                  <PopoverTrigger className={LinkClassname}>
                    {t_login('action')}
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-screen">
                    <LoginForm setLoginFormOpen={setLoginFormOpen} />
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
          </SheetContent>
        </Sheet>
      </div>
      {pathName !== '/' ? (
        <div className="px-10">
          <GetCompaniesCombobox />
        </div>
      ) : null}
    </header>
  )
}
