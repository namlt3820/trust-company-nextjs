'use client'

import { ResourceStatus } from '@/components/resource-status'
import { SectionHeader } from '@/components/section-header'
import { SectionWrapper } from '@/components/section-wrapper'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useCommentCountByReview } from '@/hooks/useCommentCountByReview'
import { useReactions } from '@/hooks/useReactions'
import { useReviews } from '@/hooks/useReviews'
import React from 'react'
import { BasicReview } from './basic-review'
import { RelevantInformation } from './relevant-information'
import { ReviewCommentCount } from './review-comment-count'
import { ReviewHeader } from './review-header'
import { ReviewPagination } from './review-pagination'
import { ReviewRichtext } from './review-richtext'

const Reviews: React.FC = () => {
  const { isError, isLoading, data: reviewsData } = useReviews()
  const { data: reactionsData } = useReactions({ reviews: reviewsData })
  const { data: commentsData } = useCommentCountByReview(reviewsData)

  return (
    <SectionWrapper backgroundColor="bg-white">
      <SectionHeader
        title="Reviews"
        subtitle="You can find reviews of your company here, as well as comments
            related to them."
      />
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
                    reviewId={reviewId}
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
