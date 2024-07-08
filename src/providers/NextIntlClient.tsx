import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'

export type NextIntlProviderProps = {
  messages: AbstractIntlMessages
  children: React.ReactNode
  locale: string
}

const timeZone = 'Asia/Bangkok';

export const NextIntlProvider: React.FC<NextIntlProviderProps> = ({
  messages,
  children,
  locale,
}) => {
  return (
    <NextIntlClientProvider messages={messages} locale={locale} timeZone={timeZone}>
      {children}
    </NextIntlClientProvider>
  )
}
