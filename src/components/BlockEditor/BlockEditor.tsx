/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { EditorContent } from "@tiptap/react";
import React, { useRef, useImperativeHandle } from "react";

import { LinkMenu } from "@/components/menus";

import { useBlockEditor } from "@/hooks/useBlockEditor";

import "@/styles/index.css";

import ImageBlockMenu from "@/extensions/ImageBlock/components/ImageBlockMenu";
import { ColumnsMenu } from "@/extensions/MultiColumn/menus";
import { TableColumnMenu, TableRowMenu } from "@/extensions/Table/menus";
import { TextMenu } from "../menus/TextMenu";
import { DatepickerMenu } from "../menus/DatePickerMenu";
import { TextInputMenu } from "../menus/TextInputMenu";
interface BlockEditorProps {
  content: any;
}

export interface Metadata {
  contractStartDate?: string;
  contractEndDate?: string;
  liquefaction?: string;
  customerName?: string;
}

export type MetadataTypes =
  | "contractStartDate"
  | "contractEndDate"
  | "liquefaction"
  | "customerName";

export interface BlockEditorRef {
  getContent: () => any;
  getMetadata: () => Metadata | null;
}

const BlockEditor = React.forwardRef<BlockEditorRef, BlockEditorProps>(
  ({ content }, ref) => {
    const menuContainerRef = useRef(null);
    const metadataRef = useRef<Metadata>({});
    const { editor } = useBlockEditor({ content });

    useImperativeHandle(ref, () => ({
      getContent: () => editor?.getJSON(),
      getMetadata: () => metadataRef.current,
    }));

    if (!editor) {
      return null;
    }

    // const getCurrentContent = () => {
    //   const content = editor.getJSON();
    //   console.log(content);
    // };

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
          <DatepickerMenu editor={editor} metadataRef={metadataRef} />
          <TextInputMenu editor={editor} metadataRef={metadataRef} />
          {/* <button onClick={getCurrentContent}>Get Current Content</button> */}
        </div>
      </div>
    );
  },
);

export default BlockEditor;
