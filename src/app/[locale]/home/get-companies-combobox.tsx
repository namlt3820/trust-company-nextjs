'use client'

import { GetCompaniesCommand } from '@/app/[locale]/home/get-companies-command'
import { CompanyForm } from '@/components/company-form'
import { SectionHeader } from '@/components/section-header'
import { SectionWrapper } from '@/components/section-wrapper'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { Company } from '@/lib/payloadTypes'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import * as React from 'react'

export const GetCompaniesSubtitle: React.FC = () => {
  const t = useTranslations('Home')

  return (
    <>
      {t('start_with_company')} {t('if_dont_find_company')},
      <br />
      {t('you_can_create_one')}{' '}
      <Dialog>
        <DialogTrigger asChild>
          <span className="cursor-pointer underline decoration-1 underline-offset-4">
            {t('here')}
          </span>
        </DialogTrigger>
        <DialogContent className="max-h-screen max-w-screen-xl overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>{t('create_company')}</DialogTitle>
            <DialogDescription>{t('follow_guide')}</DialogDescription>
          </DialogHeader>
          <CompanyForm />
        </DialogContent>
      </Dialog>{' '}
      .
    </>
  )
}

export function GetCompaniesCombobox() {
  const t = useTranslations('Home')

  const [selected, setSelected] = React.useState<Company | undefined>()
  const router = useRouter()

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
        <SectionHeader
          title={`${t('find_your_company')}`}
          subtitle={<GetCompaniesSubtitle />}
        />
        <div className="mx-auto w-full max-w-md">
          <GetCompaniesCommand
            selectedResult={selected}
            onSelectResult={handleSetActive}
          />
        </div>
      </SectionWrapper>
    </div>
  )
}
