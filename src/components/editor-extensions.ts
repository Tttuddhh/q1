import { Node, mergeAttributes, Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import Paragraph from '@tiptap/extension-paragraph';

function isExternalVideoUrl(src: string): boolean {
  return src.startsWith('http://') || src.startsWith('https://');
}

export const Video = Node.create({
  name: 'video',
  group: 'block',
  selectable: true,
  draggable: true,
  atom: true,
  addAttributes() {
    return {
      src: { default: null },
      width: { default: '100%' },
      height: { default: '400' },
    };
  },
  parseHTML() {
    return [{ tag: 'div[data-video]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-video': '' }, HTMLAttributes), 0];
  },
  addNodeView() {
    return ({ node }) => {
      const src = node.attrs.src as string;
      const isExternal = isExternalVideoUrl(src);

      const dom = document.createElement('div');
      dom.setAttribute('data-video', '');
      dom.style.position = 'relative';
      dom.style.maxWidth = '100%';
      dom.style.background = '#f3f4f6';
      dom.style.borderRadius = '8px';
      dom.style.margin = '1em 0';

      if (isExternal) {
        dom.style.paddingBottom = '56.25%';
        dom.style.height = '0';
        dom.style.overflow = 'hidden';
        dom.style.maxHeight = '320px';
        dom.style.paddingBottom = 'min(56.25%, 320px)';

        const iframe = document.createElement('iframe');
        iframe.src = src;
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '8px';
        iframe.allowFullscreen = true;

        dom.appendChild(iframe);
      } else {
        dom.style.height = 'auto';
        dom.style.overflow = 'visible';

        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.style.width = '100%';
        video.style.height = 'auto';
        video.style.maxHeight = '320px';
        video.style.borderRadius = '8px';
        video.style.display = 'block';
        video.setAttribute('data-gapcursor', '');

        dom.appendChild(video);
      }

      return { dom };
    };
  },
});

export const FileNode = Node.create({
  name: 'fileNode',
  group: 'block',
  selectable: true,
  draggable: true,
  atom: true,
  addAttributes() {
    return {
      name: { default: '' },
      size: { default: 0 },
      type: { default: '' },
      data: { default: '' },
    };
  },
  parseHTML() {
    return [{ tag: 'div[data-file-node]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-file-node': '' }, HTMLAttributes), 0];
  },
  addNodeView() {
    return ({ node }) => {
      const dom = document.createElement('div');
      dom.setAttribute('data-file-node', '');
      dom.style.display = 'flex';
      dom.style.alignItems = 'center';
      dom.style.gap = '12px';
      dom.style.padding = '8px 12px';
      dom.style.background = '#f9fafb';
      dom.style.border = '1px solid #e5e7eb';
      dom.style.borderRadius = '8px';
      dom.style.cursor = 'pointer';
      dom.style.margin = '1em 0';
      dom.style.transition = 'background 0.15s ease';

      const name = node.attrs.name as string;
      const size = node.attrs.size as number;
      const data = node.attrs.data as string;

      const icon = document.createElement('div');
      icon.innerHTML = '📎';
      icon.style.fontSize = '20px';
      icon.style.flexShrink = '0';

      const info = document.createElement('div');
      info.style.flex = '1';
      info.style.minWidth = '0';

      const nameEl = document.createElement('div');
      nameEl.textContent = name;
      nameEl.style.fontSize = '14px';
      nameEl.style.fontWeight = '500';
      nameEl.style.color = '#374151';
      nameEl.style.overflow = 'hidden';
      nameEl.style.textOverflow = 'ellipsis';
      nameEl.style.whiteSpace = 'nowrap';

      const sizeEl = document.createElement('div');
      sizeEl.textContent = formatFileSize(size);
      sizeEl.style.fontSize = '12px';
      sizeEl.style.color = '#9ca3af';
      sizeEl.style.marginTop = '2px';

      info.appendChild(nameEl);
      info.appendChild(sizeEl);

      dom.appendChild(icon);
      dom.appendChild(info);

      dom.addEventListener('click', () => {
        // Trigger custom event to open security confirm dialog
        const event = new CustomEvent('file-download-request', {
          detail: {
            url: data,
            filename: name
          }
        });
        window.dispatchEvent(event);
      });

      dom.addEventListener('mouseenter', () => {
        dom.style.background = '#f3f4f6';
      });
      dom.addEventListener('mouseleave', () => {
        dom.style.background = '#f9fafb';
      });

      return { dom };
    };
  },
});

export const DivNode = Node.create({
  name: 'divNode',
  group: 'block',
  content: 'block+',
  defining: true,
  addAttributes() {
    return {
      class: { default: null },
    };
  },
  parseHTML() {
    return [
      { tag: 'div[class]' },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes), 0];
  },
});

/**
 * 扩展默认的 Paragraph 节点，添加 class 属性支持
 * 这是修复新输入段落间距问题的关键：必须让 ProseMirror 知道 class 属性的存在
 */
export const ParagraphWithClass = Paragraph.extend({
  addAttributes() {
    return {
      class: {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute('class'),
        renderHTML: (attributes: { class?: string | null }) => {
          if (!attributes.class) return {};
          return { class: attributes.class };
        },
      },
    };
  },
});

/**
 * ProseMirror 插件：自动给文档中所有**已存在**的段落添加 'existing-paragraph' class
 * - 只在编辑器初始内容加载时执行一次（使用闭包变量标记）
 * - 之后用户新增的段落不会有这个 class
 * - CSS 通过 :not(.existing-paragraph) 来区分新段落，给予不同的 margin-bottom
 * 使用标准的 appendTransaction 机制，避免在 transaction 监听器中执行链式命令的冲突
 */
export const NewParagraphExtension = Extension.create({
  name: 'newParagraph',

  addProseMirrorPlugins() {
    // 闭包变量：标记是否已经处理过初始内容
    // 每次编辑器创建时都会重置，所以重新创建编辑器时会重新标记
    let isInitialized = false;

    return [
      new Plugin({
        key: new PluginKey('newParagraph'),
        appendTransaction: (transactions, _oldState, newState) => {
          // 只在初始加载时执行一次
          if (isInitialized) return null;

          const docChanged = transactions.some((tr) => tr.docChanged);
          if (!docChanged) return null;

          // 标记为已初始化，后续不再处理
          isInitialized = true;

          // 给所有已存在的段落添加 existing-paragraph class
          const tr = newState.tr;
          let modified = false;

          newState.doc.descendants((node, pos) => {
            if (node.type.name === 'paragraph' && node.attrs.class !== 'existing-paragraph') {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                class: 'existing-paragraph',
              });
              modified = true;
            }
          });

          return modified ? tr : null;
        },
      }),
    ];
  },
});

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
