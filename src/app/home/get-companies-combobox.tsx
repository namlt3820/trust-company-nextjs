'use client'

import { GetCompaniesCommand } from '@/app/home/get-companies-command'
import { SectionHeader } from '@/components/section-header'
import { SectionWrapper } from '@/components/section-wrapper'
import type { Company } from '@/lib/payloadTypes'
import { useRouter } from 'next/navigation'
import * as React from 'react'

import Link from 'next/link'

export const GetCompaniesSubtitle: React.FC = () => {
  return (
    <>
      Start with the company you want to review. If you don&apos;t find its
      name,
      <br />
      you can create one{' '}
      <Link
        href={'/companies/draft'}
        className="underline decoration-1 underline-offset-4"
      >
        here
      </Link>{' '}
      or{' '}
      <Link
        href={'/companies'}
        className="underline decoration-1 underline-offset-4"
      >
        find with more options
      </Link>
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
