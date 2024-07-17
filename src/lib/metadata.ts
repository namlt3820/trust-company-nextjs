import { Metadata } from 'next'

export function constructMetadata({
  title = 'TrustCompany - Your source of honest company reviews',
  description = 'TrustCompany is your reliable source for honest reviews and insights about companies. Discover real experiences and detailed feedback to make informed decisions.',
  image = '/homepage_1.jpg',
  icons = '/icon.ico',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    metadataBase: new URL('https://trustcompany.gladiolus.info'),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    icons,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: 'TrustCompany',
  title: 'TrustCompany',
  description: 'Your source of honest company reviews.',
  images: [
    {
      url: 'https://trustcompany.gladiolus.info/homepage_1.jpg',
    },
  ],
}

export const mergeOpenGraph = (
  og?: Metadata['openGraph']
): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
