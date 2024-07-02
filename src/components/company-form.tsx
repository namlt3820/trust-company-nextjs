import { CreateCompanyParams, createCompany } from '@/api/createCompany'
import { UploadImageParams, uploadImage } from '@/api/uploadImage'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React, { ChangeEvent, MouseEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().max(150).min(1),
  address: z.string().max(200).min(1),
  numberOfEmployees: z.enum([
    'below_100',
    'between_100_and_500',
    'between_500_and_1000',
    'above_1000',
  ]),
  companyType: z.enum(['outsource', 'product', 'both']),
  website: z.string().max(100).optional(),
})

export type CompanyProps = {}

export const CompanyForm: React.FC<CompanyProps> = () => {
  const t = useTranslations('Home')

  const UploadStatusMessage = {
    idle: '',
    pending: t('uploading_image'),
    success: t('upload_success'),
    error: t('upload_error'),
  }

  /**
   * Hooks
   */
  const { toast } = useToast()

  const [file, setFile] = useState<File | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      website: '',
    },
  })

  const createCompanyMutation = useMutation({
    mutationFn: (params: CreateCompanyParams) => createCompany(params),
    onSuccess: async () => {
      toast({
        onOpenChange: (open) => {
          if (!open) {
            location.reload()
          }
        },
        title: t('create_company_success'),
        description: t('create_company_verify'),
      })
    },
    onError: () => {
      toast({
        title: t('create_company_fail'),
        description: t('action_fail_suggest'),
      })
    },
  })

  const uploadImageMutation = useMutation({
    mutationFn: (params: UploadImageParams) => uploadImage(params),
  })

  /**
   * Event handlers
   */
  const handleCreateCompany = async (data: z.infer<typeof formSchema>) => {
    if (!uploadImageMutation.data?.id) {
      toast({
        title: t('upload_company_logo'),
      })
      return
    }

    await createCompanyMutation.mutate({
      ...data,
      media: uploadImageMutation.data.id,
    })
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
    }
  }

  const handleUploadImage = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (!file) {
      toast({
        title: t('upload_company_logo'),
      })
      return
    }

    await uploadImageMutation.mutate({ file })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateCompany)}
        className="flex flex-col gap-5 py-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-7 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name (*)
                  </Label>
                  <Input
                    id="name"
                    placeholder="Required. Max 150 characters. The company name."
                    className="col-span-6"
                    {...field}
                  />
                  <FormMessage className="col-span-6 col-start-2" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-7 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Address (*)
                  </Label>
                  <Input
                    id="address"
                    placeholder="Required. Max 200 characters. The company address."
                    className="col-span-6"
                    {...field}
                  />
                  <FormMessage className="col-span-6 col-start-2" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-7 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Logo (*)
          </Label>
          <Input
            id="address"
            placeholder="Required. The company logo. "
            className="col-span-3"
            type="file"
            onChange={handleFileChange}
          />
          <div className="col-span-3 flex items-center justify-start gap-4">
            <Button onClick={handleUploadImage}>Upload </Button>
            <span>{UploadStatusMessage[uploadImageMutation.status]}</span>
          </div>
        </div>

        <FormField
          control={form.control}
          name="companyType"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-7 items-center gap-4">
                <Label htmlFor="companyType" className="text-right">
                  Company type (*)
                </Label>
                <div className="col-span-6">
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Required. Select company type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="outsource">Outsource</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage className="col-span-6 col-start-2" />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numberOfEmployees"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-7 items-center gap-4">
                <Label htmlFor="numberOfEmployees" className="text-right">
                  Number of employees (*)
                </Label>
                <div className="col-span-6">
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Required. Select number of employees" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="below_100">Below 100</SelectItem>
                      <SelectItem value="between_100_and_500">
                        Between 100 and 500
                      </SelectItem>
                      <SelectItem value="between_500_and_1000">
                        Between 500 and 1000
                      </SelectItem>
                      <SelectItem value="above_1000">Above 1000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage className="col-span-6 col-start-2" />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-7 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Website
                  </Label>
                  <Input
                    id="name"
                    placeholder="Optional. Max 150 characters. The company website."
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
          <Button type="submit">Create company</Button>
        </div>
      </form>
    </Form>
  )
}
