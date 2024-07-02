'use client'

import { GetCompaniesCommand } from '@/app/home/get-companies-command'
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
import { useRouter } from 'next/navigation'
import * as React from 'react'

export const GetCompaniesSubtitle: React.FC = () => {
  return (
    <>
      Start with the company you want to review. If you don&apos;t find its
      name,
      <br />
      you can create one{' '}
      <Dialog>
        <DialogTrigger asChild>
          <span className="cursor-pointer underline decoration-1 underline-offset-4">
            here
          </span>
        </DialogTrigger>
        <DialogContent className="max-h-screen max-w-screen-xl overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Create company</DialogTitle>
            <DialogDescription>
              Please follow our guide and try to be as descriptive and helpful
              as you&apos;d like.
            </DialogDescription>
          </DialogHeader>
          <CompanyForm />
        </DialogContent>
      </Dialog>{' '}
      .
    </>
  )
}

export function GetCompaniesCombobox() {
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
    <SectionWrapper>
      <SectionHeader
        title="Find Your Company"
        subtitle={<GetCompaniesSubtitle />}
      />
      <div className="mx-auto w-full max-w-md">
        <GetCompaniesCommand
          selectedResult={selected}
          onSelectResult={handleSetActive}
        />
      </div>
    </SectionWrapper>
  )
}
