import { CreateReactionParams, createReaction } from '@/api/createReaction'
import { deleteReaction } from '@/api/deleteReaction'
import { ReactionCountByType } from '@/api/getReactionCountByType'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { useReactions } from '@/hooks/useReactions'
import { useReviews } from '@/hooks/useReviews'
import { Reaction, User } from '@/lib/payloadTypes'
import { useAuth } from '@/providers/Auth'
import { useMutation } from '@tanstack/react-query'
import { Smile } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'

export type ReviewReactionsProps = {
  reactions: ReactionCountByType | undefined
  reviewId: string
}

export const ReviewReactions: React.FC<ReviewReactionsProps> = ({
  reactions,
  reviewId,
}) => {
  const t = useTranslations('General')
  const { user } = useAuth()
  const { toast } = useToast()
  const { data: reviewsData } = useReviews()
  const { refetch: refetchReactions } = useReactions({ reviews: reviewsData })
  const [showAllReactions, setShowFullReactions] = useState<boolean>(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setShowFullReactions(false))

  const createReactionMutation = useMutation({
    mutationFn: (params: CreateReactionParams) => createReaction(params),
    onSuccess: async () => {
      await refetchReactions()
      await setShowFullReactions(false)
    },
  })

  const deleteReactionMutation = useMutation({
    mutationFn: (id: string) => deleteReaction(id),
    onSuccess: async () => {
      await refetchReactions()
      await setShowFullReactions(false)
    },
  })

  const handleCreateReaction = (
    type: Reaction['type'],
    user: User | null | undefined
  ) => {
    if (!user) {
      toast({
        title: t('login_first'),
      })
      return
    }

    createReactionMutation.mutate({
      user: user!.id,
      type,
      target: { relationTo: 'reviews', value: reviewId },
    })
  }

  const handleDeleteReaction = (id: string, user: User | null | undefined) => {
    if (!user) {
      toast({
        title: t('login_first'),
      })
      return
    }

    deleteReactionMutation.mutate(id)
  }

  const handleClickReaction = (type: Reaction['type']) => {
    const reaction = hasReactionType(type)
    return reaction
      ? handleDeleteReaction(reaction.id, user)
      : handleCreateReaction(type, user)
  }

  const toggleShowFullReaction = () => {
    setShowFullReactions((showFullReaction) => !showFullReaction)
  }

  if (!reactions) {
    return null
  }
  const { skull, redHeart, thumbUp, thumbDown, hasReactions } = reactions

  const hasReactionType = (type: Reaction['type']) =>
    hasReactions?.find((reaction) => reaction.type === type)

  return (
    <div ref={ref}>
      <Badge variant="outline" className="flex gap-2 text-base">
        <div
          className="inline-flex cursor-pointer gap-1"
          onClick={toggleShowFullReaction}
        >
          <Smile size={18} />
        </div>

        {showAllReactions || (!showAllReactions && thumbUp) ? (
          <div
            key={`${reviewId}_thumpup`}
            className="inline-flex cursor-pointer gap-1"
            onClick={() => handleClickReaction('thumbs_up')}
          >
            <em-emoji id="+1"></em-emoji>
            <span
              className={hasReactionType('thumbs_up') ? 'text-sky-400' : ''}
            >
              {thumbUp}
            </span>
          </div>
        ) : null}

        {showAllReactions || (!showAllReactions && thumbDown) ? (
          <div
            key={`${reviewId}_thumpdown`}
            className="inline-flex cursor-pointer gap-1"
            onClick={() => handleClickReaction('thumbs_down')}
          >
            <em-emoji id="-1"></em-emoji>
            <span
              className={
                hasReactions?.find(
                  (reaction) => reaction.type === 'thumbs_down'
                )
                  ? 'text-sky-400'
                  : ''
              }
            >
              {thumbDown}
            </span>
          </div>
        ) : null}

        {showAllReactions || (!showAllReactions && redHeart) ? (
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
        ) : null}

        {showAllReactions || (!showAllReactions && skull) ? (
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
        ) : null}
      </Badge>
    </div>
  )
}
