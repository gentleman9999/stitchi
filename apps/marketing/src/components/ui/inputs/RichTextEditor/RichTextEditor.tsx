import React from 'react'
import { useEditor, EditorContent, EditorOptions } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import styles from './RichTextEditor.module.css'
import cx from 'classnames'

interface Props {
  placeholder?: string
  editorOptions?: Partial<
    Omit<EditorOptions, 'injectCSS' | 'extensions' | 'editorProps'>
  >
}

const RichTextEditor = ({ placeholder, editorOptions }: Props) => {
  const editor = useEditor({
    ...(editorOptions || {}),
    injectCSS: false,
    extensions: [StarterKit, Placeholder.configure({ placeholder })],
    editorProps: {
      attributes: {
        class: cx(
          'min-h-[100px] prose prose-sm p-3 focus:ring-primary focus:border-primary focus:outline-primary rounded-md border shadow-sm max-w-none',
        ),
      },
    },
  })

  return (
    <div className={styles.rte}>
      <EditorContent editor={editor} onChange={e => {}} />
    </div>
  )
}

export default RichTextEditor
