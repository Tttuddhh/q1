import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Code2,
  Palette,
  Highlighter,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Smile,
} from 'lucide-react';
import { useCallback, useState, useEffect, useRef } from 'react';
import { useTranslation } from '../i18n';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  fontSize?: string;
}

const PRIMARY = 'var(--color-primary)';

const fontSizeMap: Record<string, string> = {
  small: '14px',
  medium: '16px',
  large: '18px',
  xlarge: '20px',
};

function ToolbarButton({
  active,
  onClick,
  children,
  title,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title: string;
}) {
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        borderRadius: 6,
        border: active ? '1px solid var(--color-primary)' : '1px solid transparent',
        background: active ? 'var(--color-primary)' : 'transparent',
        color: active ? '#ffffff' : '#6b7280',
        cursor: 'pointer',
        transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
        flexShrink: 0,
        boxShadow: active ? '0 1px 3px rgba(255, 106, 61, 0.3)' : 'none',
        transform: isPressed ? 'scale(0.85)' : 'scale(1)',
      }}
      onMouseEnter={e => {
        if (!active && !isPressed) {
          e.currentTarget.style.background = '#f3f4f6';
          e.currentTarget.style.transform = 'scale(1.1)';
        }
      }}
    >
      {children}
    </button>
  );
}

function ColorPickerButton({
  color,
  onChange,
  icon,
  title,
}: {
  color: string;
  onChange: (color: string) => void;
  icon: React.ReactNode;
  title: string;
}) {
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <label
      title={title}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        borderRadius: 6,
        border: 'none',
        background: 'transparent',
        color: '#6b7280',
        cursor: 'pointer',
        transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
        flexShrink: 0,
        position: 'relative',
        transform: isPressed ? 'scale(0.85)' : 'scale(1)',
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseEnter={e => {
        if (!isPressed) {
          e.currentTarget.style.background = '#f3f4f6';
          e.currentTarget.style.transform = 'scale(1.1)';
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.transform = 'scale(1)';
        setIsPressed(false);
      }}
    >
      {icon}
      <input
        type="color"
        value={color}
        onChange={e => onChange(e.target.value)}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          width: '100%',
          height: '100%',
          cursor: 'pointer',
        }}
      />
    </label>
  );
}

function getActiveFormats(editor: NonNullable<ReturnType<typeof useEditor>>) {
  if (!editor) return new Set<string>();

  const { selection } = editor.state;
  const active = new Set<string>();

  if (selection.empty) {
    return active;
  }

  const { from, to } = selection;

  editor.state.doc.nodesBetween(from, to, (node) => {
    if (node.isText && node.marks) {
      for (const mark of node.marks) {
        active.add(mark.type.name);
      }
    }

    const nodeName = node.type.name;
    if (nodeName === 'heading') {
      active.add(`heading-${node.attrs.level}`);
    } else if (nodeName === 'bulletList') {
      active.add('bulletList');
    } else if (nodeName === 'orderedList') {
      active.add('orderedList');
    } else if (nodeName === 'blockquote') {
      active.add('blockquote');
    } else if (nodeName === 'codeBlock') {
      active.add('codeBlock');
    }

    if (node.attrs?.textAlign) {
      active.add(`align-${node.attrs.textAlign}`);
    }
  });

  return active;
}

const EMOJIS = [
  '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
  '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
  '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸',
  '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️',
  '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡',
  '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓',
  '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄',
  '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵',
  '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠',
  '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽',
  '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀',
  '😿', '😾', '👍', '👎', '👏', '🙌', '🤝', '🙏', '💪', '❤️',
];

function EmojiPicker({
  onSelect,
  onClose,
}: {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        zIndex: 1000,
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        padding: 12,
        width: 280,
        maxHeight: 380,
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      className="emoji-picker-scroll"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 6,
        }}
      >
        {EMOJIS.map((emoji, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(emoji)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: 20,
              padding: 4,
              borderRadius: 6,
              transition: 'background 0.15s ease, transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              transform: 'scale(1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#f3f4f6';
              e.currentTarget.style.transform = 'scale(1.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}

export function RichTextEditor({ content, onChange, fontSize = 'medium' }: RichTextEditorProps) {
  const { t, language } = useTranslation();
  const [textColor, setTextColor] = useState('#1a1a1a');
  const [highlightColor, setHighlightColor] = useState('#fef08a');
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiButtonRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: t('editor.placeholder') }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      setActiveFormats(getActiveFormats(editor));
    },
    onSelectionUpdate: ({ editor }) => {
      setActiveFormats(getActiveFormats(editor));
    },
  }, [language]);

  useEffect(() => {
    if (editor) {
      setActiveFormats(getActiveFormats(editor));
    }
  }, [editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt(t('editor.link_prompt'), previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor, t]);

  const insertEmoji = useCallback((emoji: string) => {
    if (!editor) return;
    editor.chain().focus().insertContent(emoji).run();
    setShowEmojiPicker(false);
  }, [editor]);

  if (!editor) {
    return null;
  }

  const editorFontSize = fontSizeMap[fontSize] || fontSizeMap.medium;

  return (
    <div style={{ position: 'relative' }}>
      {/* Fixed toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          padding: '8px 0',
          marginBottom: 8,
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <ToolbarButton
          active={activeFormats.has('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title={t('editor.bold')}
        >
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton
          active={activeFormats.has('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title={t('editor.italic')}
        >
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton
          active={activeFormats.has('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title={t('editor.underline')}
        >
          <UnderlineIcon size={16} />
        </ToolbarButton>
        <ToolbarButton
          active={activeFormats.has('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title={t('editor.strike')}
        >
          <Strikethrough size={16} />
        </ToolbarButton>

        <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 4px' }} />

        <ToolbarButton
          active={activeFormats.has('heading-1')}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          title={t('editor.heading1')}
        >
          <Heading1 size={16} />
        </ToolbarButton>
        <ToolbarButton
          active={activeFormats.has('heading-2')}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title={t('editor.heading2')}
        >
          <Heading2 size={16} />
        </ToolbarButton>
        <ToolbarButton
          active={activeFormats.has('heading-3')}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          title={t('editor.heading3')}
        >
          <Heading3 size={16} />
        </ToolbarButton>

        <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 4px' }} />

        <ToolbarButton
          active={activeFormats.has('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title={t('editor.bullet_list')}
        >
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton
          active={activeFormats.has('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title={t('editor.ordered_list')}
        >
          <ListOrdered size={16} />
        </ToolbarButton>
        <ToolbarButton
          active={activeFormats.has('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title={t('editor.blockquote')}
        >
          <Quote size={16} />
        </ToolbarButton>
        <ToolbarButton
          active={activeFormats.has('code')}
          onClick={() => editor.chain().focus().toggleCode().run()}
          title={t('editor.code')}
        >
          <Code size={16} />
        </ToolbarButton>
        <ToolbarButton
          active={activeFormats.has('codeBlock')}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          title={t('editor.code_block')}
        >
          <Code2 size={16} />
        </ToolbarButton>

        <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 4px' }} />

        <ColorPickerButton
          color={textColor}
          onChange={color => {
            setTextColor(color);
            editor.chain().focus().setColor(color).run();
          }}
          icon={<Palette size={16} />}
          title={t('editor.text_color')}
        />
        <ColorPickerButton
          color={highlightColor}
          onChange={color => {
            setHighlightColor(color);
            editor.chain().focus().setHighlight({ color }).run();
          }}
          icon={<Highlighter size={16} />}
          title={t('editor.highlight')}
        />

        <ToolbarButton
          active={activeFormats.has('link')}
          onClick={setLink}
          title={t('editor.link')}
        >
          <LinkIcon size={16} />
        </ToolbarButton>

        <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 4px' }} />

        <div ref={emojiButtonRef} style={{ position: 'relative' }}>
          <ToolbarButton
            active={showEmojiPicker}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            title={t('editor.emoji') || '表情'}
          >
            <Smile size={16} />
          </ToolbarButton>
          {showEmojiPicker && (
            <EmojiPicker
              onSelect={insertEmoji}
              onClose={() => setShowEmojiPicker(false)}
            />
          )}
        </div>

        <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 4px' }} />

        <ToolbarButton
          active={activeFormats.has('align-left')}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          title={t('editor.align_left')}
        >
          <AlignLeft size={16} />
        </ToolbarButton>
        <ToolbarButton
          active={activeFormats.has('align-center')}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          title={t('editor.align_center')}
        >
          <AlignCenter size={16} />
        </ToolbarButton>
        <ToolbarButton
          active={activeFormats.has('align-right')}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          title={t('editor.align_right')}
        >
          <AlignRight size={16} />
        </ToolbarButton>
      </div>

      {/* Editor content */}
      <EditorContent
        editor={editor}
        style={{
          minHeight: 300,
          outline: 'none',
          border: 'none',
          boxShadow: 'none',
          fontSize: editorFontSize,
        }}
      />
    </div>
  );
}
