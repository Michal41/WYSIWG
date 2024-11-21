/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";
import { BubbleMenu as BaseBubbleMenu, useEditorState } from "@tiptap/react";
import { Surface } from "@/components/ui/Surface";

export const DatepickerMenu = ({
  editor,
}: {
  editor: any;
}): JSX.Element => {
  const { date } = useEditorState({
    editor,
    selector: (ctx) => {
      const attrs = ctx.editor.getAttributes("datepickerTrigger");
      return { date: attrs.date };
    },
  });

  const shouldShow = useCallback(() => {
    const isActive = editor.isActive("datepickerTrigger");
    return isActive;
  }, [editor]);

  const onSetDate = useCallback(
    (selectedDate: string) => {
      editor
        .chain()
        .focus()
        .extendMarkRange("datepickerTrigger")
        .setMark("datepickerTrigger", { date: selectedDate })
        .run();
    },
    [editor],
  );

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="datepickerMenu"
      shouldShow={shouldShow}
    >
      <Surface>
        <div>
          <input
            type="date"
            value={date || ""}
            onChange={(e) => onSetDate(e.target.value)}
          />
        </div>
      </Surface>
    </BaseBubbleMenu>
  );
};

export default DatepickerMenu;
