import { getPayloadUrl } from '@/lib/getPayloadUrl'
import { Comment as Review } from '@/lib/payloadTypes'
import _ from 'lodash'
import { Descendant } from 'slate'

export type UpdateReview = (params: UpdateReviewParams) => Promise<Review>

export type CompanyRate = 'excellent' | 'good' | 'normal' | 'bad' | 'terrible'

export type UpdateReviewParams = {
  branch?: string
  duration?: number
  title?: string
  facilities?: string
  team?: string
  process?: string
  benefits?: string
  rate: CompanyRate
  detailedReview: Descendant[]
  id: string
}

export const updateReview: UpdateReview = async (
  params: UpdateReviewParams
) => {
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
    id,
  } = params

  const relevantInformation = _.omitBy(
    { branch, duration, title },
    (value) => !value
  )

  const basicReview = _.omitBy(
    { facilities, team, process: companyProcess, benefits },
    (value) => !value
  )

  try {
    const res = await fetch(`${getPayloadUrl()}/api/reviews/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rate,
        relevantInformation,
        basicReview,
        detailedReview,
      }),
    })

    if (res.ok) {
      const { doc, errors } = await res.json()
      if (errors) throw new Error(errors[0].message)
      return doc
    }

    throw new Error('An error occurred while updating review.')
  } catch (e) {
    throw new Error('An error occurred while updating review.')
  }
}
