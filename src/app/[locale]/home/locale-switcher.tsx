'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { locales } from '@/config'
import { usePathname, useRouter } from '@/navigation'
import clsx from 'clsx'
import { useLocale, useTranslations } from 'next-intl'
import { useTransition } from 'react'

export const LocaleSwitcher = () => {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.push(`${nextLocale}/${pathname}`)
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
        <SelectTrigger className="border-none px-0 text-sm font-medium underline-offset-4 hover:underline focus:outline-none">
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
