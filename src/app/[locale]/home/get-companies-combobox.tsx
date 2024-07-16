'use client'

import { GetCompaniesCommand } from '@/app/[locale]/home/get-companies-command'
import { CompanyForm } from '@/components/company-form'
import { SectionWrapper } from '@/components/section-wrapper'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { Company } from '@/lib/payloadTypes'
import { useRouter } from '@/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import * as React from 'react'

export const CreateCompany: React.FC = () => {
  const t = useTranslations('Company')
  const t_general = useTranslations('General')

  return (
    <div className="text-center text-gray-500 dark:text-gray-400 md:text-left md:text-xl">
      {t('start_with')} <br />
      {t('if_not_find')}, {t('create_one')}{' '}
      <Dialog>
        <DialogTrigger asChild>
          <span className="cursor-pointer underline decoration-1 underline-offset-4">
            {t('here')}
          </span>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{t('create')}</DialogTitle>
            <DialogDescription>{t_general('follow_guide')}</DialogDescription>
          </DialogHeader>
          <CompanyForm />
        </DialogContent>
      </Dialog>{' '}
      .
    </div>
  )
}

export const CarouselIntro: React.FC = () => {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <Image
            src={`/slide_2.png`}
            alt="carousel_intro"
            width={600}
            height={500}
            className="rounded-xl"
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src={`/slide_3.png`}
            alt="carousel_intro"
            width={600}
            height={500}
            className="rounded-xl"
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src={`/slide_4.png`}
            alt="carousel_intro"
            width={600}
            height={500}
            className="rounded-xl"
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export function GetCompaniesCombobox() {
  const t = useTranslations('Company')

  const [selected, setSelected] = React.useState<Company | undefined>()
  const router = useRouter()
  const isDesktop = useMediaQuery('(min-width: 1280px)')

  const handleSetActive = React.useCallback(
    (company: Company) => {
      setSelected(company)
      router.push(`/reviews?company=${company.id}&page=1&limit=10`)

      // OPTIONAL: close the combobox upon selection
      // setOpen(false);
    },
    [router]
  )

  return (
    <div className="mt-14">
      <SectionWrapper>
        <div className="grid gap-8 xl:grid-cols-[1fr_1fr] xl:gap-20">
          {isDesktop ? <CarouselIntro /> : null}
          <div className="flex flex-col">
            <div className="space-y-8">
              <h1 className="text-center text-3xl font-bold tracking-tighter sm:text-5xl md:text-left">
                {t('find_your')}
              </h1>
              <CreateCompany />
              <GetCompaniesCommand
                selectedResult={selected}
                onSelectResult={handleSetActive}
              />
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}
