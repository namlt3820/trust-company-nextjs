'use client'

import { getCompanies } from '@/api/getCompanies'
import { CommandItem, CommandList } from '@/components/ui/command'
import type { Company, Media } from '@/lib/payloadTypes'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { Check } from 'lucide-react'
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
      {isLoading && <div className="p-4 text-sm">Searching...</div>}
      {!isError && !isLoading && !data?.length && (
        <div className="p-4 text-sm">No companies found</div>
      )}
      {isError && <div className="p-4 text-sm">Something went wrong</div>}

      {data?.map((company) => {
        const { id, name, media } = company
        const url = `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_SERVER_URL}${(media as Media)?.url || ''}`

        return (
          <CommandItem
            key={id}
            onSelect={() => onSelectResult(company)}
            value={name}
          >
            <Image src={url} width={100} height={100} alt="Company logo" />
            <Check
              className={cn(
                'mr-2 h-4 w-4',
                selectedResult?.id === id ? 'opacity-100' : 'opacity-0'
              )}
            />
            {name}
          </CommandItem>
        )
      })}
    </CommandList>
  )
}
