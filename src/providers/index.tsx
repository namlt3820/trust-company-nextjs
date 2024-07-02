'use client'

import { AuthProvider } from '@/providers/Auth'
import { NextIntlProvider } from '@/providers/NextIntlClient'
import { ReactQueryProvider } from '@/providers/QueryClient'
import data from '@emoji-mart/data'
import { init } from 'emoji-mart'
import { AbstractIntlMessages } from 'next-intl'
import React from 'react'

// setup emoji
init({ data })

export type ProvidersProps = {
  children: React.ReactNode
  messages: AbstractIntlMessages
  locale: string
}

export const Providers: React.FC<ProvidersProps> = ({
  children,
  messages,
  locale,
}) => {
  return (
    <NextIntlProvider messages={messages} locale={locale}>
      <ReactQueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </ReactQueryProvider>
    </NextIntlProvider>
  )
}
