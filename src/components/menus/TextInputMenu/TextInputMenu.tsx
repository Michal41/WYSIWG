/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";
import { BubbleMenu as BaseBubbleMenu, useEditorState } from "@tiptap/react";
import { Surface } from "@/components/ui/Surface";
import { Metadata, MetadataTypes } from "@/components/BlockEditor/BlockEditor";
import TextInput from "./TextInput";
export const TextInputMenu = ({
  editor,
  metadataRef,
}: {
  editor: any;
  metadataRef: React.RefObject<Metadata>;
}): JSX.Element => {
  const { value, placeholder } = useEditorState({
    editor,
    selector: (ctx) => {
      const attrs = ctx.editor.getAttributes("textInputTrigger");
      return { value: attrs.value, placeholder: attrs.placeholder };
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
        <TextInput
          initialValue={value || ""}
          placeholder={placeholder || ""}
          onSubmit={onChange}
        />
      </Surface>
    </BaseBubbleMenu>
  );
};

export default TextInputMenu;
