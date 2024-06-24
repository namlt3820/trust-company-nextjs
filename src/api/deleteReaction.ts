export type DeleteReaction = (id: string) => Promise<unknown>

export const deleteReaction: DeleteReaction = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_SERVER_URL}/api/reactions/${id}`,
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

    throw new Error('An error occurred while deleting reaction.')
  } catch (e) {
    throw new Error('An error occurred while deleting reaction.')
  }
}
