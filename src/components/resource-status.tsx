import { useTranslations } from 'next-intl'

export type ResourceStatusProps = {
  isLoading: boolean
  loadingMessage?: string
  isNotFound: boolean
  notFoundMessage?: string
  isError: boolean
  errorMessage?: string
}

export const ResourceStatus: React.FC<ResourceStatusProps> = ({
  isError,
  isLoading,
  isNotFound,
  loadingMessage,
  notFoundMessage,
  errorMessage,
}) => {
  const t = useTranslations('General')
  return isError || isLoading || isNotFound ? (
    <div className="p-4 text-center">
      {isLoading ? loadingMessage ?? t('searching') : ''}
      {isNotFound ? notFoundMessage ?? t('not_found') : ''}
      {isError ? errorMessage && t('something_wrong') : ''}
    </div>
  ) : null
}
