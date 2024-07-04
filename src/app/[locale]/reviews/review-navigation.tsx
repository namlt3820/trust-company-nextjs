import { ReviewForm } from '@/components/review-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useReviews } from '@/hooks/useReviews'
import { usePathname, useRouter } from '@/navigation'
import { PencilLine } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export type ReviewNavigationProps = {
  reviewCount: number
}

export const ReviewNavigation: React.FC<ReviewNavigationProps> = ({
  reviewCount,
}) => {
  const t = useTranslations('Review')
  const t_general = useTranslations('General')
  const searchParams = useSearchParams()
  const company = searchParams.get('company')
  const router = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()
  const { refetch: refetchReviews } = useReviews()
  const sort = searchParams.get('sort') || undefined

  const onSelectChange = (sortType: string) => {
    let queryString = `?sort=${sortType}`

    for (const [key, value] of params.entries()) {
      if (key === 'sort') {
        continue
      }
      queryString += `&${key}=${value}`
    }

    router.push(`${pathname}/${queryString}`)
    refetchReviews()
  }

  return (
    <div className="flex justify-between md:mb-10">
      <Dialog>
        <DialogTrigger asChild>
          {company ? (
            <Button className="flex gap-1">
              <PencilLine className="h-4 w-4" />
              {t('create')}
            </Button>
          ) : (
            <div></div>
          )}
        </DialogTrigger>
        <DialogContent className="max-h-screen max-w-screen-xl overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>{t('create')}</DialogTitle>
            <DialogDescription>{t_general('follow_guide')}</DialogDescription>
          </DialogHeader>
          <ReviewForm />
        </DialogContent>
      </Dialog>
      <div className="flex gap-4">
        {reviewCount ? (
          <Select onValueChange={onSelectChange} defaultValue={sort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('sort')} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="newest">{t('newest')}</SelectItem>
                <SelectItem value="oldest">{t('oldest')}</SelectItem>
                <SelectItem value="most_positive">
                  {t('most_positive')}
                </SelectItem>
                <SelectItem value="most_negative">
                  {t('most_negative')}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        ) : null}
      </div>
    </div>
  )
}
