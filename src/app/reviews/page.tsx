'use client'

import {
  ReactionCountByType,
  getReactionCountByType,
} from '@/api/getReactionCountByType'
import { getReviews } from '@/api/getReviews'
import { ResourceStatus } from '@/components/resource-status'
import { SectionHeader } from '@/components/section-header'
import { SectionWrapper } from '@/components/section-wrapper'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { GetPaginationResponse } from '@/lib/paginationResponse'
import { Review } from '@/lib/payloadTypes'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { BasicReview } from './basic-review'
import { RelevantInformation } from './relevant-information'
import { ReviewCommentCount } from './review-comment-count'
import { ReviewHeader } from './review-header'
import { ReviewPagination } from './review-pagination'
import { RichTextReview } from './richtext-review'

const Reviews: React.FC = () => {
  const searchParams = useSearchParams()
  const company = searchParams.get('company') || undefined
  const user = searchParams.get('user') || undefined
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 1

  const {
    data: reviewsData,
    isLoading: isLoadingReviews,
    isError: isErrorReviews,
  } = useQuery<GetPaginationResponse<Review>>({
    queryKey: ['get-reviews', { company, user, page, limit }],
    queryFn: () => getReviews({ company, user, page, limit }),
  })

  const reviewIds = reviewsData?.docs?.map((review) => review.id) || []

  const {
    data: reactionsData,
    isLoading: isLoadingReactions,
    isError: isErrorReactions,
  } = useQuery<ReactionCountByType[]>({
    queryKey: ['reactions/count-by-type', { reviews: reviewIds }],
    queryFn: () => getReactionCountByType({ reviews: reviewIds }),
    enabled: !!reviewsData,
  })

  return (
    <SectionWrapper backgroundColor="bg-white">
      <SectionHeader
        title="Reviews"
        subtitle="You can find reviews of your company here, as well as comments
            related to them."
      />
      <div className="mx-auto w-full">
        <ResourceStatus
          isLoading={isLoadingReviews}
          isNotFound={
            !isErrorReviews && !isLoadingReviews && !reviewsData?.docs.length
          }
          isError={isErrorReviews}
          notFoundMessage="No reviews found"
        />

        <div className="grid gap-4">
          {reviewsData?.docs.map((review) => {
            const { id: reviewId, rate, populatedUser, updatedAt } = review

            const { name } = populatedUser!
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
                    <RichTextReview review={review} />
                    <ReviewCommentCount review={review} />
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
