"use client";

import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Editor = () => {

  const editor = useEditor({
    extensions: [StarterKit],
    content: 'xxxx',
  })

  return (
    <div className='bg-red bg-[yellow]'>
      <EditorContent editor={editor} />
    </div>
  )
}

export default Editor