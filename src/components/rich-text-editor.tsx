'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import isHotkey from 'is-hotkey'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Underline,
} from 'lucide-react'
import { ReactNode, useCallback, useMemo } from 'react'
import {
  Descendant,
  Editor,
  Element as SlateElement,
  Transforms,
  createEditor,
} from 'slate'
import { withHistory } from 'slate-history'
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  useSlate,
  withReact,
} from 'slate-react'

const HOTKEYS: { [key: string]: MarkType } = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+s': 'strikethrough',
}

const LIST_TYPES = ['ol', 'ul']

type BlockType = 'ol' | 'li' | 'paragraph' | 'ul'

type MarkType = 'bold' | 'italic' | 'underline' | 'strikethrough'

const toggleBlock = (editor: Editor, blockType: BlockType) => {
  const isActive = isBlockActive(editor, blockType)
  const isList = LIST_TYPES.includes(blockType)

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  })
  let newProperties: Partial<SlateElement>
  newProperties = {
    type: isActive ? 'paragraph' : isList ? 'li' : (blockType as BlockType),
  }
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: blockType, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor: Editor, markType: MarkType) => {
  const isActive = isMarkActive(editor, markType)

  if (isActive) {
    Editor.removeMark(editor, markType)
  } else {
    Editor.addMark(editor, markType, true)
  }
}

const isBlockActive = (editor: Editor, blockType: string) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n.type === blockType,
    })
  )

  return !!match
}

const isMarkActive = (editor: Editor, markType: MarkType) => {
  const marks = Editor.marks(editor)
  return marks ? marks[markType] === true : false
}

const Element = ({ attributes, children, element }: RenderElementProps) => {
  switch (element.type) {
    case 'ol':
      return (
        <ol {...attributes} className="list-inside list-decimal">
          {children}
        </ol>
      )

    case 'ul':
      return (
        <ul {...attributes} className="list-inside list-disc">
          {children}
        </ul>
      )

    case 'li':
      return <li {...attributes}>{children}</li>

    default:
      return <div {...attributes}>{children}</div>
  }
}

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  if (leaf.strikethrough) {
    children = <s>{children}</s>
  }

  return <span {...attributes}>{children}</span>
}

const BlockButton = ({
  blockType,
  children,
}: {
  blockType: BlockType
  children: ReactNode
}) => {
  const editor = useSlate()
  return (
    <Button
      type="button"
      onMouseDown={(event: any) => {
        event.preventDefault()
        toggleBlock(editor, blockType)
      }}
      variant={'outline'}
      className={cn('h-7 px-2', {
        'bg-slate-300': isBlockActive(editor, blockType),
      })}
    >
      {children}
    </Button>
  )
}

const MarkButton = ({
  markType,
  children,
}: {
  markType: MarkType
  children: ReactNode
}) => {
  const editor = useSlate()
  return (
    <Button
      type="button"
      variant={'outline'}
      className={cn('h-7 px-2', {
        'bg-slate-300': isMarkActive(editor, markType),
      })}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleMark(editor, markType)
      }}
    >
      {children}
    </Button>
  )
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

export type RichTextEditorProps = {
  className?: string
  onChange: (value: Descendant[]) => void
  editValue?: Descendant[]
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  className,
  onChange,
  editValue,
}) => {
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  )
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  )
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <div className={className}>
      <Slate
        editor={editor}
        initialValue={editValue && editValue.length ? editValue : initialValue}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => 'set_selection' !== op.type
          )
          if (isAstChange) {
            onChange(value)
          }
        }}
      >
        <div className="mb-2 flex gap-2">
          <MarkButton markType="bold">
            <Bold className="h-4 w-4" />
          </MarkButton>
          <MarkButton markType="italic">
            <Italic className="h-4 w-4" />
          </MarkButton>
          <MarkButton markType="underline">
            <Underline className="h-4 w-4" />
          </MarkButton>
          <MarkButton markType="strikethrough">
            <Strikethrough className="h-4 w-4" />
          </MarkButton>
          <BlockButton blockType="ol">
            <ListOrdered className="h-4 w-4" />
          </BlockButton>
          <BlockButton blockType="ul">
            <List className="h-4 w-4" />
          </BlockButton>
        </div>
        <Editable
          className="rounded-md border border-input px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault()
                const mark: MarkType = HOTKEYS[hotkey as keyof typeof HOTKEYS]
                toggleMark(editor, mark)
              }
            }
          }}
        />
      </Slate>
    </div>
  )
}
