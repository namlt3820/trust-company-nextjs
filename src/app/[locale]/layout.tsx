import Footer from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { Toaster } from '@/components/ui/toaster'
import { constructMetadata } from '@/lib/metadata'
import { Providers } from '@/providers'
import { Viewport } from 'next'
import { getMessages } from 'next-intl/server'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import './globals.css'
// import { Arimo, IBM_Plex_Sans, Roboto } from 'next/font/google'

export async function generateViewport(): Promise<Viewport> {
  const userAgent = headers().get('user-agent')
  const isiPhone = /iphone/i.test(userAgent ?? '')
  return isiPhone
    ? {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1, // disables auto-zoom on ios safari
      }
    : {}
}

/**
 * Used to have multiple fonts, but now using one font to make multiple languages look good
 */

// const arimo = Arimo({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-arimo',
// })
// const ibm_plex_sans = IBM_Plex_Sans({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-ibm_plex_sans',
//   weight: ['100', '200', '300', '400', '500', '600', '700'],
// })

const inter = Inter({ subsets: ['latin'] })

export const metadata = constructMetadata()

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Providers messages={messages} locale={locale}>
          <div className="flex min-h-[100dvh] flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>

        <Toaster />
      </body>
    </html>
  )
}
