'use client'

import { SectionWrapper } from '@/components/section-wrapper'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

export const Hero: React.FC = () => {
  const t = useTranslations('Hero')
  const t_navbar = useTranslations('Navbar')

  return (
    <SectionWrapper backgroundColor="bg-white">
      <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_700px]">
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-10">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {t('title')}
            </h1>
            <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
              {t('description')}
            </p>
            <Link
              href="/guide"
              className={buttonVariants({ variant: 'default' })}
            >
              {t_navbar('guide')}
            </Link>
          </div>
        </div>
        <Image
          src={`${process.env.NEXT_PUBLIC_PAYLOAD_CMS_SERVER_URL}/media/homepage_1.jpg`}
          alt="Hero"
          width={700}
          height={700}
          className="rounded-xl"
        />
      </div>
    </SectionWrapper>
  )
}
