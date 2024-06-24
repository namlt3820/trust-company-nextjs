import { CreateReactionParams, createReaction } from '@/api/createReaction'
import { ReactionCountByType } from '@/api/getReactionCountByType'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { useReactions } from '@/hooks/useReactions'
import { useReviews } from '@/hooks/useReviews'
import { Reaction, User } from '@/lib/payloadTypes'
import { useAuth } from '@/providers/Auth'
import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'

export type ReviewReactionsProps = {
  reactions: ReactionCountByType | undefined
  reviewId: string
}

export const ReviewReactions: React.FC<ReviewReactionsProps> = ({
  reactions,
  reviewId,
}) => {
  const { user } = useAuth()
  const { toast } = useToast()
  const { data: reviewsData } = useReviews()
  const { refetch: refetchReactions } = useReactions(reviewsData)

  const mutation = useMutation({
    mutationFn: (params: CreateReactionParams) => createReaction(params),
    onSuccess: () => {
      refetchReactions()
    },
  })

  const handleCreateReaction = useCallback(
    (type: Reaction['type'], user: User | null | undefined) => {
      if (!user) {
        toast({
          title: 'You need to log in before creating a reaction.',
        })
        return
      }

      mutation.mutate({
        user: user!.id,
        type,
        target: { relationTo: 'reviews', value: reviewId },
      })
    },
    [mutation, reviewId, toast]
  )

  if (!reactions) {
    return null
  }
  const { skull, redHeart, thumbUp, thumbDown, hasReactions } = reactions

  return (
    <Badge variant="outline" className="flex gap-2 text-base">
      <div
        key={`${reviewId}_thumpup`}
        className="inline-flex cursor-pointer gap-1"
        onClick={() => handleCreateReaction('thumbs_up', user)}
      >
        <em-emoji id="+1"></em-emoji>
        <span
          className={
            hasReactions?.find((reaction) => reaction.type === 'thumbs_up')
              ? 'text-sky-400'
              : ''
          }
        >
          {thumbUp}
        </span>
      </div>
      <div
        key={`${reviewId}_thumpdown`}
        className="inline-flex cursor-pointer gap-1"
        onClick={() => handleCreateReaction('thumbs_down', user)}
      >
        <em-emoji id="-1"></em-emoji>
        <span
          className={
            hasReactions?.find((reaction) => reaction.type === 'thumbs_down')
              ? 'text-sky-400'
              : ''
          }
        >
          {thumbDown}
        </span>
      </div>

      <div
        key={`${reviewId}_redheart`}
        className="inline-flex cursor-pointer gap-1"
        onClick={() => handleCreateReaction('red_heart', user)}
      >
        <em-emoji id="heart"></em-emoji>
        <span
          className={
            hasReactions?.find((reaction) => reaction.type === 'red_heart')
              ? 'text-sky-400'
              : ''
          }
        >
          {redHeart}
        </span>
      </div>
      <div
        key={`${reviewId}_skull`}
        className="inline-flex cursor-pointer gap-1"
        onClick={() => handleCreateReaction('skull', user)}
      >
        <em-emoji id="skull"></em-emoji>
        <span
          className={
            hasReactions?.find((reaction) => reaction.type === 'skull')
              ? 'text-sky-400'
              : ''
          }
        >
          {skull}
        </span>
      </div>
    </Badge>
  )
}
