import { Review } from '@/lib/payloadTypes'

export type DeleteReview = (params: DeleteReviewParams) => Promise<Review>

export type DeleteReviewParams = {
  id: string
}

export const deleteReview: DeleteReview = async (
  params: DeleteReviewParams
) => {
  const { id } = params
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_SERVER_URL}/api/reviews/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (res.ok) {
      const { doc, errors } = await res.json()
      if (errors) throw new Error(errors[0].message)
      return doc
    }

    throw new Error('An error occurred while deleting review.')
  } catch (e) {
    throw new Error('An error occurred while deleting review.')
  }
}
