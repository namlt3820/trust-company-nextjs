import { CreateReactionParams, createReaction } from '@/api/createReaction'
import { deleteReaction } from '@/api/deleteReaction'
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

  const createReactionMutation = useMutation({
    mutationFn: (params: CreateReactionParams) => createReaction(params),
    onSuccess: () => {
      refetchReactions()
    },
  })

  const deleteReactionMutation = useMutation({
    mutationFn: (id: string) => deleteReaction(id),
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

      createReactionMutation.mutate({
        user: user!.id,
        type,
        target: { relationTo: 'reviews', value: reviewId },
      })
    },
    [createReactionMutation, reviewId, toast]
  )

  const handleDeleteReaction = useCallback(
    (id: string, user: User | null | undefined) => {
      if (!user) {
        toast({
          title: 'You need to log in before delete a reaction.',
        })
        return
      }

      deleteReactionMutation.mutate(id)
    },
    [deleteReactionMutation, toast]
  )

  const handleClickReaction = (type: Reaction['type']) => {
    const reaction = hasReactionType(type)
    return reaction
      ? handleDeleteReaction(reaction.id, user)
      : handleCreateReaction(type, user)
  }

  if (!reactions) {
    return null
  }
  const { skull, redHeart, thumbUp, thumbDown, hasReactions } = reactions

  const hasReactionType = (type: Reaction['type']) =>
    hasReactions?.find((reaction) => reaction.type === type)

  return (
    <Badge variant="outline" className="flex gap-2 text-base">
      <div
        key={`${reviewId}_thumpup`}
        className="inline-flex cursor-pointer gap-1"
        onClick={() => handleClickReaction('thumbs_up')}
      >
        <em-emoji id="+1"></em-emoji>
        <span className={hasReactionType('thumbs_up') ? 'text-sky-400' : ''}>
          {thumbUp}
        </span>
      </div>
      <div
        key={`${reviewId}_thumpdown`}
        className="inline-flex cursor-pointer gap-1"
        onClick={() => handleClickReaction('thumbs_down')}
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
        onClick={() => handleClickReaction('red_heart')}
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
        onClick={() => handleClickReaction('skull')}
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
