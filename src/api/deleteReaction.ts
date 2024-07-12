import { getPayloadUrl } from '@/lib/getPayloadUrl'

export type DeleteReaction = (id: string) => Promise<unknown>

export const deleteReaction: DeleteReaction = async (id: string) => {
  try {
    const res = await fetch(`${getPayloadUrl()}/api/reactions/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) {
      const { doc, errors } = await res.json()
      if (errors) throw new Error(errors[0].message)
      return doc
    }

    throw new Error('An error occurred while deleting reaction.')
  } catch (e) {
    throw new Error('An error occurred while deleting reaction.')
  }
}
