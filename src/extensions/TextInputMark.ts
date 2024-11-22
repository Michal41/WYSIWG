import { Mark } from "@tiptap/core";

const TextInputMark = Mark.create({
  name: "textInputTrigger",

  addAttributes() {
    return {
      value: {
        default: null,
      },
      type: {
        default: "text",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-text-input-trigger]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      {
        ...HTMLAttributes,
        "data-text-input-trigger": "",
        style: "background-color: #f0f8ff; color: #333; cursor: pointer;",
      },
      0,
    ];
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  addCommands() {
    return {
      setTextInputPlaceholder:
        ({ type = "text" }: { type?: string } = {}) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        ({ chain }) => {
          return chain()
            .focus()
            .insertContent({
              type: "text",
              text: "placeholder",
              marks: [
                {
                  type: "textInputTrigger",
                  attrs: { value: null, type },
                },
              ],
            })
            .run();
        },
    };
  },
});

export default TextInputMark;
