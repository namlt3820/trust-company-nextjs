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
import { useRouter } from '@/navigation'
import { useTranslations } from 'next-intl'
import * as React from 'react'

export const GetCompaniesSubtitle: React.FC = () => {
  const t = useTranslations('Company')
  const t_general = useTranslations('General')

  return (
    <>
      {t('start_with')} <br />
      {t('if_not_find')},{t('create_one')}{' '}
      <Dialog>
        <DialogTrigger asChild>
          <span className="cursor-pointer underline decoration-1 underline-offset-4">
            {t('here')}
          </span>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>{t('create')}</DialogTitle>
            <DialogDescription>{t_general('follow_guide')}</DialogDescription>
          </DialogHeader>
          <CompanyForm />
        </DialogContent>
      </Dialog>{' '}
      .
    </>
  )
}

export function GetCompaniesCombobox() {
  const t = useTranslations('Company')

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
          title={`${t('find_your')}`}
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
