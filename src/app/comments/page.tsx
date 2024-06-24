'use client'

import { CommentPagination } from '@/app/comments/comment-pagination'
import { CommentReactions } from '@/app/comments/comment-reactions'
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
      <div className="mx-auto w-full">
        {isLoading && <div className="p-4 text-center">Searching...</div>}
        {!isError && !isLoading && !commentsData?.docs.length && (
          <div className="p-4 text-center">No comments found</div>
        )}
        {isError && <div className="p-4 text-center">Something went wrong</div>}

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
                  <p className="font-medium text-gray-500 dark:text-gray-400">
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
