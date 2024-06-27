import { Review } from '@/lib/payloadTypes'
import _ from 'lodash'
import { Descendant } from 'slate'

export type CreateReview = (params: CreateReviewParams) => Promise<Review>

export type CompanyRate = 'excellent' | 'good' | 'normal' | 'bad' | 'terrible'

export type CreateReviewParams = {
  branch?: string
  duration?: number
  title?: string
  facilities?: string
  team?: string
  process?: string
  benefits?: string
  rate: CompanyRate
  detailedReview: Descendant[]
  user: string
  company: string
}

export const createReview: CreateReview = async (
  params: CreateReviewParams
) => {
  try {
    const {
      benefits,
      branch,
      duration,
      title,
      facilities,
      team,
      process: companyProcess,
      rate,
      detailedReview,
      company,
      user,
    } = params

    const relevantInformation = _.omitBy(
      { branch, duration, title },
      (value) => !value
    )

    const basicReview = _.omitBy(
      { facilities, team, process: companyProcess, benefits },
      (value) => !value
    )

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_SERVER_URL}/api/reviews`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          relevantInformation,
          basicReview,
          detailedReview,
          user,
          company,
        }),
      }
    )

    if (res.ok) {
      const { doc, errors } = await res.json()
      if (errors) throw new Error(errors[0].message)
      return doc
    }

    throw new Error('An error occurred while creating review.')
  } catch (e) {
    throw new Error('An error occurred while creating review.')
  }
}
