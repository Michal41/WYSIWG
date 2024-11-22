import { Mark } from "@tiptap/core";

const getPlaceholder = (type: string) => {
  if (type === "contractStartDate") {
    return `Select a Contract Start Date`;
  }
  if (type === "contractEndDate") {
    return `Select a Contract End Date`;
  }
  return `Select a Date`;
};

const DatepickerMark = Mark.create({
  name: "datepickerTrigger",

  addAttributes() {
    return {
      date: {
        default: null,
      },
      type: {
        default: "date",
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
        "data-datepicker-trigger": "",
        style: "background-color: #f0f8ff; color: #333; cursor: pointer;",
      },
      0,
    ];
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  addCommands() {
    return {
      setDatepickerPlaceholder:
        ({ type = "date" }: { type?: string } = {}) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        ({ chain }) => {
          return chain()
            .focus()
            .insertContent({
              type: "text",
              text: getPlaceholder(type),
              marks: [
                {
                  type: "datepickerTrigger",
                  attrs: { date: null, type },
                },
              ],
            })
            .run();
        },
    };
  },
});

export default DatepickerMark;
