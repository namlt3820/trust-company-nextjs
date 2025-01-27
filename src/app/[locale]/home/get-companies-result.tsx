'use client'

import { getCompanies } from '@/api/getCompanies'
import { CommandItem, CommandList } from '@/components/ui/command'
import type { Company, Media } from '@/lib/payloadTypes'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import { useDebounce } from 'use-debounce'

export type GetCompaniesResultProps = {
  query: string
  selectedResult?: Company
  onSelectResult: (company: Company) => void
}

export const GetCompaniesResult: React.FC<GetCompaniesResultProps> = ({
  query,
  selectedResult,
  onSelectResult,
}) => {
  const t = useTranslations()
  const [debouncedSearchQuery] = useDebounce(query, 500)
  const enabled = !!debouncedSearchQuery

  const {
    data,
    isLoading: isLoadingOrig,
    isError,
  } = useQuery<Company[]>({
    queryKey: ['get-companies-combobox', debouncedSearchQuery],
    queryFn: () =>
      getCompanies({ name: debouncedSearchQuery, page: 1, limit: 10 }),
    enabled,
  })

  // To get around this https://github.com/TanStack/query/issues/3584
  const isLoading = enabled && isLoadingOrig

  if (!enabled) return null

  return (
    <CommandList>
      {isLoading && <div className="p-4 text-sm">{t('General.searching')}</div>}
      {!isError && !isLoading && !data?.length && (
        <div className="p-4 text-sm">{t('Company.not_found')}</div>
      )}
      {isError && (
        <div className="p-4 text-sm">{t('General.something_wrong')}</div>
      )}

      {data?.map((company) => {
        const { id, name, media } = company
        const url = `${process.env.NEXT_PUBLIC_PAYLOAD_URL_FROM_SERVER}${(media as Media)?.url || ''}`

        return (
          <CommandItem
            key={id}
            onSelect={() => onSelectResult(company)}
            value={name}
            className="flex gap-2"
          >
            <div className="relative flex h-[60px] items-center justify-center rounded-md bg-white p-5">
              <Image
                src={url}
                alt="company_logo"
                height={150}
                width={150}
                className="h-[50px] w-[150px] object-contain"
              />
            </div>
            {name}
          </CommandItem>
        )
      })}
    </CommandList>
  )
}
