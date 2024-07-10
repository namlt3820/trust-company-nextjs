'use client'

import { CommentActions } from '@/app/[locale]/comments/comment-actions'
import { CommentNavigation } from '@/app/[locale]/comments/comment-navigation'
import { CommentPagination } from '@/app/[locale]/comments/comment-pagination'
import { CommentReactions } from '@/app/[locale]/comments/comment-reactions'
import { ResourceStatus } from '@/components/resource-status'
import { SectionHeader } from '@/components/section-header'
import { SectionWrapper } from '@/components/section-wrapper'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { LocaleType } from '@/config'
import { useComments } from '@/hooks/useComments'
import { useReactions } from '@/hooks/useReactions'
import { formatDate } from '@/lib/formatDate'
import { User } from '@/lib/payloadTypes'
import { useLocale, useTranslations } from 'next-intl'

export default function Comments() {
  const t = useTranslations()
  const { data: commentsData, isLoading, isError } = useComments()
  const { data: reactionsData } = useReactions({ comments: commentsData })
  const locale = useLocale()

  return (
    <div className="mt-24 md:mt-0">
      {' '}
      <SectionWrapper backgroundColor="bg-white">
        <SectionHeader title={t('Comment.title')} />
        <CommentNavigation />
        <div className="mx-auto w-full">
          <ResourceStatus
            isLoading={isLoading}
            isNotFound={!isError && !isLoading && !commentsData?.docs.length}
            isError={isError}
            notFoundMessage={t('Comment.not_found')}
          />

          <div className="grid gap-4">
            {commentsData?.docs.map((comment) => {
              const { id: commentId, user, content, updatedAt } = comment
              const { name } = user as User

              return (
                <Card key={commentId}>
                  <CardHeader>
                    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                      <div className="grid w-full grid-cols-2 items-center gap-y-4 md:w-auto md:grid-cols-[auto,auto,auto] md:gap-x-2 md:gap-y-0">
                        <span className="col-span-1 justify-self-start text-lg font-semibold">
                          {name}
                        </span>
                        <div className="col-span-1 justify-self-end md:justify-self-start">
                          <CommentReactions
                            reactions={reactionsData?.find(
                              ({ type, id }) =>
                                type === 'comment' && id === commentId
                            )}
                            commentId={commentId}
                          />
                        </div>
                        <div className="col-span-1 justify-self-start">
                          <CommentActions comment={comment} />
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-500 md:text-base">
                        {formatDate(new Date(updatedAt), locale as LocaleType)}
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
    </div>
  )
}
