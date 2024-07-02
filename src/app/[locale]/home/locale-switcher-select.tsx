'use client'

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePathname, useRouter } from '@/navigation'
import clsx from 'clsx'
import { ReactNode, useTransition } from 'react'

type Props = {
  children: ReactNode
  defaultValue: string
  label: string
}

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
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
      <p className="sr-only">{label}</p>
      <Select
        defaultValue={defaultValue}
        disabled={isPending}
        onValueChange={onSelectChange}
      >
        <SelectTrigger className="border-none px-0 text-sm font-medium underline-offset-4 hover:underline focus:outline-none">
          <SelectValue></SelectValue>
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </label>
  )
}
