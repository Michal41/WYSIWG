"use client";

import { EditorContent } from "@tiptap/react";
import React, { useRef } from "react";

import { LinkMenu } from "@/components/menus";

import { useBlockEditor } from "@/hooks/useBlockEditor";

import "@/styles/index.css";

import ImageBlockMenu from "@/extensions/ImageBlock/components/ImageBlockMenu";
import { ColumnsMenu } from "@/extensions/MultiColumn/menus";
import { TableColumnMenu, TableRowMenu } from "@/extensions/Table/menus";
import { TextMenu } from "../menus/TextMenu";

export const BlockEditor = ({ content }: { content: any }) => {
  const menuContainerRef = useRef(null);
  const { editor } = useBlockEditor({ content });

  if (!editor) {
    return null;
  }

  const getCurrentContent = () => {
    const content = editor.getJSON();
    console.log(content);
  };

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <div className="relative flex flex-col flex-1 h-full overflow-hidden">
        <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
        <button onClick={getCurrentContent}>Get Current Content</button>
      </div>
    </div>
  );
};

export default BlockEditor;
