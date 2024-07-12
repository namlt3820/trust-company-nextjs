import { getPayloadUrl } from '@/lib/getPayloadUrl'
import { Feedback } from '@/lib/payloadTypes'

export type CreateFeedback = (params: CreateFeedbackParams) => Promise<Feedback>

export type CreateFeedbackParams = {
  content: string
  name?: string | undefined
  email?: string | undefined
}

export const createFeedback: CreateFeedback = async (
  params: CreateFeedbackParams
) => {
  try {
    const res = await fetch(`${getPayloadUrl()}/api/feedbacks`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (res.ok) {
      const { doc, errors } = await res.json()
      if (errors) throw new Error(errors[0].message)
      return doc
    }

    throw new Error('An error occurred while creating feedback.')
  } catch (e) {
    throw new Error('An error occurred while creating feedback.')
  }
}
