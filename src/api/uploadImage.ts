import { Media } from '@/lib/payloadTypes'

export type UploadImage = (params: UploadImageParams) => Promise<Media>

export type UploadImageParams = {
  file: Blob
}

export const uploadImage: UploadImage = async (params: UploadImageParams) => {
  try {
    const data = new FormData()
    data.append('file', params.file)

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_CMS_SERVER_URL}/api/media`,
      {
        method: 'POST',
        credentials: 'include',
        body: data,
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
