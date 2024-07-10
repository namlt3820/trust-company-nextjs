'use client'

import { BasicReview } from '@/app/[locale]/reviews/basic-review'
import { RelevantInformation } from '@/app/[locale]/reviews/relevant-information'
import { ReviewCommentCount } from '@/app/[locale]/reviews/review-comment-count'
import { ReviewHeader } from '@/app/[locale]/reviews/review-header'
import { ReviewNavigation } from '@/app/[locale]/reviews/review-navigation'
import { ReviewPagination } from '@/app/[locale]/reviews/review-pagination'
import { ReviewRichtext } from '@/app/[locale]/reviews/review-richtext'
import { ResourceStatus } from '@/components/resource-status'
import { SectionHeader } from '@/components/section-header'
import { SectionWrapper } from '@/components/section-wrapper'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useCommentCountByReview } from '@/hooks/useCommentCountByReview'
import { useReactions } from '@/hooks/useReactions'
import { useReviews } from '@/hooks/useReviews'
import { User } from '@/lib/payloadTypes'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Reviews: React.FC = () => {
  const { isError, isLoading, data: reviewsData } = useReviews()
  const { data: reactionsData } = useReactions({ reviews: reviewsData })
  const { data: commentsData } = useCommentCountByReview(reviewsData)
  const searchParams = useSearchParams()
  const company = searchParams.get('company')
  const userSearchParam = searchParams.get('user')
  const t = useTranslations('Review')

  return (
    <div className="mt-24 md:mt-0">
      <SectionWrapper backgroundColor="bg-white">
        <SectionHeader
          title={company ? t('company_reviews') : t('user_reviews')}
          subtitle={company ? t('company_intro') : t('user_intro')}
        />
        <ReviewNavigation />
        <div className="mx-auto w-full">
          <ResourceStatus
            isLoading={isLoading}
            isNotFound={!isError && !isLoading && !reviewsData?.docs.length}
            isError={isError}
            notFoundMessage={t('not_found')}
          />
          <div className="grid gap-4">
            {reviewsData?.docs.map((review) => {
              const { id: reviewId, rate, user, updatedAt } = review
              const { name } = user as User
              const commentCountByReview = commentsData?.find(
                ({ review }) => review === reviewId
              ) || {
                review: reviewId,
                commentCount: 0,
              }

              return (
                <Card key={reviewId}>
                  <CardHeader>
                    <ReviewHeader
                      name={name}
                      rate={rate}
                      updatedAt={updatedAt}
                      reactions={reactionsData?.find(
                        ({ type, id }) => type === 'review' && id === reviewId
                      )}
                      review={review}
                    />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <RelevantInformation review={review} />
                      <BasicReview review={review} />
                      <ReviewRichtext review={review} />
                      <ReviewCommentCount
                        commentCount={commentCountByReview.commentCount}
                        review={commentCountByReview.review}
                        company={company}
                        user={userSearchParam}
                      />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <ReviewPagination response={reviewsData} />
        </div>
      </SectionWrapper>
    </div>
  )
}

export default Reviews
