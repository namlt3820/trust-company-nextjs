'use client'

import { GuideItem } from '@/app/[locale]/guide/guide'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function Guide() {
  const t = useTranslations('Guide')
  const user = t('user')
  const company = t('company')
  const review = t('review')
  const comment = t('comment')
  const reaction = t('reaction')
  const report = t('report')
  const feedback = t('feedback')

  const [selected, setSelected] = useState(company)

  return (
    <div className="container mb-24 mt-28 flex flex-1 overflow-hidden px-10 md:px-20">
      <div className="flex h-full flex-col gap-6 border-r-2 border-gray-200">
        <Button
          variant={'link'}
          onClick={() => setSelected(user)}
          className={cn({ underline: selected === user })}
        >
          {user}
        </Button>
        <Button
          variant={'link'}
          onClick={() => setSelected(company)}
          className={cn({ underline: selected === company })}
        >
          {company}
        </Button>
        <Button
          variant={'link'}
          onClick={() => setSelected(review)}
          className={cn({ underline: selected === review })}
        >
          {review}
        </Button>
        <Button
          variant={'link'}
          onClick={() => setSelected(comment)}
          className={cn({ underline: selected === comment })}
        >
          {comment}
        </Button>
        <Button
          variant={'link'}
          onClick={() => setSelected(reaction)}
          className={cn({ underline: selected === reaction })}
        >
          {reaction}
        </Button>
        <Button
          variant={'link'}
          onClick={() => setSelected(report)}
          className={cn({ underline: selected === report })}
        >
          {report}
        </Button>
        <Button
          variant={'link'}
          onClick={() => setSelected(feedback)}
          className={cn({ underline: selected === feedback })}
        >
          {feedback}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto pl-8">
        <div className="flex flex-col items-center justify-center space-y-2 text-center md:mb-10">
          <h2 className="text-3xl font-bold leading-10 tracking-tighter sm:text-4xl/snug">
            {t('guide')}
          </h2>
          <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {t('description')}
          </p>
        </div>
        <GuideItem selected={selected} />
      </div>
    </div>
  )
}
