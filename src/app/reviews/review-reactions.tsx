import { ReactionCountByType } from '@/api/getReactionCountByType'
import { Badge } from '@/components/ui/badge'

export type ReviewReactionsProps = {
  reactions: ReactionCountByType | undefined
  reviewId: string
}

export const ReviewReactions: React.FC<ReviewReactionsProps> = ({
  reactions,
  reviewId,
}) => {
  const items: JSX.Element[] = []
  if (!reactions) {
    return null
  }
  const { skull, redHeart, thumbUp, thumbDown } = reactions

  if (thumbUp) {
    items.push(
      <span key={`${reviewId}_thumpup`}>
        <em-emoji id="+1"></em-emoji>
        {thumbUp}
      </span>
    )
  }

  if (thumbDown) {
    items.push(
      <span key={`${reviewId}_thumpdown`}>
        <em-emoji id="-1"></em-emoji>
        {thumbDown}
      </span>
    )
  }

  if (redHeart) {
    items.push(
      <span key={`${reviewId}_redheart`}>
        <em-emoji id="heart"></em-emoji>
        {redHeart}
      </span>
    )
  }

  if (skull) {
    items.push(
      <span key={`${reviewId}_skull`}>
        <em-emoji id="skull"></em-emoji>
        {skull}
      </span>
    )
  }

  return (
    <Badge variant="outline" className="flex gap-2">
      {...items}
    </Badge>
  )
}
