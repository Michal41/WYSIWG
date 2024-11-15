/* eslint-disable @typescript-eslint/no-explicit-any */
import { diff } from "deep-diff";

export const getContentDiff = (oldDocument: any, newDocument: any): any => {
  const differences = diff(oldDocument, newDocument);
  if (!differences) {
    return newDocument;
  }

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

  function handleArrayModification(
    array: any[],
    index: number,
    difference: any,
  ) {
    if (difference.item.kind === "D") {
      const deletedNode = difference.item.lhs;
      array.splice(index, 1, {
        ...deletedNode,
        marks: [{ type: "deletion" }],
      });
    } else if (difference.item.kind === "N") {
      const newNode = difference.item.rhs;
      array.splice(index, 0, {
        ...newNode,
        marks: [{ type: "addition" }],
      });
    }
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
      { type: "text", text: uniqueNew, marks: [{ type: "addition" }] },
      { type: "text", text: suffix },
    ].filter((node) => node.text);

    array.splice(index, 1, ...updatedNodes);
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

  const modifiedContent = applyDifferences(oldDocument, differences as any[]);
  return modifiedContent;
};
