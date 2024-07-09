'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LocaleType, locales } from '@/config'
import { usePathname, useRouter } from '@/navigation'
import clsx from 'clsx'
import { useLocale, useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

export const LocaleSwitcher = () => {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useSearchParams()

  let queryString = '?'
  for (const [key, value] of params.entries()) {
    queryString += `&${key}=${value}`
  }

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      router.push(`${pathname}/${queryString}`, {
        locale: nextLocale as LocaleType | undefined,
      })
    })
  }

  return (
    <label
      className={clsx(
        'relative text-gray-800',
        isPending && 'transition-opacity [&:disabled]:opacity-30'
      )}
    >
      <p className="sr-only">{t('label')}</p>
      <Select
        defaultValue={locale}
        disabled={isPending}
        onValueChange={onSelectChange}
      >
        <SelectTrigger className="h-5 border-none px-0 py-0 text-sm font-medium underline-offset-4 hover:underline focus:outline-none">
          <SelectValue></SelectValue>
        </SelectTrigger>
        <SelectContent>
          {locales.map((cur) => (
            <SelectItem key={cur} value={cur}>
              {t('locale', { locale: cur })}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  )
}
