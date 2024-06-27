import { ReviewForm } from '@/components/review-form'
import { Button, buttonVariants } from '@/components/ui/button'
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
import { PencilLine } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export const ReviewNavigation: React.FC = () => {
  const searchParams = useSearchParams()
  const company = searchParams.get('company')

  return (
    <div className="flex justify-between md:mb-10">
      <Dialog>
        <DialogTrigger asChild>
          {company ? (
            <Button className="flex gap-1">
              <PencilLine className="h-4 w-4" />
              Create review
            </Button>
          ) : (
            <div></div>
          )}
        </DialogTrigger>
        <DialogContent className="max-h-screen max-w-screen-xl overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Create review</DialogTitle>
            <DialogDescription>
              Please follow our guide and try to be as descriptive and helpful
              as you&apos;d like.
            </DialogDescription>
          </DialogHeader>
          <ReviewForm />
        </DialogContent>
      </Dialog>
      <div className="flex gap-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="most_positive">Most positive</SelectItem>
              <SelectItem value="most_negative">Most negative</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {company ? (
          <Link href={'/'} className={buttonVariants({ variant: 'outline' })}>
            Find another company
          </Link>
        ) : null}
      </div>
    </div>
  )
}
