import { LocaleType } from '@/config'

export const formatDate = (date: Date, locale: LocaleType = 'en') => {
  const locales = {
    en: 'en-Us',
    vi: 'vi-VN',
  }

  const timeZones = {
    en: 'UTC',
    vi: 'Asia/Ho_Chi_Minh',
  }

  const formatter = new Intl.DateTimeFormat(locales[locale], {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: timeZones[locale],
  })

  return formatter.format(date)
}
