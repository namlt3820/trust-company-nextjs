import LocaleSwitcherSelect from '@/app/[locale]/home/locale-switcher-select'
import { SelectItem } from '@/components/ui/select'
import { locales } from '@/config'
import { useLocale, useTranslations } from 'next-intl'

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
      {locales.map((cur) => (
        <SelectItem key={cur} value={cur}>
          {t('locale', { locale: cur })}
        </SelectItem>
      ))}
    </LocaleSwitcherSelect>
  )
}
