import { Group } from "./types";

export const GROUPS: Group[] = [
  {
    name: "format",
    title: "Format",
    commands: [
      {
        name: "heading1",
        label: "Heading 1",
        iconName: "Heading1",
        description: "High priority section title",
        aliases: ["h1"],
        action: (editor) => {
          editor.chain().focus().setHeading({ level: 1 }).run();
        },
      },
      {
        name: "heading2",
        label: "Heading 2",
        iconName: "Heading2",
        description: "Medium priority section title",
        aliases: ["h2"],
        action: (editor) => {
          editor.chain().focus().setHeading({ level: 2 }).run();
        },
      },
      {
        name: "heading3",
        label: "Heading 3",
        iconName: "Heading3",
        description: "Low priority section title",
        aliases: ["h3"],
        action: (editor) => {
          editor.chain().focus().setHeading({ level: 3 }).run();
        },
      },
      {
        name: "bulletList",
        label: "Bullet List",
        iconName: "List",
        description: "Unordered list of items",
        aliases: ["ul"],
        action: (editor) => {
          editor.chain().focus().toggleBulletList().run();
        },
      },
      {
        name: "numberedList",
        label: "Numbered List",
        iconName: "ListOrdered",
        description: "Ordered list of items",
        aliases: ["ol"],
        action: (editor) => {
          editor.chain().focus().toggleOrderedList().run();
        },
      },
      {
        name: "taskList",
        label: "Task List",
        iconName: "ListTodo",
        description: "Task list with todo items",
        aliases: ["todo"],
        action: (editor) => {
          editor.chain().focus().toggleTaskList().run();
        },
      },
      {
        name: "blockquote",
        label: "Blockquote",
        iconName: "Quote",
        description: "Element for quoting",
        action: (editor) => {
          editor.chain().focus().setBlockquote().run();
        },
      },
      {
        name: "codeBlock",
        label: "Code Block",
        iconName: "SquareCode",
        description: "Code block with syntax highlighting",
        shouldBeHidden: (editor) => editor.isActive("columns"),
        action: (editor) => {
          editor.chain().focus().setCodeBlock().run();
        },
      },
    ],
  },
  {
    name: "insert",
    title: "Insert",
    commands: [
      {
        name: "table",
        label: "Table",
        iconName: "Table",
        description: "Insert a table",
        shouldBeHidden: (editor) => editor.isActive("columns"),
        action: (editor) => {
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: false })
            .run();
        },
      },
      // {
      //   name: "image",
      //   label: "Image",
      //   iconName: "Image",
      //   description: "Insert an image",
      //   aliases: ["img"],
      //   action: (editor) => {
      //     editor.chain().focus().setImageUpload().run();
      //   },
      // },
      {
        name: "columns",
        label: "Columns",
        iconName: "Columns2",
        description: "Add two column content",
        aliases: ["cols"],
        shouldBeHidden: (editor) => editor.isActive("columns"),
        action: (editor) => {
          editor
            .chain()
            .focus()
            .setColumns()
            .focus(editor.state.selection.head - 1)
            .run();
        },
      },
      {
        name: "horizontalRule",
        label: "Horizontal Rule",
        iconName: "Minus",
        description: "Insert a horizontal divider",
        aliases: ["hr"],
        action: (editor) => {
          editor.chain().focus().setHorizontalRule().run();
        },
      },
    ],
  },
  {
    name: "Meta Data",
    title: "Meta Data",
    commands: [
      {
        name: "Contract Start Date",
        label: "Contract Start Date",
        iconName: "Calendar",
        description: "Insert a date",
        action: (editor) => {
          editor
            .chain()
            .focus()
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            .setDatepickerPlaceholder({ type: "contractStartDate" })
            .run();
        },
      },
      {
        name: "Contract End Date",
        label: "Contract End Date",
        iconName: "Calendar",
        description: "Insert a date",
        action: (editor) => {
          editor
            .chain()
            .focus()
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            .setDatepickerPlaceholder({ type: "contractEndDate" })
            .run();
        },
      },
      {
        name: "Liquefaction Rate",
        label: "Liquefaction Rate",
        iconName: "Text",
        description: "Insert a liquefaction rate",
        action: (editor) => {
          editor
            .chain()
            .focus()
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            .setTextInputPlaceholder({
              type: "liquefaction",
              placeholder: "Enter liquefaction rate",
            })
            .run();
        },
      },
      {
        name: "Customer Name",
        label: "Customer Name",
        iconName: "User",
        description: "Insert a customer name",
        action: (editor) => {
          editor
            .chain()
            .focus()
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            .setTextInputPlaceholder({
              type: "customerName",
              placeholder: "Enter customer name",
            })
            .run();
        },
      },
    ],
  },
];

export default GROUPS;
