import { CreateReactionParams, createReaction } from '@/api/createReaction'
import { deleteReaction } from '@/api/deleteReaction'
import { ReactionCountByType } from '@/api/getReactionCountByType'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { useComments } from '@/hooks/useComments'
import { useReactions } from '@/hooks/useReactions'
import { Reaction, User } from '@/lib/payloadTypes'
import { useAuth } from '@/providers/Auth'
import { useMutation } from '@tanstack/react-query'
import { Smile } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export type CommentReactionsProps = {
  reactions: ReactionCountByType | undefined
  commentId: string
}

export const CommentReactions: React.FC<CommentReactionsProps> = ({
  reactions,
  commentId,
}) => {
  const t = useTranslations()
  const { user } = useAuth()
  const { toast } = useToast()
  const { data: commentsData } = useComments()
  const { refetch: refetchReactions } = useReactions({ comments: commentsData })
  const [showAllReactions, setShowFullReactions] = useState<boolean>(false)

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
        title: t('General.login_first'),
      })
      return
    }

    createReactionMutation.mutate({
      user: user!.id,
      type,
      target: { relationTo: 'comments', value: commentId },
    })
  }

  const handleDeleteReaction = (id: string, user: User | null | undefined) => {
    if (!user) {
      toast({
        title: t('General.login_first'),
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
    <Badge variant="outline" className="flex gap-2 text-base">
      <div
        className="inline-flex cursor-pointer gap-1"
        onClick={toggleShowFullReaction}
      >
        <Smile size={18} />
      </div>

      {showAllReactions || (!showAllReactions && thumbUp) ? (
        <div
          key={`${commentId}}_thumpup`}
          className="inline-flex cursor-pointer gap-1"
          onClick={() => handleClickReaction('thumbs_up')}
        >
          <em-emoji id="+1"></em-emoji>
          <span className={hasReactionType('thumbs_up') ? 'text-sky-400' : ''}>
            {thumbUp}
          </span>
        </div>
      ) : null}

      {showAllReactions || (!showAllReactions && thumbDown) ? (
        <div
          key={`${commentId}}_thumpdown`}
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
      ) : null}

      {showAllReactions || (!showAllReactions && redHeart) ? (
        <div
          key={`${commentId}}_redheart`}
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
          key={`${commentId}}_skull`}
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
  )
}
