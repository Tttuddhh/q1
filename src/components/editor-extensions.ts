import { Node, mergeAttributes, Extension } from '@tiptap/core';

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

export const NewParagraphExtension = Extension.create({
  name: 'newParagraph',
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const { state } = editor;
        const { selection } = state;
        const { $from } = selection;
        
        // 获取当前段落
        const currentNode = $from.node($from.depth);
        
        // 检查当前段落是否已经有 new-paragraph 类
        const hasNewParagraphClass = currentNode.attrs.class?.includes('new-paragraph');
        
        // 使用链式命令：先执行 splitBlock，然后更新新段落的属性
        // 这样可以确保在同一个事务中完成，避免事务不同步的问题
        const result = editor.chain()
          .splitBlock()
          .updateAttributes('paragraph', { class: 'new-paragraph' })
          .run();
        
        return result;
      },
    };
  },
});

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
