import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'

export type NextIntlProviderProps = {
  messages: AbstractIntlMessages
  children: React.ReactNode
  locale: string
}

export const NextIntlProvider: React.FC<NextIntlProviderProps> = ({
  messages,
  children,
  locale,
}) => {
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  )
}
