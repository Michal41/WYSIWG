/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEditor } from "@tiptap/react";
import type { AnyExtension, Editor } from "@tiptap/core";
import { ExtensionKit } from "@/extensions/extension-kit";
import { initialContent } from "@/data/initialContent";
import { diff } from "deep-diff";
import { second } from "@/data/second";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

const differences = diff(initialContent, second);

function resolvePath(content: any, path: (string | number)[]) {
  return path.reduce((node, key, index) => {
    if (!node) {
      console.error(`resolvePath failed at ${key} (index: ${index})`, path);
      return null;
    }

    if (Array.isArray(node)) {
      if (typeof key !== "number" || key < 0 || key >= node.length) {
        console.error(`Invalid index ${key} for array at path:`, path);
        return null;
      }
      return node[key];
    }

    if (key === "content" && node[key] && Array.isArray(node[key])) {
      return node[key];
    }

    return node[key] || null;
  }, content);
}

function applyDifferences(content: any, differences: any[]) {
  differences.forEach((difference) => {
    if (difference.kind === "E") {
      const path = difference.path;
      const parent = resolvePath(content, path.slice(0, -2));
      const index = path[path.length - 2];

      if (Array.isArray(parent)) {
        const originalNode = parent[index];
        if (originalNode?.type === "text") {
          splitAndReplaceText(parent, index, difference.lhs, difference.rhs);
        }
      } else if (parent && Array.isArray(parent.content)) {
        const originalNode = parent.content[index];
        if (originalNode?.type === "text") {
          splitAndReplaceText(
            parent.content,
            index,
            difference.lhs,
            difference.rhs,
          );
        }
      } else {
        console.error("Parent is invalid or does not contain content:", parent);
      }
    } else if (difference.kind === "A") {
      const path = difference.path;
      const parent = resolvePath(content, path.slice(0, -1));
      const index = difference.index;

      if (Array.isArray(parent)) {
        handleArrayModification(parent, index, difference);
      } else if (parent && Array.isArray(parent.content)) {
        handleArrayModification(parent.content, index, difference);
      } else {
        console.error(
          "Parent is invalid or does not contain an array:",
          parent,
        );
      }
    }
  });
  return content;
}

function handleArrayModification(array: any[], index: number, difference: any) {
  if (difference.item.kind === "D") {
    const deletedNode = difference.item.lhs;
    array.splice(index, 1, {
      ...deletedNode,
      marks: [{ type: "deletion" }],
    });
  } else if (difference.item.kind === "N") {
    const newNode = difference.item.rhs;
    array.splice(index, 0, newNode);
  }
}

function getCommonPrefixLength(str1: string, str2: string): number {
  let i = 0;
  while (i < str1.length && i < str2.length && str1[i] === str2[i]) {
    i++;
  }
  return i;
}

function getCommonSuffixLength(str1: string, str2: string): number {
  let i = 0;
  while (
    i < str1.length &&
    i < str2.length &&
    str1[str1.length - 1 - i] === str2[str2.length - 1 - i]
  ) {
    i++;
  }
  return i;
}

function splitAndReplaceText(
  array: any[],
  index: number,
  deletedText: string,
  newText: string,
) {
  const commonPrefixLength = getCommonPrefixLength(deletedText, newText);
  const commonSuffixLength = getCommonSuffixLength(deletedText, newText);

  const prefix = deletedText.slice(0, commonPrefixLength);
  const suffix = deletedText.slice(deletedText.length - commonSuffixLength);
  const uniqueDeleted = deletedText.slice(
    commonPrefixLength,
    deletedText.length - commonSuffixLength,
  );
  const uniqueNew = newText.slice(
    commonPrefixLength,
    newText.length - commonSuffixLength,
  );

  const updatedNodes = [
    { type: "text", text: prefix },
    { type: "text", text: uniqueDeleted, marks: [{ type: "deletion" }] },
    { type: "text", text: uniqueNew },
    { type: "text", text: suffix },
  ].filter((node) => node.text);

  array.splice(index, 1, ...updatedNodes);
}

const modifiedContent = applyDifferences(initialContent, differences as any[]);

export const useBlockEditor = () => {
  const editor = useEditor(
    {
      immediatelyRender: false,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      onCreate: (ctx) => {
        if (ctx.editor.isEmpty) {
          ctx.editor.commands.setContent(modifiedContent);
          ctx.editor.commands.focus("start", { scrollIntoView: true });
        }
      },
      extensions: [...ExtensionKit()] as AnyExtension[],
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          class: "min-h-full",
        },
      },
    },
    [],
  );

  // window.editor = editor;

  return { editor };
};
