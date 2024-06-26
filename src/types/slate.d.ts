import { BaseEditor, BaseRange, Descendant, Element, Range } from 'slate'
import { HistoryEditor } from 'slate-history'
import { ReactEditor } from 'slate-react'

// export type BlockQuoteElement = {
//   type: 'block-quote'
//   align?: string
//   children: Descendant[]
// }

export type BulletedListElement = {
  type: 'bulleted-list'
  // align?: string
  children: Descendant[]
}

export type NumberedListElement = {
  type: 'numbered-list'
  // align?: string
  children: Descendant[]
}

// export type CheckListItemElement = {
//   type: 'check-list-item'
//   checked: boolean
//   children: Descendant[]
// }

// export type EditableVoidElement = {
//   type: 'editable-void'
//   children: CustomText[]
// }

// export type HeadingElement = {
//   type: 'heading'
//   align?: string
//   children: Descendant[]
// }

// export type HeadingOneElement = {
//   type: 'heading-one'
//   align?: string
//   children: Descendant[]
// }

// export type HeadingTwoElement = {
//   type: 'heading-two'
//   align?: string
//   children: Descendant[]
// }

// export type ImageElement = {
//   type: 'image'
//   url: string
//   children: CustomText[]
// }

// export type LinkElement = { type: 'link'; url: string; children: Descendant[] }

// export type ButtonElement = { type: 'button'; children: Descendant[] }

// export type BadgeElement = { type: 'badge'; children: Descendant[] }

export type ListItemElement = { type: 'list-item'; children: Descendant[] }

// export type MentionElement = {
//   type: 'mention'
//   character: string
//   children: CustomText[]
// }

export type ParagraphElement = {
  type: 'paragraph'
  // align?: string
  children: Descendant[]
}

// export type TableElement = { type: 'table'; children: TableRow[] }

// export type TableCellElement = { type: 'table-cell'; children: CustomText[] }

// export type TableRowElement = { type: 'table-row'; children: TableCell[] }

// export type TitleElement = { type: 'title'; children: Descendant[] }

// export type VideoElement = {
//   type: 'video'
//   url: string
//   children: CustomText[]
// }

// export type CodeBlockElement = {
//   type: 'code-block'
//   language: string
//   children: Descendant[]
// }

// export type CodeLineElement = {
//   type: 'code-line'
//   children: Descendant[]
// }

type CustomElement =
  // | BlockQuoteElement
  | BulletedListElement
  // | CheckListItemElement
  // | EditableVoidElement
  // | HeadingElement
  // | HeadingOneElement
  // | HeadingTwoElement
  // | ImageElement
  // | LinkElement
  // | ButtonElement
  // | BadgeElement
  | ListItemElement
  // | MentionElement
  | ParagraphElement
  // | TableElement
  // | TableRowElement
  // | TableCellElement
  // | TitleElement
  // | VideoElement
  // | CodeBlockElement
  // | CodeLineElement
  | NumberedListElement

export type CustomText = {
  bold?: boolean
  italic?: boolean
  // code?: boolean
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

// import 'slate'
// import type { BaseEditor } from 'slate'
// import type { ReactEditor } from 'slate-react'

// type Paragraph = {
//   type: 'paragraph'
//   children: CustomText[]
// }

// type ListItem = {
//   type: 'list-item'
//   children: CustomText[]
// }

// type OrderedList = {
//   type: 'ordered-list'
//   children: ListItem[]
// }

// type UnorderedList = {
//   type: 'unordered-list'
//   children: ListItem[]
// }

// type CustomElement = Paragraph | ListItem | OrderedList | UnorderedList

// type CustomText = {
//   text: string
//   bold?: boolean
//   italic?: boolean
//   strikethrough?: boolean
//   underline?: boolean
// }

// declare module 'slate' {
//   interface CustomTypes {
//     Editor: BaseEditor & ReactEditor
//     Element: CustomElement
//     Text: CustomText
//   }
// }
