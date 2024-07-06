'use client'

import { SectionWrapper } from '@/components/section-wrapper'
import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

export const WhyChoose: React.FC = () => {
  const t = useTranslations('WhyChoose')

  return (
    <SectionWrapper>
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            {t('title')}
          </h2>
          <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {t('description')}
          </p>
          <ul className="grid gap-2 py-4">
            <li>
              <Check className="mr-2 inline-block h-4 w-4" />
              {t('benefit_1')}
            </li>
            <li>
              <Check className="mr-2 inline-block h-4 w-4" />
              {t('benefit_2')}
            </li>
            <li>
              <Check className="mr-2 inline-block h-4 w-4" />
              {t('benefit_3')}
            </li>
          </ul>
        </div>
        <Image
          src={`${process.env.NEXT_PUBLIC_PAYLOAD_CMS_SERVER_URL}/media/homepage_2.jpg`}
          alt="Hero"
          width={700}
          height={700}
          className="rounded-xl"
        />
      </div>
    </SectionWrapper>
  )
}
