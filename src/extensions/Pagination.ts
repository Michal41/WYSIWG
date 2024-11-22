import { Attribute, Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Node } from 'prosemirror-model';

export interface PaginationOptions {
  pageHeight: number;
  pageWidth: number;
  pageMargin: number;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    pagination: {
      /**
       * Set pagination options
       */
      setPaginationOptions: (options: Partial<PaginationOptions>) => ReturnType;
    };
  }
}

export const Pagination = Extension.create<PaginationOptions>({
  name: 'pagination',

  addOptions() {
    return {
      pageHeight: 1056,
      pageWidth: 816,
      pageMargin: 96,
    };
  },

  addCommands() {
    return {
      setPaginationOptions:
        (options: Partial<PaginationOptions>) =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            tr.setMeta('paginationOptions', options);
          }
          return true;
        },
    };
  },

  addProseMirrorPlugins() {
    const pluginKey = new PluginKey('pagination');

    return [
      new Plugin({
        key: pluginKey,
        state: {
          init: () => ({ ...this.options }),
          apply: (tr, value) => {
            const newOptions = tr.getMeta('paginationOptions');
            if (newOptions) {
              return { ...value, ...newOptions };
            }
            return value;
          },
        },
        props: {
          decorations: (state) => {
            const { doc } = state;
            const decorations: Decoration[] = [];
            let currentHeight = 0;

            const options = pluginKey.getState(state);

            doc.descendants((node: Node, pos: number) => {
              const { pageHeight, pageMargin } = options;

              console.log(this.editor.view.nodeDOM(pos), 'editor');

              let nodeHeight = 0;
              
              const nodeDOM = this.editor.view.nodeDOM(pos) as HTMLElement | null;
              if (node.isBlock && nodeDOM) {
                const computedStyle = window.getComputedStyle(nodeDOM);
                const marginHeight =
                  parseFloat(computedStyle.marginTop) +
                  parseFloat(computedStyle.marginBottom);
                  nodeHeight = nodeDOM.getBoundingClientRect().height + marginHeight;
                // Use nodeHeight in the pagination logic
              }

              // const nodeHeight = node.isBlock
              //   ? (this.editor.view.nodeDOM(pos) as HTMLElement)?.offsetHeight
              //   : 0;

              if (currentHeight + nodeHeight > pageHeight - 2 * pageMargin) {
                decorations.push(
                  Decoration.widget(pos, () => {
                    const pageBreak = document.createElement('div');
                    pageBreak.className = 'page-break';
                    pageBreak.style.height = '20px';
                    pageBreak.style.width = '100%';
                    pageBreak.style.borderTop = '2px dashed black';
                    pageBreak.style.marginTop = '10px';
                    pageBreak.style.marginBottom = '10px';
                    return pageBreak;
                  })
                );
                currentHeight = 0;
              }

              currentHeight += nodeHeight;
            });

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },

  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          class: {
            default: null,
            parseHTML: (element: HTMLElement) => element.getAttribute('class'),
            renderHTML: (attributes: Record<string, any>) => {
              if (!attributes.class) {
                return {};
              }
              return { class: attributes.class };
            },
          } as Attribute,
        },
      },
    ];
  },
});