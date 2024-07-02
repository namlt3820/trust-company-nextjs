import { CreateReportParams, createReport } from '@/api/createReport'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/providers/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  type: z.enum([
    'defamation',
    'law_violation',
    'misinformation',
    'scam',
    'spam',
    'violence',
  ]),
  otherType: z.string().optional(),
})

export type ReportFormProps = {
  targetId: string
  targetType: 'comments' | 'reviews'
  setIsReportDialogOpen: (isOpen: boolean) => void
}

export const ReportForm: React.FC<ReportFormProps> = ({
  targetId,
  targetType,
  setIsReportDialogOpen,
}) => {
  const { toast } = useToast()
  const { user } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'spam',
    },
  })

  const createReportMutation = useMutation({
    mutationFn: (params: CreateReportParams) => createReport(params),
    onSuccess: async () => {
      toast({
        title: 'Created report successfully',
      })
      await setIsReportDialogOpen(false)
    },
    onError: () => {
      toast({
        title: 'Updating comment failed',
        description:
          'There was an error with the data provided. Please try again.',
      })
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { type, otherType } = data

    if (!user) {
      toast({
        title: 'You need to log in before creating a reaction.',
      })
      return
    }

    await createReportMutation.mutate({
      targetId,
      targetType,
      user: user.id,
      type,
      otherType,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 py-4"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-7 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <div className="col-span-6">
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Optional. Select type of report" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="defamation">Defamation</SelectItem>
                      <SelectItem value="law_violation">
                        Law Violation
                      </SelectItem>
                      <SelectItem value="misinformation">
                        Misinformation
                      </SelectItem>
                      <SelectItem value="scam">Scam</SelectItem>
                      <SelectItem value="spam">Spam</SelectItem>
                      <SelectItem value="violation">Violation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="otherType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-7 items-center gap-4">
                  <Label htmlFor="otherType" className="text-right">
                    Other type
                  </Label>
                  <Input
                    id="otherType"
                    placeholder="Optional. Max 100 characters. You can clarify other types of reports here."
                    className="col-span-6"
                    {...field}
                  />
                  <FormMessage className="col-span-6 col-start-2" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button type="submit">Create report</Button>
        </div>
      </form>
    </Form>
  )
}
