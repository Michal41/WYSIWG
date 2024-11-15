"use client";

import {
  BlockquoteFigure,
  CharacterCount,
  CodeBlock,
  Color,
  Document,
  Dropcursor,
  Figcaption,
  Focus,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalRule,
  ImageBlock,
  Link,
  Placeholder,
  Selection,
  SlashCommand,
  StarterKit,
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TextAlign,
  TextStyle,
  TrailingNode,
  Typography,
  Underline,
  Columns,
  Column,
  TaskItem,
  TaskList,
} from ".";

import { Mark } from "@tiptap/core";

export const DeletionMark = Mark.create({
  name: "deletion",

  addAttributes() {
    return {
      style: {
        default: "background-color: lightcoral; text-decoration: line-through;",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="deletion"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", { "data-type": "deletion", ...HTMLAttributes }, 0];
  },
});

export const AdditionMark = Mark.create({
  name: "addition",

  addAttributes() {
    return {
      style: {
        default: "background-color: lightgreen; text-decoration: underline;",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="addition"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", { "data-type": "addition", ...HTMLAttributes }, 0];
  },
});

export const ExtensionKit = () => [
  Document,
  Columns,
  DeletionMark,
  AdditionMark,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Column,
  Selection,
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
  }),
  HorizontalRule,
  StarterKit.configure({
    document: false,
    dropcursor: false,
    heading: false,
    horizontalRule: false,
    blockquote: false,
    history: false,
    codeBlock: false,
  }),
  CodeBlock,
  TextStyle,
  FontSize,
  FontFamily,
  Color,
  TrailingNode,
  Link.configure({
    openOnClick: false,
  }),
  Highlight.configure({ multicolor: true }),
  Underline,
  CharacterCount.configure({ limit: 50000 }),
  ImageBlock,
  TextAlign.extend({
    addKeyboardShortcuts() {
      return {};
    },
  }).configure({
    types: ["heading", "paragraph"],
  }),
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Typography,
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: () => "",
  }),
  SlashCommand,
  Focus,
  Figcaption,
  BlockquoteFigure,
  Dropcursor.configure({
    width: 2,
    class: "ProseMirror-dropcursor border-black",
  }),
];

export default ExtensionKit;
