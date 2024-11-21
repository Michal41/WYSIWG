import { Mark } from "@tiptap/core";

const DatepickerMark = Mark.create({
  name: "datepickerTrigger",

  addAttributes() {
    return {
      date: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-datepicker-trigger]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      {
        ...HTMLAttributes,
        "data-datepicker-trigger": "", // Add a custom attribute
        style: "background-color: #f0f8ff; color: #333; cursor: pointer;", // Optional styling
      },
      0,
    ];
  },

  addCommands() {
    return {
      setDatepickerPlaceholder:
        () =>
        ({ chain }) => {
          return chain()
            .focus()
            .insertContent({
              type: "text",
              text: "Select a date", // Placeholder text
              marks: [
                {
                  type: "datepickerTrigger",
                  attrs: { date: null },
                },
              ],
            })
            .run();
        },
    };
  },
});

export default DatepickerMark;
