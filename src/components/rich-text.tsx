import escapeHTML from 'escape-html'
import React, { Fragment } from 'react'
import { Text } from 'slate'

type Children = Leaf[]

type Leaf = {
  type?: string
  value?: {
    url: string
    alt: string
  }
  children?: Children
  url?: string
  [key: string]: unknown
}

const serialize = (children?: Children): React.ReactNode[] =>
  children?.map((node, i) => {
    if (Text.isText(node)) {
      let text = (
        <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
      )

      if (node.bold) {
        text = <strong key={i}>{text}</strong>
      }

      if (node.italic) {
        text = <em key={i}>{text}</em>
      }

      if (node.underline) {
        text = (
          <span style={{ textDecoration: 'underline' }} key={i}>
            {text}
          </span>
        )
      }

      if (node.strikethrough) {
        text = (
          <span style={{ textDecoration: 'line-through' }} key={i}>
            {text}
          </span>
        )
      }

      return <Fragment key={i}>{text}</Fragment>
    }

    if (!node) {
      return null
    }

    switch (node.type) {
      case 'ul':
        return (
          <ul className="grid list-inside list-disc gap-2" key={i}>
            {serialize(node?.children)}
          </ul>
        )
      case 'ol':
        return (
          <ol key={i} className="grid list-inside list-decimal gap-2">
            {serialize(node.children)}
          </ol>
        )
      case 'li':
        return <li key={i}>{serialize(node.children)}</li>

      default:
        return <p key={i}>{serialize(node?.children)}</p>
    }
  }) || []

export type RichTextProps = {
  content: Children | null
}

export const RichText: React.FC<RichTextProps> = ({ content }) => {
  if (!content) {
    return null
  }

  return <div>{serialize(content)}</div>
}
