// import { RichTextEditor } from '@/components/rich-text-editor'
import { RichTextEditor } from '@/components/rich-text-editor'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { PencilLine } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const ReviewNavigation: React.FC = () => {
  return (
    <div className="flex justify-between md:mb-10">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-1">
            <PencilLine className="h-4 w-4" />
            Create review
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen max-w-screen-xl overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Create review</DialogTitle>
            <DialogDescription>
              Please follow our guide and try to be as descriptive and helpful
              as you&apos;d like.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-7 items-center gap-4">
              <Label htmlFor="detailed_review" className="text-right">
                Detailed review (*)
              </Label>
              {/* <Input
                id="detailed_review"
                placeholder="Required. A large company can have many branches. Specify the geographical location or the name of the branch where you work. Max 200 characters. "
                className="col-span-6"
              /> */}
              <RichTextEditor className="col-span-6" />
            </div>
            <div className="grid grid-cols-7 items-center gap-4">
              <Label htmlFor="branch" className="text-right">
                Branch
              </Label>
              <Input
                id="branch"
                placeholder="Optional. A large company can have many branches. Specify the geographical location or the name of the branch where you work. Max 200 characters. "
                className="col-span-6"
              />
            </div>
            <div className="grid grid-cols-7 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration
              </Label>
              <Input
                id="duration"
                placeholder="Optional. Specify how long you have worked at that company. Must be at least one month."
                className="col-span-6"
                type="number"
              />
            </div>
            <div className="grid grid-cols-7 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Optional. List all the titles you have held while working at the company. Max 100 characters. "
                className="col-span-6"
              />
            </div>
            <div className="grid grid-cols-7 items-center gap-4">
              <Label htmlFor="facilities" className="text-right">
                Facilities
              </Label>
              <Textarea
                id="facilities"
                placeholder="Optional. Provide a brief description of the company's infrastructure or office working conditions, focusing on factors that support or hinder your work. Max 500 characters. "
                className="col-span-6"
              />
            </div>
            <div className="grid grid-cols-7 items-center gap-4">
              <Label htmlFor="team" className="text-right">
                Team
              </Label>
              <Textarea
                id="team"
                placeholder="Optional. Provide a brief description of your work team. Include the number, quality, and teamwork capabilities. Focus on general experiences—positive or negative—working with them, without going into specific individuals. Max 500 characters. "
                className="col-span-6"
              />
            </div>
            <div className="grid grid-cols-7 items-center gap-4">
              <Label htmlFor="process" className="text-right">
                Process
              </Label>
              <Textarea
                id="process"
                placeholder="Optional. Provide a brief description of the company's workflow and how it has either supported or hindered your job functions. Max 500 characters. "
                className="col-span-6"
              />
            </div>
            <div className="grid grid-cols-7 items-center gap-4">
              <Label htmlFor="benefits" className="text-right">
                Benefits
              </Label>
              <Textarea
                id="benefits"
                placeholder="Optional. Provide a brief description of the benefits you receive while working at the company. Have they met your expectations? Are there any benefits you feel are lacking? Max 500 characters. "
                className="col-span-6"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
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
        <Link href={'/'} className={buttonVariants({ variant: 'outline' })}>
          Find another company
        </Link>
      </div>
    </div>
  )
}
