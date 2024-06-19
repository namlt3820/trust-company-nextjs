import { SectionHeader } from '@/components/section-header'
import { SectionWrapper } from '@/components/section-wrapper'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React from 'react'

export const CreateReview: React.FC = () => {
  return (
    <SectionWrapper>
      <SectionHeader
        title="Share Your Review"
        subtitle="Help others make informed decisions by sharing your experiences
              with the products and services you've used."
      />
      <div className="mx-auto w-full max-w-md space-y-2">
        <form className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" placeholder="Enter your name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="rating">Rating</Label>
            <Select id="rating" defaultValue="4">
              <SelectTrigger>
                <SelectValue placeholder="Select a rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 stars</SelectItem>
                <SelectItem value />
              </SelectContent>
            </Select>
          </div>
        </form>
      </div>
    </SectionWrapper>
  )
}
