export const formatDate = (date: Date, locale: string = 'en-Us') => {
  const formatter = new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'UTC',
  })

  return formatter.format(date)
}
