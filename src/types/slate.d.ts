import { BaseEditor, BaseRange, Descendant, Element, Range } from 'slate'
import { HistoryEditor } from 'slate-history'
import { ReactEditor } from 'slate-react'

export type BulletedListElement = {
  type: 'ol'
  children: Descendant[]
}

export type NumberedListElement = {
  type: 'ul'
  children: Descendant[]
}

export type ListItemElement = { type: 'li'; children: Descendant[] }

export type ParagraphElement = {
  type: 'paragraph'
  children: Descendant[]
}

type CustomElement =
  | BulletedListElement
  | ListItemElement
  | ParagraphElement
  | NumberedListElement

export type CustomText = {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  text: string
}

export type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & {
    nodeToDecorations?: Map<Element, Range[]>
  }

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
    Range: BaseRange & {
      [key: string]: unknown
    }
  }
}
