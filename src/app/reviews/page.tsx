'use client'

import { BasicReview } from '@/app/reviews/basic-review'
import { RelevantInformation } from '@/app/reviews/relevant-information'
import { ReviewCommentCount } from '@/app/reviews/review-comment-count'
import { ReviewHeader } from '@/app/reviews/review-header'
import { ReviewNavigation } from '@/app/reviews/review-navigation'
import { ReviewPagination } from '@/app/reviews/review-pagination'
import { ReviewRichtext } from '@/app/reviews/review-richtext'
import { ResourceStatus } from '@/components/resource-status'
import { SectionHeader } from '@/components/section-header'
import { SectionWrapper } from '@/components/section-wrapper'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useCommentCountByReview } from '@/hooks/useCommentCountByReview'
import { useReactions } from '@/hooks/useReactions'
import { useReviews } from '@/hooks/useReviews'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Reviews: React.FC = () => {
  const { isError, isLoading, data: reviewsData } = useReviews()
  const { data: reactionsData } = useReactions({ reviews: reviewsData })
  const { data: commentsData } = useCommentCountByReview(reviewsData)

  const searchParams = useSearchParams()
  const company = searchParams.get('company')

  return (
    <SectionWrapper backgroundColor="bg-white">
      <SectionHeader
        title={company ? 'Company Reviews' : 'User Reviews'}
        subtitle={`You can find reviews of ${company ? 'company' : 'user'} here. Feel free to review, comment, and react as well.`}
      />
      <ReviewNavigation />
      <div className="mx-auto w-full">
        <ResourceStatus
          isLoading={isLoading}
          isNotFound={!isError && !isLoading && !reviewsData?.docs.length}
          isError={isError}
          notFoundMessage="No reviews found"
        />
        <div className="grid gap-4">
          {reviewsData?.docs.map((review) => {
            const { id: reviewId, rate, populatedUser, updatedAt } = review
            const { name } = populatedUser!
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
                    <ReviewCommentCount {...commentCountByReview} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <ReviewPagination response={reviewsData} />
      </div>
    </SectionWrapper>
  )
}

export default Reviews
