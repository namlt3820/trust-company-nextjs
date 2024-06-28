'use client'

import { CommentNavigation } from '@/app/comments/comment-navigation'
import { CommentPagination } from '@/app/comments/comment-pagination'
import { CommentReactions } from '@/app/comments/comment-reactions'
import { ResourceStatus } from '@/components/resource-status'
import { SectionHeader } from '@/components/section-header'
import { SectionWrapper } from '@/components/section-wrapper'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useComments } from '@/hooks/useComments'
import { useReactions } from '@/hooks/useReactions'
import { formatDate } from '@/lib/formatDate'

export default function Comments() {
  const { data: commentsData, isLoading, isError } = useComments()
  const { data: reactionsData } = useReactions({ comments: commentsData })

  return (
    <SectionWrapper backgroundColor="bg-white">
      <SectionHeader title="Comments" />
      <CommentNavigation />
      <div className="mx-auto w-full">
        <ResourceStatus
          isLoading={isLoading}
          isNotFound={!isError && !isLoading && !commentsData?.docs.length}
          isError={isError}
          notFoundMessage="No comments found"
        />

        <div className="grid gap-4">
          {commentsData?.docs.map((comment) => {
            const { id: commentId, populatedUser, content, updatedAt } = comment

            const { name } = populatedUser!
            return (
              <Card key={commentId}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-semibold">{name}</span>
                      <CommentReactions
                        reactions={reactionsData?.find(
                          ({ type, id }) =>
                            type === 'comment' && id === commentId
                        )}
                        commentId={commentId}
                      />
                    </div>
                    <span className="font-medium text-gray-500 dark:text-gray-400">
                      {formatDate(new Date(updatedAt))}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line font-medium text-gray-500 dark:text-gray-400">
                    {content}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <CommentPagination response={commentsData} />
      </div>
    </SectionWrapper>
  )
}
