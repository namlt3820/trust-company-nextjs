import Footer from '@/components/footer'
import { NavBar } from '@/components/navbar'
import { Toaster } from '@/components/ui/toaster'
import { constructMetadata } from '@/lib/metadata'
import { cn } from '@/lib/utils'
import { Providers } from '@/providers'
import { Arimo, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'

const arimo = Arimo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-arimo',
})
const ibm_plex_sans = IBM_Plex_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm_plex_sans',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
})

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(arimo.variable, ibm_plex_sans.variable)}>
        <Providers>
          <div className="flex min-h-[100dvh] flex-col">
            <NavBar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>

        <Toaster />
      </body>
    </html>
  )
}
