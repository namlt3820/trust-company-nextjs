import { getPayloadUrl } from '@/lib/getPayloadUrl'
import { Company } from '@/lib/payloadTypes'
import qs from 'qs'

export type GetCompanies = (params: GetCompaniesParams) => Promise<Company[]>

export type GetCompaniesParams = {
  page?: number
  limit?: number
  name?: string
}

export const getCompanies: GetCompanies = async (
  params: GetCompaniesParams
) => {
  const { name, page = 1, limit = 10 } = params

  const query = {
    name: {
      contains: name,
    },
    page,
    limit,
  }

  const stringifiedQuery = qs.stringify(
    {
      where: query,
    },
    { addQueryPrefix: true }
  )

  try {
    const res = await fetch(
      `${getPayloadUrl()}/api/companies${stringifiedQuery}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (res.ok) {
      const { docs, errors } = await res.json()
      if (errors) throw new Error(errors[0].message)
      return docs
    }

    throw new Error('An error occurred while fetching your companies.')
  } catch (e) {
    throw new Error('An error occurred while fetching your companies.')
  }
}
