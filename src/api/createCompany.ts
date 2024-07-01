import { Company } from '@/lib/payloadTypes'

export type CreateCompany = (params: CreateCompanyParams) => Promise<Company>

export type CreateCompanyParams = {
  name: string
  address: string
  media: string
  numberOfEmployees:
    | 'below_100'
    | 'between_100_and_500'
    | 'between_500_and_1000'
    | 'above_1000'
  companyType: 'outsource' | 'product' | 'both'
  website?: string
}

export const createCompany: CreateCompany = async (
  params: CreateCompanyParams
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_SERVER_URL}/api/companies`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      }
    )

    if (res.ok) {
      const { doc, errors } = await res.json()
      if (errors) throw new Error(errors[0].message)
      return doc
    }

    throw new Error('An error occurred while creating company.')
  } catch (e) {
    throw new Error('An error occurred while creating company.')
  }
}
