import { useEffect, useState } from 'react'
import { useEditor, useEditorState } from '@tiptap/react'
import type { AnyExtension, Editor } from '@tiptap/core'
import { ExtensionKit } from '@/extensions/extension-kit'
import type { EditorUser } from '../components/BlockEditor/types'
import { initialContent } from '@/data/initialContent'

declare global {
  interface Window {
    editor: Editor | null
  }
}

export const useBlockEditor = ({ userId, userName = 'Maxi' }: { userId?: string; userName?: string }) => {
  const editor = useEditor(
    {
      immediatelyRender: true,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      onCreate: ctx => {
        if (ctx.editor.isEmpty) {
          ctx.editor.commands.setContent(initialContent)
          ctx.editor.commands.focus('start', { scrollIntoView: true })
        }
      },
      extensions: [
        ...ExtensionKit({
          provider: null,
        }),
      ],
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: 'min-h-full',
        },
      },
    },
    [],
  )
  const users = useEditorState({
    editor,
    selector: (ctx): (EditorUser & { initials: string })[] => {
      return []
    },
  })

  window.editor = editor

  return { editor, users }
}
