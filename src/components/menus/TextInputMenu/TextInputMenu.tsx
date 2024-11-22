/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";
import { BubbleMenu as BaseBubbleMenu, useEditorState } from "@tiptap/react";
import { Surface } from "@/components/ui/Surface";
import { Metadata, MetadataTypes } from "@/components/BlockEditor/BlockEditor";

export const TextInputMenu = ({
  editor,
  metadataRef,
}: {
  editor: any;
  metadataRef: React.RefObject<Metadata>;
}): JSX.Element => {
  const { value } = useEditorState({
    editor,
    selector: (ctx) => {
      const attrs = ctx.editor.getAttributes("textInputTrigger");
      console.log("attrs", attrs);
      return { value: attrs.value };
    },
  });

  const shouldShow = useCallback(() => {
    const isActive = editor.isActive("textInputTrigger");
    return isActive;
  }, [editor]);

  const onChange = useCallback(
    (value: string) => {
      const attrs = editor.getAttributes("textInputTrigger");
      const currentType: MetadataTypes = attrs.type;

      editor
        .chain()
        .focus()
        .extendMarkRange("textInputTrigger")
        .setMark("textInputTrigger", { value })
        .insertContent({
          type: "text",
          text: value,
        })
        .run();
      if (metadataRef.current) {
        metadataRef.current[currentType] = value;
      }
    },
    [editor, metadataRef],
  );

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="textInputMenu"
      shouldShow={shouldShow}
    >
      <Surface>
        <div>
          <input
            type="text"
            className=""
            value={value || ""}
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
        </div>
      </Surface>
    </BaseBubbleMenu>
  );
};

export default TextInputMenu;
