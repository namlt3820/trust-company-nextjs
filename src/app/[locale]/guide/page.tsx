'use client'

import { renderGuide } from '@/app/[locale]/guide/guide'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function Guide() {
  const [selected, setSelected] = useState('Company')

  return (
    <div className="container mb-24 mt-28 flex flex-1 overflow-hidden px-16 md:px-20">
      <div className="flex h-full flex-col gap-6 border-r-2 border-gray-200">
        <Button
          variant={'link'}
          onClick={() => setSelected('User')}
          className={cn({ underline: selected === 'User' })}
        >
          User
        </Button>
        <Button
          variant={'link'}
          onClick={() => setSelected('Company')}
          className={cn({ underline: selected === 'Company' })}
        >
          Company
        </Button>
        <Button
          variant={'link'}
          onClick={() => setSelected('Review')}
          className={cn({ underline: selected === 'Review' })}
        >
          Review
        </Button>
        <Button
          variant={'link'}
          onClick={() => setSelected('Comment')}
          className={cn({ underline: selected === 'Comment' })}
        >
          Comment
        </Button>
        <Button
          variant={'link'}
          onClick={() => setSelected('Reaction')}
          className={cn({ underline: selected === 'Reaction' })}
        >
          Reaction
        </Button>
        <Button
          variant={'link'}
          onClick={() => setSelected('Report')}
          className={cn({ underline: selected === 'Report' })}
        >
          Report
        </Button>
        <Button
          variant={'link'}
          onClick={() => setSelected('Feedback')}
          className={cn({ underline: selected === 'Feedback' })}
        >
          Feedback
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto pl-8">
        <div className="flex flex-col items-center justify-center space-y-2 text-center md:mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Guide
          </h2>
          <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            This is a complete guide to the features you can use on the website.
            If there is any incorrect or missing information, please send us
            your feedback.
          </p>
        </div>
        {renderGuide(selected)}
      </div>
    </div>
  )
}
