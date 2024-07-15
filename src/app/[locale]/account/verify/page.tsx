'use client'

import { verifyEmail, VerifyEmailParams } from '@/api/verifyEmail'
import { SectionHeader } from '@/components/section-header'
import { SectionWrapper } from '@/components/section-wrapper'
import { useRouter } from '@/navigation'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function EmailVerification() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') || ''

  const t = useTranslations('CreateAccount')
  const router = useRouter()

  const verifyEmailMutation = useMutation({
    mutationFn: (params: VerifyEmailParams) => verifyEmail(params),
    onSuccess: () => {
      setTimeout(() => {
        router.push('/')
      }, 1500)
    },
  })

  const hasFired = useRef(false)
  useEffect(() => {
    if (!hasFired.current) {
      hasFired.current = true
      setTimeout(() => verifyEmailMutation.mutate({ token }), 0)
    }
  }, [token, verifyEmailMutation])

  const renderStatus = () => {
    switch (verifyEmailMutation.status) {
      case 'pending':
      default:
        return t('verifying')
      case 'error':
        return t('verify_fail')
      case 'success':
        return t('verify_success')
    }
  }

  return (
    <SectionWrapper backgroundColor="bg-white">
      <SectionHeader title={t('verify_title')} />
      <div className="mx-auto w-full max-w-lg space-y-2">
        <p className="text-center">{renderStatus()}</p>
      </div>
    </SectionWrapper>
  )
}
