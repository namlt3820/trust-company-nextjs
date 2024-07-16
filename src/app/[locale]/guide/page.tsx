'use client'

import { GuideItem } from '@/app/[locale]/guide/guide'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

const getButtonStyle = (selected: string, current: string) =>
  cn(
    { 'text-primary underline': selected === current },
    { 'text-muted-foreground': selected !== current },
    'justify-start'
  )

export default function Guide() {
  const t = useTranslations('Guide')
  const user = t('user')
  const company = t('company')
  const review = t('review')
  const comment = t('comment')
  const reaction = t('reaction')
  const report = t('report')
  const feedback = t('feedback')
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const [selected, setSelected] = useState(company)

  return (
    <div className="container flex min-h-[100dvh] flex-1 flex-col overflow-hidden px-10 md:flex-row md:px-20">
      {isDesktop ? (
        <div className="flex flex-col gap-6 border-x-[1px] border-gray-200 pb-24 pr-10 pt-28">
          <Button
            variant={'link'}
            onClick={() => setSelected(user)}
            className={getButtonStyle(selected, user)}
          >
            {user}
          </Button>
          <Button
            variant={'link'}
            onClick={() => setSelected(company)}
            className={getButtonStyle(selected, company)}
          >
            {company}
          </Button>
          <Button
            variant={'link'}
            onClick={() => setSelected(review)}
            className={getButtonStyle(selected, review)}
          >
            {review}
          </Button>
          <Button
            variant={'link'}
            onClick={() => setSelected(comment)}
            className={getButtonStyle(selected, comment)}
          >
            {comment}
          </Button>
          <Button
            variant={'link'}
            onClick={() => setSelected(reaction)}
            className={getButtonStyle(selected, reaction)}
          >
            {reaction}
          </Button>
          <Button
            variant={'link'}
            onClick={() => setSelected(report)}
            className={getButtonStyle(selected, report)}
          >
            {report}
          </Button>
          <Button
            variant={'link'}
            onClick={() => setSelected(feedback)}
            className={getButtonStyle(selected, feedback)}
          >
            {feedback}
          </Button>
        </div>
      ) : null}

      <div className="flex-1 space-y-6 overflow-y-auto pb-24 pt-28 md:space-y-0 md:pl-8">
        <div className="flex flex-col items-center justify-center space-y-2 text-center md:mb-10">
          <h2 className="text-3xl font-bold leading-10 tracking-tighter sm:text-4xl/snug">
            {t('guide')}
          </h2>
          <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl">
            {t('description')}
          </p>
        </div>
        {isDesktop ? null : (
          <Select
            onValueChange={(value) => setSelected(value)}
            value={selected}
          >
            <SelectTrigger className="mx-auto w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={user}>{user}</SelectItem>
                <SelectItem value={company}>{company}</SelectItem>
                <SelectItem value={review}>{review}</SelectItem>
                <SelectItem value={comment}>{comment}</SelectItem>
                <SelectItem value={reaction}>{reaction}</SelectItem>
                <SelectItem value={report}>{report}</SelectItem>
                <SelectItem value={feedback}>{feedback}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        <GuideItem selected={selected} />
      </div>
    </div>
  )
}
