import { useEffect, useState } from "react";
import { useEditor, useEditorState } from "@tiptap/react";
import type { AnyExtension, Editor } from "@tiptap/core";
import { ExtensionKit } from "@/extensions/extension-kit";
import type { EditorUser } from "../components/BlockEditor/types";
import { initialContent } from "@/data/initialContent";

declare global {
  interface Window {
    editor: Editor | null;
  }
}


function markAllTextAsDeleted(content: any) {
  if (content.type === 'text') {
    content.marks = content.marks || [];
    content.marks.push({ type: 'deletion' });
  } else if (content.content) {
    content.content = content.content.map(markAllTextAsDeleted);
  }
  return content;
}

const modifiedContent = markAllTextAsDeleted({ ...initialContent });


export const useBlockEditor = ({
  userId,
  userName = "Maxi",
}: {
  userId?: string;
  userName?: string;
}) => {
  const editor = useEditor(
    {
      immediatelyRender: false,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      onCreate: (ctx) => {
        if (ctx.editor.isEmpty) {
          ctx.editor.commands.setContent(modifiedContent);
          ctx.editor.commands.focus("start", { scrollIntoView: true });
        }
      },
      extensions: [
        ...ExtensionKit(),
      ],
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          class: "min-h-full",
        },
      },
    },
    [],
  );

  window.editor = editor;

  return { editor };
};
