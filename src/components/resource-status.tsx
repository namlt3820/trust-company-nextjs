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
  loadingMessage = 'Searching...',
  notFoundMessage = 'No content found',
  errorMessage = 'Something went wrong',
}) => {
  return (
    <div className="p-4 text-center">
      {isLoading ? loadingMessage : ''}
      {isNotFound ? notFoundMessage : ''}
      {isError ? errorMessage : ''}
    </div>
  )
}
