'use client'

import { GetCompaniesResult } from '@/app/[locale]/home/get-companies-result'
import { Command, CommandInput } from '@/components/ui/command'
import type { Company } from '@/lib/payloadTypes'
import { useTranslations } from 'next-intl'
import * as React from 'react'

export type GetCompaniesCommandProps = {
  selectedResult?: Company
  onSelectResult: (company: Company) => void
}

export const GetCompaniesCommand: React.FC<GetCompaniesCommandProps> = ({
  selectedResult,
  onSelectResult,
}) => {
  const t = useTranslations('Company')
  const [searchQuery, setSearchQuery] = React.useState('')

  const handleSelectResult = (company: Company) => {
    onSelectResult(company)

    // OPTIONAL: reset the search query upon selection
    // setSearchQuery('');
  }

  return (
    <Command
      shouldFilter={false}
      className="h-auto w-full rounded-lg border border-b-0 shadow-md"
    >
      <CommandInput
        value={searchQuery}
        onValueChange={setSearchQuery}
        placeholder={t('enter_name')}
      />

      <GetCompaniesResult
        query={searchQuery}
        selectedResult={selectedResult}
        onSelectResult={handleSelectResult}
      />
    </Command>
  )
}
