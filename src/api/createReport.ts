import { getPayloadUrl } from '@/lib/getPayloadUrl'
import { Report } from '@/lib/payloadTypes'
import _ from 'lodash'

export type CreateReport = (params: CreateReportParams) => Promise<Report>

export type CreateReportParams = {
  user: string
  targetId: string
  targetType: 'comments' | 'reviews'
  type: Report['type']
  otherType: string | undefined
}

export const createReport: CreateReport = async (
  params: CreateReportParams
) => {
  try {
    const { user, targetId, targetType, type, otherType } = params
    const data = _.omitBy(
      {
        user,
        type,
        otherType,
        target: {
          value: targetId,
          relationTo: targetType,
        },
      },
      (value) => !value
    )

    const res = await fetch(`${getPayloadUrl()}/api/reports`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      const { doc, errors } = await res.json()
      if (errors) throw new Error(errors[0].message)
      return doc
    }

    throw new Error('An error occurred while creating report.')
  } catch (e) {
    throw new Error('An error occurred while creating report.')
  }
}
