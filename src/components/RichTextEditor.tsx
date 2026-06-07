import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import Placeholder from '@tiptap/extension-placeholder';
import { Node, mergeAttributes } from '@tiptap/core';
import { CellSelection, TableMap } from '@tiptap/pm/tables';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  TextStrikethroughIcon,
  Heading01Icon,
  Heading02Icon,
  Heading03Icon,
  LeftToRightListBulletIcon,
  LeftToRightListNumberIcon,
  QuoteUpIcon,
  CodeIcon,
  CodeSquareIcon,
  ColorsIcon,
  HighlighterIcon,
  Link01Icon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  SmileIcon,
  UploadIcon,
  ArrowRight01Icon,
  Image01Icon,
  Video01Icon,
  File01Icon,
  TableIcon,
  Cancel01Icon,
  Add01Icon,
  Remove01Icon,
  JoinRoundIcon,
  ScissorIcon,
} from '@hugeicons/core-free-icons';
import { useCallback, useState, useEffect, useRef, useMemo, memo } from 'react';
import { useTranslation } from '../i18n';
import { fonts, type FontItem } from '../data/fonts';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  fontSize?: string;
  fontFamily?: string;
  onFontFamilyChange?: (family: string) => void;
}

const fontSizeMap: Record<string, string> = {
  small: '14px',
  medium: '16px',
  large: '18px',
  xlarge: '20px',
};

const RECENT_EMOJIS_KEY = 'kb-recent-emojis';
const FAVORITE_EMOJIS_KEY = 'kb-favorite-emojis';
const MAX_RECENT_EMOJIS = 30;
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const MAX_UPLOAD_FILES = 5;

type EmojiTab = 'default' | 'recent' | 'favorites' | 'kaomoji';

type DialogType = 'image' | 'video' | 'file' | null;

interface UploadFileItem {
  id: string;
  file: File;
  preview?: string;
}

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 7) return `${days}天前`;
  return date.toLocaleDateString('zh-CN');
}

/* ========== Custom Video Extension for TipTap ========== */
const Video = Node.create({
  name: 'video',
  group: 'block',
  atom: true,
  draggable: true,
  addAttributes() {
    return {
      src: { default: null },
      controls: { default: true },
      width: { default: '100%' },
      style: { default: 'max-width: 100%; border-radius: 8px;' },
    };
  },
  parseHTML() {
    return [{ tag: 'video' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['video', mergeAttributes(HTMLAttributes, { controls: 'true' })];
  },
});

/* ========== Custom File Card Extension for TipTap ========== */
const FileCard = Node.create({
  name: 'fileCard',
  group: 'block',
  atom: true,
  draggable: true,
  addAttributes() {
    return {
      href: { default: null },
      filename: { default: '未命名文件' },
      size: { default: '' },
      time: { default: '' },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-file-card]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    const { href, filename, size, time } = HTMLAttributes;
    return [
      'div',
      {
        'data-file-card': 'true',
        style:
          'display: flex; align-items: center; gap: 12px; padding: 12px 16px; border: 1px solid #e5e7eb; border-radius: 10px; background: #ffffff; max-width: 420px; margin: 8px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.04); transition: box-shadow 0.2s ease, border-color 0.2s ease; cursor: pointer;',
        onmouseenter:
          "this.style.boxShadow='0 4px 12px rgba(0,0,0,0.08)';this.style.borderColor='#d1d5db';",
        onmouseleave:
          "this.style.boxShadow='0 1px 3px rgba(0,0,0,0.04)';this.style.borderColor='#e5e7eb';",
      },
      [
        'div',
        {
          style:
            'width: 44px; height: 44px; border-radius: 10px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); display: flex; align-items: center; justify-content: center; flex-shrink: 0;',
        },
        [
          'span',
          { style: 'font-size: 22px;' },
          '📁',
        ],
      ],
      [
        'div',
        { style: 'flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px;' },
        [
          'div',
          {
            style:
              'font-size: 14px; font-weight: 500; color: #1a1a1a; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;',
          },
          filename,
        ],
        [
          'div',
          { style: 'font-size: 12px; color: #9ca3af; display: flex; gap: 8px;' },
          size,
          time ? `· ${time}` : '',
        ],
      ],
      [
        'a',
        {
          href,
          download: filename,
          target: '_blank',
          style:
            'width: 32px; height: 32px; border-radius: 8px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; flex-shrink: 0; text-decoration: none; transition: background 0.15s ease;',
          onmouseenter: "this.style.background='#e5e7eb';",
          onmouseleave: "this.style.background='#f3f4f6';",
        },
        ['span', { style: 'font-size: 16px;' }, '⬇️'],
      ],
    ];
  },
});

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
        transition: 'background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease',
        flexShrink: 0,
        boxShadow: active ? '0 1px 3px color-mix(in srgb, var(--color-primary) 30%, transparent)' : 'none',
      }}
      onMouseEnter={e => {
        if (!active && !isPressed) {
          e.currentTarget.style.background = '#f3f4f6';
        }
      }}
      onMouseLeave={e => {
        setIsPressed(false);
        if (!active) {
          e.currentTarget.style.background = 'transparent';
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
        transition: 'background-color 0.15s ease',
        flexShrink: 0,
        position: 'relative',
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseEnter={e => {
        if (!isPressed) {
          e.currentTarget.style.background = '#f3f4f6';
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
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

interface EmojiCategory {
  label: string;
  emojis: string[];
}

const EMOJI_CATEGORIES: EmojiCategory[] = [
  {
    label: '小黄脸',
    emojis: [
      // 开心/笑脸
      '😀', '😃', '😄', '😁', '😆', '🤣', '😂', '🙂', '😊', '😇',
      // 甜蜜/亲吻
      '😍', '🥰', '😘', '😗', '😙', '😚', '😋',
      // 调皮/眨眼
      '😉', '😛', '😝', '😜', '🤪', '🙃',
      // 得意/酷
      '😎', '🤓', '🧐', '🤠', '🥳', '🤩',
      // 思考/平静
      '🤔', '🤗', '🤐', '😌', '😏', '😒',
      // 难过/伤心
      '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩',
      '😢', '😭', '😥', '😓',
      // 生气/愤怒
      '😤', '😠', '😡', '🤬',
      // 惊讶/害怕
      '😳', '😱', '😨', '😰', '😯', '😦', '😧', '😮', '😲', '😵', '🤯',
      // 疲惫/睡觉
      '😴', '😪', '🥱',
      // 生病/不舒服
      '😷', '🤒', '🤕', '🤢', '🤧', '🤮',
      // 其他表情
      '😶', '😐', '😑', '😬', '🙄', '😈', '😇', '🤡', '🤑', '🤓'
    ]
  },
  {
    label: '其他',
    emojis: [
      '😈', '👿', '👹', '👺', '💩', '👻', '💀', '☠️', '👽', '👾',
      '🎃', '🤖', '👹', '👺'
    ]
  },
  {
    label: '手势',
    emojis: [
      '👍', '👎', '👏', '🙌', '🙏', '💪', '👌', '👊', '✊', '✌️',
      '👈', '👉', '👆', '👇', '☝️', '👋', '🖐️', '✋', '🖖', '👐',
      '✍️', '💅', '👂', '👃', '👀', '👁️', '👅', '👄', '💋'
    ]
  },
  {
    label: '动物',
    emojis: [
      '🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨', '🐯', '🐮',
      '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🐺', '🐗', '🐴',
      '🐝', '🐛', '🐌', '🐞', '🐜', '🕷️', '🕸️', '🐢', '🐍', '🐙',
      '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🐊', '🐅', '🐆', '🐘',
      '🐪', '🐫', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🐐',
      '🐕', '🐩', '🐈', '🐈‍⬛', '🐓', '🕊️', '🐇', '🐁', '🐀', '🐿️',
      '🐾', '🐣', '🐥', '🐲', '🐉', '🐚'
    ]
  },
  {
    label: '植物',
    emojis: [
      '🌸', '💮', '🌹', '🌺', '🌻', '🌼', '🌷', '🌱', '🌲', '🌳',
      '🌴', '🌵', '🌾', '🌿', '☘️', '🍀', '🍁', '🍂', '🍃', '🍄'
    ]
  },
  {
    label: '食物',
    emojis: [
      '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈',
      '🍒', '🍑', '🍍', '🍅', '🍆', '🌶️', '🌽', '🍠', '🍞', '🍳',
      '🍗', '🍖', '🌭', '🍔', '🍟', '🍕', '🌮', '🌯', '🍝', '🍜',
      '🍲', '🍛', '🍣', '🍱', '🍤', '🍙', '🍚', '🍘', '🍥', '🍢',
      '🍡', '🍧', '🍨', '🍦', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫',
      '🍿', '🍩', '🍪', '🌰', '🍯', '🍼', '☕', '🍵', '🍶', '🍺',
      '🍻', '🍷', '🍸', '🍹', '🍾', '🍴', '🍽️'
    ]
  },
  {
    label: '运动',
    emojis: [
      '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸',
      '🏒', '🏑', '🏏', '⛳', '🏹', '🎣', '🎽', '🛹', '🛷', '⛸️',
      '🎿', '⛷️', '🏂', '🏋️', '🌊', '🏄', '🏊', '🚣', '🚵', '🚴',
      '🏆', '🏅', '🎖️', '🏵️', '🎗️', '🎫', '🎟️'
    ]
  },
  {
    label: '娱乐',
    emojis: [
      '🎪', '🎭', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🎷', '🎺',
      '🎸', '🎻', '🎲', '♟️', '🎯', '🎳', '🎮', '🎰', '💎', '🔮',
      '💈', '🎁', '🎀', '🎊', '🎉', '🎈', '🎎', '🎏', '🎐', '🎑',
      '🛍️', '🛒'
    ]
  },
  {
    label: '物品',
    emojis: [
      '👓', '🕶️', '👔', '👕', '👖', '👗', '👘', '👙', '👚', '👛',
      '👜', '👝', '🎒', '👞', '👟', '👠', '👡', '👢', '👑', '👒',
      '🎩', '🎓', '⛑️', '📿', '💄', '💍', '🔇', '🔈', '🔉', '🔊',
      '📢', '📣', '📯', '🔔', '🔕', '🎵', '🎶', '🎙️', '🎚️', '🎛️',
      '📻', '📱', '📲', '☎️', '📞', '📟', '📠', '🔋', '🔌', '💻',
      '🖥️', '🖨️', '🖱️', '🖲️', '💽', '💾', '💿', '📀', '🎥', '🎞️',
      '📽️', '📺', '📷', '📸', '📹', '📼', '🔍', '🔎', '🕯️', '💡',
      '🔦', '🏮', '📔', '📕', '📖', '📗', '📘', '📙', '📚', '📓',
      '📒', '📃', '📜', '📄', '📰', '🗞️', '📑', '🔖', '🏷️', '💰',
      '💴', '💵', '💶', '💷', '💸', '💳', '💹', '✉️', '📧', '📨',
      '📩', '📤', '📥', '📦', '📫', '📪', '📬', '📭', '📮', '🗳️',
      '✏️', '✒️', '🖋️', '🖊️', '🖌️', '🖍️', '📝', '💼', '📁', '📂',
      '🗂️', '📅', '📆', '🗒️', '🗓️', '📇', '📈', '📉', '📊', '📋',
      '📌', '📍', '📎', '🖇️', '📏', '📐', '✂️', '🗃️', '🗄️', '🗑️',
      '🔒', '🔓', '🔏', '🔐', '🔑', '🗝️', '🔨', '⛏️', '⚒️', '🛠️',
      '🗡️', '⚔️', '🔫', '🛡️', '🔧', '🔩', '⚙️', '🗜️', '⚖️', '🔗',
      '⛓️', '⚗️', '🔬', '🔭', '📡', '💉', '💊', '🌡️', '🚽', '🚰',
      '🚿', '🛁', '🛀', '🚬', '⚰️', '⚱️', '🗿'
    ]
  },
  {
    label: '自然',
    emojis: [
      '🌍', '🌎', '🌏', '🌐', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖',
      '🌗', '🌘', '🌙', '🌚', '🌛', '🌜', '☀️', '🌝', '🌞', '🌟',
      '🌠', '☁️', '⛅', '⛈️', '🌤️', '🌥️', '🌦️', '🌧️', '🌨️', '❄️',
      '☃️', '⛄', '🌬️', '💨', '🌪️', '🌫️', '🌈', '☔', '💧', '💦',
      '☄️', '🔥', '💥'
    ]
  },
  {
    label: '交通',
    emojis: [
      '🏇', '🏌️', '⛹️', '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓',
      '🚑', '🚒', '🚐', '🚚', '🚛', '🚜', '🛴', '🚲', '🛵', '🏍️',
      '🚨', '🚔', '🚍', '🚘', '🚖', '🚡', '🚠', '🚟', '🚃', '🚋',
      '🚞', '🚝', '🚄', '🚅', '🚈', '🚂', '🚆', '🚇', '🚊', '🚉',
      '✈️', '🛫', '🛬', '🛩️', '💺', '🛰️', '🚀', '🛸', '🚁', '🛶',
      '⛵', '🚤', '🛥️', '🛳️', '⛴️', '🚢', '⚓', '⛽', '🚧', '🚦',
      '🚥', '🚏', '🗺️', '🗽', '🗼', '🏰', '🏯', '🏟️', '🎡', '🎢',
      '🎠', '⛲', '⛱️', '🏖️', '🏝️', '🏜️', '🌋', '⛰️', '🏔️', '🗻',
      '🏕️', '⛺', '🏠', '🏡', '🏘️', '🏚️', '🏗️', '🏭', '🏢', '🏬',
      '🏣', '🏤', '🏥', '🏦', '🏨', '🏪', '🏫', '🏩', '💒', '🏛️',
      '⛪', '🕌', '🕍', '🛕', '🕋', '⛩️', '🛤️', '🛣️', '🗾', '🏞️',
      '🌅', '🌄', '🎇', '🎆', '🌇', '🌆', '🏙️', '🌃', '🌌', '🌉',
      '🌁'
    ]
  },
  {
    label: '知识库',
    emojis: [
      '📚', '📖', '📑', '📋', '📌', '📍', '📎', '📏', '📐', '✂️',
      '🗃️', '🗄️', '🗑️', '🔒', '🔓', '🔏', '🔐', '🔑', '🗝️', '🔨',
      '⛏️', '⚒️', '🛠️', '🗡️', '⚔️', '🔫', '🛡️', '🔧', '🔩', '⚙️',
      '🗜️', '⚖️', '🔗', '⛓️', '⚗️', '🔬', '🔭', '📡', '💉', '💊',
      '🌡️', '🚽', '🚰', '🚿', '🛁', '🛀', '🚬', '⚰️', '⚱️', '🗿'
    ]
  },
  {
    label: '时间',
    emojis: [
      '🕰️', '🕛', '🕧', '🕐', '🕜', '🕑', '🕝', '🕒', '🕞', '🕓',
      '🕟', '🕔', '🕠', '🕕', '🕡', '🕖', '🕢', '🕗', '🕣', '🕘',
      '🕤', '🕙', '🕥', '🕚', '🕦'
    ]
  },
  {
    label: '符号',
    emojis: [
      '❇️', '✨', '💌', '💘', '💝', '💖', '💗', '💓', '💞', '💕',
      '💟', '❣️', '💔', '💛', '💚', '💙', '💜', '🖤', '💯', '💢',
      '💬', '🗨️', '🗯️', '💭', '💤', '💐', '🏳️', '🏴', '🏁', '🚩',
      '🏳️‍🌈', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐',
      '♑', '♒', '♓', '⛎', '🔀', '🔁', '🔂', '🔼', '🔽', '🎦',
      '🔅', '🔆', '📶', '📳', '📴', '♀️', '♂️', '⚧️', '✖️', '➕',
      '➖', '➗', '♾️', '❓', '❔', '❕', '❗', '💱', '💲', '⚕️',
      '♻️', '⚜️', '🔱', '📛', '🔰', '✅', '☑️', '✔️', '❌', '❎',
      '➰', '➿', '✳️', '✴️', '🔟', '🔠', '🔡', '🔢', '🔣', '🔤',
      '🅰️', '🆎', '🅱️', '🆑', '🆒', '🆓', '🆔', '🆕', '🆖', '🅾️',
      '🆗', '🅿️', '🆘', '🆙', '🆚', '🈁', '🈂️', '🈷️', '🈶', '🈯',
      '🉐', '🈹', '🈚', '🈲', '🉑', '🈸', '🈴', '🈳', '🈺', '🈵',
      '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '🟤', '⚫', '⚪', '🟥',
      '🟧', '🟨', '🟩', '🟦', '🟪', '🟫', '🔶', '🔷', '🔸', '🔹',
      '🔺', '🔻', '💠', '🔘', '🔳', '🔲', '🛋️', '🛏️', '🛌', '🚪'
    ]
  }
];

const KAOMOJIS = [
  '(｡♥‿♥｡)', '(╯°□°）╯︵ ┻━┻', '(ಥ﹏ಥ)', '(◕‿◕)', '¯\\_(ツ)_/¯',
  '( ͡° ͜ʖ ͡°)', 'ಠ_ಠ', '(◉_◉)', '(✿◠‿◠)', '(¬‿¬)',
  '(≧◡≦)', '(◕ᴗ◕✿)', '(✧ω✧)', '(◠‿◠)', '(｡◕‿◕｡)',
  '(◠‿◠✿)', '(✯◡✯)', '(◍•ᴗ•◍)', '(✿♥‿♥)', '(◕‿◕✿)',
  '(✧∀✧)'
];

function loadRecentEmojis(): string[] {
  try {
    const stored = localStorage.getItem(RECENT_EMOJIS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}

function saveRecentEmojis(emojis: string[]) {
  try {
    localStorage.setItem(RECENT_EMOJIS_KEY, JSON.stringify(emojis.slice(0, MAX_RECENT_EMOJIS)));
  } catch {
    // ignore
  }
}

function loadFavoriteEmojis(): string[] {
  try {
    const stored = localStorage.getItem(FAVORITE_EMOJIS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}

function saveFavoriteEmojis(emojis: string[]) {
  try {
    localStorage.setItem(FAVORITE_EMOJIS_KEY, JSON.stringify(emojis));
  } catch {
    // ignore
  }
}

function isLoggedIn(): boolean {
  try {
    const token = localStorage.getItem('kb-auth-token');
    return !!token;
  } catch {
    return false;
  }
}

async function syncFavoritesToCloud(favorites: string[]) {
  try {
    const response = await fetch('/api/sync-favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('kb-auth-token') || ''}`,
      },
      body: JSON.stringify({ favorites }),
    });
    if (!response.ok) throw new Error('Sync failed');
    return await response.json();
  } catch {
    // ignore
  }
}

async function fetchFavoritesFromCloud(): Promise<string[] | null> {
  try {
    const response = await fetch('/api/favorites', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('kb-auth-token') || ''}`,
      },
    });
    if (!response.ok) throw new Error('Fetch failed');
    const data = await response.json();
    return data.favorites || null;
  } catch {
    return null;
  }
}

function useRecentEmojis() {
  const [recentEmojis, setRecentEmojis] = useState<string[]>(loadRecentEmojis);

  const addRecentEmoji = useCallback((emoji: string) => {
    setRecentEmojis(prev => {
      const filtered = prev.filter(e => e !== emoji);
      const next = [emoji, ...filtered].slice(0, MAX_RECENT_EMOJIS);
      saveRecentEmojis(next);
      return next;
    });
  }, []);

  return { recentEmojis, addRecentEmoji };
}

function useFavoriteEmojis() {
  const [favoriteEmojis, setFavoriteEmojis] = useState<string[]>(loadFavoriteEmojis);

  useEffect(() => {
    if (isLoggedIn()) {
      fetchFavoritesFromCloud().then(cloudFavorites => {
        if (cloudFavorites) {
          setFavoriteEmojis(cloudFavorites);
          saveFavoriteEmojis(cloudFavorites);
        }
      });
    }
  }, []);

  const addFavoriteEmoji = useCallback((emoji: string) => {
    setFavoriteEmojis(prev => {
      if (prev.includes(emoji)) return prev;
      const next = [...prev, emoji];
      saveFavoriteEmojis(next);
      if (isLoggedIn()) {
        syncFavoritesToCloud(next);
      }
      return next;
    });
  }, []);

  const removeFavoriteEmoji = useCallback((emoji: string) => {
    setFavoriteEmojis(prev => {
      const next = prev.filter(e => e !== emoji);
      saveFavoriteEmojis(next);
      if (isLoggedIn()) {
        syncFavoritesToCloud(next);
      }
      return next;
    });
  }, []);

  return { favoriteEmojis, addFavoriteEmoji, removeFavoriteEmoji };
}

function EmojiPicker({
  onSelect,
  onClose,
}: {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<EmojiTab>('default');
  const { recentEmojis, addRecentEmoji } = useRecentEmojis();
  const { favoriteEmojis, addFavoriteEmoji, removeFavoriteEmoji } = useFavoriteEmojis();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as unknown as globalThis.Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleSelect = useCallback((emoji: string) => {
    addRecentEmoji(emoji);
    onSelect(emoji);
  }, [addRecentEmoji, onSelect]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      alert('图片大小不能超过 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = event => {
      const base64 = event.target?.result as string;
      if (base64) {
        addFavoriteEmoji(base64);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }, [addFavoriteEmoji]);

  const tabs: { key: EmojiTab; label: string }[] = [
    { key: 'default', label: '默认' },
    { key: 'recent', label: '最近' },
    { key: 'favorites', label: '收藏' },
    { key: 'kaomoji', label: '颜文字' },
  ];

  const renderContent = () => {
    if (activeTab === 'recent') {
      if (recentEmojis.length === 0) {
        return (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af', fontSize: 14 }}>
            暂无最近使用
          </div>
        );
      }
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
          {recentEmojis.map((emoji, index) => (
            <EmojiButton key={`recent-${index}`} emoji={emoji} onSelect={handleSelect} />
          ))}
        </div>
      );
    }

    if (activeTab === 'favorites') {
      return (
        <div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: '100%',
              padding: '8px 12px',
              marginBottom: 12,
              borderRadius: 6,
              border: '1px dashed #d1d5db',
              background: '#f9fafb',
              color: '#6b7280',
              cursor: 'pointer',
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f3f4f6'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#f9fafb'; }}
          >
            <HugeiconsIcon icon={UploadIcon} size={16} strokeWidth={2} />
            上传图片到收藏
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          {favoriteEmojis.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px 0', color: '#9ca3af', fontSize: 14 }}>
              暂无收藏
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
              {favoriteEmojis.map((emoji, index) => (
                <div key={`fav-${index}`} style={{ position: 'relative' }}>
                  <EmojiButton emoji={emoji} onSelect={handleSelect} />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavoriteEmoji(emoji);
                    }}
                    style={{
                      position: 'absolute',
                      top: -2,
                      right: -2,
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      background: '#ef4444',
                      color: '#fff',
                      border: 'none',
                      fontSize: 10,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: 1,
                      padding: 0,
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (activeTab === 'kaomoji') {
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {KAOMOJIS.map((kaomoji, index) => (
            <button
              key={`kao-${index}`}
              type="button"
              onClick={() => handleSelect(kaomoji)}
              style={{
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 14,
                padding: '6px 10px',
                transition: 'background 0.15s ease, border-color 0.15s ease',
                color: '#374151',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#f3f4f6';
                e.currentTarget.style.borderColor = '#d1d5db';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#f9fafb';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              {kaomoji}
            </button>
          ))}
        </div>
      );
    }

    return (
      <div>
        {EMOJI_CATEGORIES.map((cat, catIndex) => (
          cat.emojis.length > 0 && (
            <div key={cat.label} style={{ marginBottom: 12 }}>
              <div style={{
                fontSize: 11,
                color: '#9ca3af',
                marginBottom: 6,
                paddingLeft: 4,
                fontWeight: 500,
              }}>
                {cat.label}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
                {cat.emojis.map((emoji, index) => (
                  <EmojiButton key={`emoji-${catIndex}-${index}`} emoji={emoji} onSelect={handleSelect} />
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    );
  };

  return (
    <div
      ref={panelRef}
      style={{
        position: 'absolute',
        top: '100%',
        right: 0,
        zIndex: 1000,
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        padding: 12,
        width: 320,
        maxHeight: 420,
        overflowY: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      className="emoji-picker-scroll"
    >
      <div
        style={{
          display: 'flex',
          gap: 4,
          marginBottom: 12,
          borderBottom: '1px solid #e5e7eb',
          paddingBottom: 8,
        }}
      >
        {tabs.map(tab => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              border: 'none',
              background: activeTab === tab.key ? 'var(--theme-primary, #FF743D)' : 'transparent',
              color: activeTab === tab.key ? '#ffffff' : '#6b7280',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: activeTab === tab.key ? 500 : 400,
              transition: 'background 0.15s ease, color 0.15s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {renderContent()}
    </div>
  );
}

function EmojiButton({ emoji, onSelect }: { emoji: string; onSelect: (emoji: string) => void }) {
  const isImage = emoji.startsWith('data:image');
  return (
    <button
      type="button"
      onClick={() => onSelect(emoji)}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: isImage ? 12 : 20,
        padding: 4,
        borderRadius: 6,
        transition: 'background 0.15s ease, transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        transform: 'scale(1)',
        overflow: 'hidden',
        fontFamily: '"Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji", sans-serif',
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
      {isImage ? (
        <img src={emoji} alt="emoji" style={{ width: 24, height: 24, objectFit: 'contain' }} />
      ) : (
        <span style={{ fontFamily: '"Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji", sans-serif' }}>{emoji}</span>
      )}
    </button>
  );
}

const FontItemButton = memo(function FontItemButton({
  font,
  isActive,
  onSelect,
}: {
  font: FontItem;
  isActive: boolean;
  onSelect: (family: string) => void;
}) {
  const handleClick = useCallback(() => {
    onSelect(font.family);
  }, [font.family, onSelect]);

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        padding: '8px 12px',
        border: 'none',
        background: isActive ? 'var(--color-active-bg, #f3f4f6)' : 'transparent',
        cursor: 'pointer',
        fontFamily: font.family,
        fontSize: 15,
        color: '#1a1a1a',
        transition: 'background 0.15s ease',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#f3f4f6';
      }}
      onMouseLeave={e => {
        if (!isActive) {
          e.currentTarget.style.background = 'transparent';
        }
      }}
    >
      {font.name}
    </button>
  );
});

function FontPicker({
  currentFont,
  onSelect,
  onClose,
}: {
  currentFont: string;
  onSelect: (family: string) => void;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as unknown as globalThis.Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const grouped = useMemo(() => {
    return fonts.reduce<Record<string, typeof fonts>>((acc, font) => {
      if (!acc[font.category]) acc[font.category] = [];
      acc[font.category].push(font);
      return acc;
    }, {});
  }, []);

  const categories = useMemo(() => Object.keys(grouped), [grouped]);

  const handleSelect = useCallback((family: string) => {
    onSelect(family);
    onClose();
  }, [onSelect, onClose]);

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
        width: 200,
        maxHeight: 420,
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        msOverflowStyle: 'auto',
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      {categories.map(category => (
        <div key={category}>
          <div
            style={{
              position: 'sticky',
              top: 0,
              background: '#f9fafb',
              padding: '6px 12px',
              fontSize: 12,
              fontWeight: 600,
              color: '#6b7280',
              borderBottom: '1px solid #e5e7eb',
              zIndex: 1,
            }}
          >
            {category}
          </div>
          <div style={{ padding: '4px 0' }}>
            {grouped[category].map(font => (
              <FontItemButton
                key={`${category}-${font.name}`}
                font={font}
                isActive={currentFont === font.family}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function parseAndInsertLink(url: string, editor: Editor) {
  const trimmed = url.trim();
  if (!trimmed) return;

  const lower = trimmed.toLowerCase();

  // Image
  if (/\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?.*)?$/.test(lower)) {
    editor.chain().focus().insertContent(`<img src="${trimmed}" style="max-width: 100%; height: auto;" />`).run();
    return;
  }

  // Video direct link
  if (/\.(mp4|webm|ogg|mov|avi|mkv)(\?.*)?$/.test(lower)) {
    editor.chain().focus().insertContent(`<video src="${trimmed}" controls width="100%" style="max-width: 100%; border-radius: 8px;"></video>`).run();
    return;
  }

  // Bilibili
  const bilibiliMatch = trimmed.match(/bilibili\.com\/video\/(BV[\w]+)/i);
  if (bilibiliMatch) {
    editor.chain().focus().insertContent(`<iframe src="https://player.bilibili.com/player.html?bvid=${bilibiliMatch[1]}&page=1&high_quality=1" width="100%" height="400" frameborder="0" allowfullscreen></iframe>`).run();
    return;
  }

  // YouTube
  const youtubeMatch = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/i);
  if (youtubeMatch) {
    editor.chain().focus().insertContent(`<iframe src="https://www.youtube.com/embed/${youtubeMatch[1]}" width="100%" height="400" frameborder="0" allowfullscreen></iframe>`).run();
    return;
  }

  // Douyin - insert as link
  if (/douyin\.com|iesdouyin\.com/i.test(trimmed)) {
    editor.chain().focus().insertContent(`<a href="${trimmed}" target="_blank">${trimmed}</a>`).run();
    return;
  }

  // File link card
  editor.chain().focus().insertContent(`<div class="file-card"><a href="${trimmed}" target="_blank">📎 下载文件</a></div>`).run();
}

/* ========== Insert Dropdown (positioned below button) ========== */
function InsertDropdown({
  type,
  onClose,
  editor,
}: {
  type: DialogType;
  onClose: () => void;
  editor: Editor;
}) {
  const [tab, setTab] = useState<'local' | 'url'>('local');
  const [url, setUrl] = useState('');
  const [files, setFiles] = useState<UploadFileItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as unknown as globalThis.Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleAddFiles = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;

    setFiles(prev => {
      const remaining = MAX_UPLOAD_FILES - prev.length;
      if (remaining <= 0) {
        alert('最多上传5个文件');
        return prev;
      }
      const toAdd = selected.slice(0, remaining);
      if (selected.length > remaining) {
        alert('最多上传5个文件');
      }
      const newItems: UploadFileItem[] = toAdd.map(file => {
        const item: UploadFileItem = { id: generateId(), file };
        if (type === 'image' && file.type.startsWith('image/')) {
          item.preview = URL.createObjectURL(file);
        }
        return item;
      });
      return [...prev, ...newItems];
    });
    e.target.value = '';
  }, [type]);

  const handleRemoveFile = useCallback((id: string) => {
    setFiles(prev => {
      const item = prev.find(f => f.id === id);
      if (item?.preview) URL.revokeObjectURL(item.preview);
      return prev.filter(f => f.id !== id);
    });
  }, []);

  const handleConfirm = useCallback(() => {
    if (tab === 'url') {
      if (url.trim()) {
        parseAndInsertLink(url.trim(), editor);
      }
      onClose();
      return;
    }

    if (type === 'image') {
      files.forEach(item => {
        const reader = new FileReader();
        reader.onload = event => {
          const base64 = event.target?.result as string;
          if (base64) {
            editor.chain().focus().setImage({ src: base64 }).run();
          }
        };
        reader.readAsDataURL(item.file);
      });
    } else if (type === 'video') {
      files.forEach(item => {
        const blobUrl = URL.createObjectURL(item.file);
        editor.chain().focus().insertContent({
          type: 'video',
          attrs: { src: blobUrl, controls: true, width: '100%', style: 'max-width: 100%; border-radius: 8px;' },
        }).run();
      });
    } else if (type === 'file') {
      files.forEach(item => {
        const reader = new FileReader();
        reader.onload = event => {
          const base64 = event.target?.result as string;
          if (base64) {
            editor.chain().focus().insertContent({
              type: 'fileCard',
              attrs: {
                href: base64,
                filename: item.file.name,
                size: formatFileSize(item.file.size),
                time: formatDate(new Date()),
              },
            }).run();
          }
        };
        reader.readAsDataURL(item.file);
      });
    }

    // Cleanup previews
    files.forEach(item => {
      if (item.preview) URL.revokeObjectURL(item.preview);
    });
    onClose();
  }, [tab, url, files, type, editor, onClose]);

  const title = type === 'image' ? '插入图片' : type === 'video' ? '插入视频' : '插入文件';
  const accept = type === 'image' ? 'image/*' : type === 'video' ? 'video/*' : '*';

  return (
    <div
      ref={dropdownRef}
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        zIndex: 1000,
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: 10,
        width: 360,
        maxHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
        marginTop: 6,
      }}
    >
      <div style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>{title}</span>
        <button
          type="button"
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 4, borderRadius: 4 }}
        >
          <HugeiconsIcon icon={Cancel01Icon} size={18} strokeWidth={2} />
        </button>
      </div>

      <div style={{ padding: '8px 14px', borderBottom: '1px solid #e5e7eb', display: 'flex', gap: 6 }}>
        <button
          type="button"
          onClick={() => setTab('local')}
          style={{
            padding: '5px 10px',
            borderRadius: 6,
            border: 'none',
            background: tab === 'local' ? 'var(--color-primary)' : 'transparent',
            color: tab === 'local' ? '#ffffff' : '#6b7280',
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          本地上传
        </button>
        <button
          type="button"
          onClick={() => setTab('url')}
          style={{
            padding: '5px 10px',
            borderRadius: 6,
            border: 'none',
            background: tab === 'url' ? 'var(--color-primary)' : 'transparent',
            color: tab === 'url' ? '#ffffff' : '#6b7280',
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          链接
        </button>
      </div>

      <div style={{ padding: '12px 14px', flex: 1, overflowY: 'auto' }}>
        {tab === 'local' ? (
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: '100%',
                padding: '10px 12px',
                marginBottom: 10,
                borderRadius: 8,
                border: '1px dashed #d1d5db',
                background: '#f9fafb',
                color: '#6b7280',
                cursor: 'pointer',
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <HugeiconsIcon icon={UploadIcon} size={16} strokeWidth={2} />
              选择文件
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              multiple
              onChange={handleAddFiles}
              style={{ display: 'none' }}
            />

            {files.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 0', color: '#9ca3af', fontSize: 13 }}>
                列表为空，请选择文件
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {files.map(item => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '6px 8px',
                      borderRadius: 6,
                      border: '1px solid #e5e7eb',
                      background: '#f9fafb',
                    }}
                  >
                    {type === 'image' && item.preview ? (
                      <img src={item.preview} alt={item.file.name} style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 4 }} />
                    ) : null}
                    {type === 'video' ? (
                      <div style={{ width: 36, height: 36, borderRadius: 4, background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <HugeiconsIcon icon={Video01Icon} size={18} strokeWidth={2} color="#9ca3af" />
                      </div>
                    ) : null}
                    {type === 'file' ? (
                      <div style={{ width: 36, height: 36, borderRadius: 4, background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <HugeiconsIcon icon={File01Icon} size={18} strokeWidth={2} color="#9ca3af" />
                      </div>
                    ) : null}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, color: '#1a1a1a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.file.name}</div>
                      <div style={{ fontSize: 11, color: '#9ca3af' }}>{formatFileSize(item.file.size)}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#ef4444',
                        padding: 4,
                        borderRadius: 4,
                      }}
                    >
                      <HugeiconsIcon icon={Cancel01Icon} size={14} strokeWidth={2} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <label style={{ fontSize: 12, color: '#374151', marginBottom: 6, display: 'block' }}>
              {type === 'image' ? '图片 URL' : type === 'video' ? '视频 URL' : '文件 URL'}
            </label>
            <input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://..."
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: 8,
                border: '1px solid #e5e7eb',
                fontSize: 13,
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') handleConfirm();
              }}
            />
          </div>
        )}
      </div>

      <div style={{ padding: '10px 14px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <button
          type="button"
          onClick={onClose}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid #e5e7eb',
            background: '#ffffff',
            color: '#6b7280',
            cursor: 'pointer',
            fontSize: 12,
          }}
        >
          取消
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: 'none',
            background: 'var(--color-primary)',
            color: '#ffffff',
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          确认
        </button>
      </div>
    </div>
  );
}

/* ========== Table Grid Picker ========== */
function TableGridPicker({
  onInsert,
  onClose,
}: {
  onInsert: (rows: number, cols: number) => void;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState({ rows: 0, cols: 0 });
  const MAX = 7;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as unknown as globalThis.Node)) {
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
        borderRadius: 10,
        boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
        padding: 14,
        width: 'auto',
        marginTop: 6,
      }}
    >
      <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8, textAlign: 'center' }}>
        {hover.rows > 0 ? `${hover.rows} × ${hover.cols}` : '悬停选择行列'}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${MAX}, 22px)`,
          gridTemplateRows: `repeat(${MAX}, 22px)`,
          gap: 3,
        }}
        onMouseLeave={() => setHover({ rows: 0, cols: 0 })}
      >
        {Array.from({ length: MAX * MAX }).map((_, index) => {
          const row = Math.floor(index / MAX) + 1;
          const col = (index % MAX) + 1;
          const isActive = row <= hover.rows && col <= hover.cols;
          return (
            <div
              key={index}
              onMouseEnter={() => setHover({ rows: row, cols: col })}
              onClick={() => {
                onInsert(row, col);
                onClose();
              }}
              style={{
                width: 22,
                height: 22,
                borderRadius: 4,
                background: isActive ? 'var(--color-primary)' : '#f3f4f6',
                border: isActive ? '1px solid var(--color-primary)' : '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: 'background 0.1s ease, border-color 0.1s ease',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}



export function RichTextEditor({ content, onChange, fontSize = 'medium', fontFamily = 'inherit', onFontFamilyChange }: RichTextEditorProps) {
  const { t, language } = useTranslation();
  const [textColor, setTextColor] = useState('#1a1a1a');
  const [highlightColor, setHighlightColor] = useState('#fef08a');
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [canMergeCells, setCanMergeCells] = useState(false);
  const [canSplitCell, setCanSplitCell] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFontPicker, setShowFontPicker] = useState(false);
  const displayFontFamily = fontFamily;
  const [dialogType, setDialogType] = useState<DialogType>(null);
  const [showTableGrid, setShowTableGrid] = useState(false);
  const emojiButtonRef = useRef<HTMLDivElement>(null);
  const fontButtonRef = useRef<HTMLDivElement>(null);
  const imageButtonRef = useRef<HTMLDivElement>(null);
  const videoButtonRef = useRef<HTMLDivElement>(null);
  const fileButtonRef = useRef<HTMLDivElement>(null);
  const tableButtonRef = useRef<HTMLDivElement>(null);
  const { addRecentEmoji } = useRecentEmojis();

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontFamily,
      Color,
      Highlight.configure({ multicolor: true }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: true }),
      Table.configure({ resizable: false }),
      TableRow,
      TableCell,
      TableHeader,
      Video,
      FileCard,
      Placeholder.configure({ placeholder: t('editor.placeholder') }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      setActiveFormats(getActiveFormats(editor));
      setCanMergeCells(editor.can().mergeCells());
      setCanSplitCell(editor.can().splitCell());
    },
    onSelectionUpdate: ({ editor }) => {
      setActiveFormats(getActiveFormats(editor));
      setCanMergeCells(editor.can().mergeCells());
      setCanSplitCell(editor.can().splitCell());
    },
  }, [language]);



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
    addRecentEmoji(emoji);
    if (emoji.startsWith('data:image')) {
      editor.chain().focus().insertContent(`<img src="${emoji}" alt="emoji" style="width:20px;height:20px;vertical-align:middle;" />`).run();
    } else {
      editor.chain().focus().insertContent(emoji).run();
    }
    setShowEmojiPicker(false);
  }, [editor, addRecentEmoji]);

  const insertTableGrid = useCallback((rows: number, cols: number) => {
    if (!editor) return;
    editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
  }, [editor]);

  const handleMergeCells = useCallback(() => {
    if (!editor) return;

    const { state: preState } = editor;
    const { selection: preSelection } = preState;

    // Only proceed if we have a cell selection
    if (!(preSelection instanceof CellSelection)) {
      editor.chain().focus().mergeCells().run();
      return;
    }

    // Save original table dimensions before merge
    let origHeight = 0;
    let origWidth = 0;
    preState.doc.descendants((node) => {
      if (node.type.name === 'table') {
        const map = TableMap.get(node);
        origHeight = map.height;
        origWidth = map.width;
      }
    });

    if (origHeight === 0) return;

    // Step 1: Call ProseMirror native mergeCells
    editor.chain().focus().mergeCells().run();

    // Step 2: Check if rows were removed
    const { state: postState } = editor;
    let postHeight = 0;
    let tablePos = 0;
    let tableNode: any = null;

    postState.doc.descendants((node, pos) => {
      if (node.type.name === 'table') {
        const map = TableMap.get(node);
        postHeight = map.height;
        tablePos = pos;
        tableNode = node;
      }
    });

    // If rows were removed, add them back
    if (postHeight < origHeight && tableNode) {
      const { tr } = postState;
      const rowsToAdd = origHeight - postHeight;

      // Find the last row position in the table
      let lastRowPos = tablePos + 1;
      tableNode.forEach((child: any) => {
        if (child.type.name === 'tableRow') {
          lastRowPos += child.nodeSize;
        }
      });

      for (let i = 0; i < rowsToAdd; i++) {
        const placeholderCell = postState.schema.nodes.tableCell.create(
          { colspan: origWidth },
          postState.schema.nodes.paragraph.create()
        );
        const newRow = postState.schema.nodes.tableRow.create(
          null,
          [placeholderCell]
        );
        // Insert the new row at the end of the table (before the table's closing tag)
        tr.insert(lastRowPos - 1, newRow);
      }

      editor.view.dispatch(tr);
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  const editorFontSize = fontSizeMap[fontSize] || fontSizeMap.medium;

  return (
    <div style={{ position: 'relative' }}>
      {/* Sticky toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          padding: '8px 0',
          marginBottom: 8,
          borderBottom: '1px solid #e5e7eb',
          position: 'sticky',
          top: 0,
          background: '#ffffff',
          zIndex: 10,
        }}
      >
        <div ref={fontButtonRef} style={{ position: 'relative' }}>
          <button
            type="button"
            title="字体"
            onClick={() => setShowFontPicker(!showFontPicker)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 6,
              width: 200,
              height: 32,
              borderRadius: 6,
              border: showFontPicker ? '1px solid var(--color-primary)' : '1px solid #e5e7eb',
              background: showFontPicker ? 'var(--color-primary)' : '#ffffff',
              color: showFontPicker ? '#ffffff' : '#1a1a1a',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease',
              flexShrink: 0,
              fontSize: 13,
              fontWeight: 500,
              padding: '0 10px',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              if (!showFontPicker) {
                e.currentTarget.style.background = '#f3f4f6';
              }
            }}
            onMouseLeave={e => {
              if (!showFontPicker) {
                e.currentTarget.style.background = '#ffffff';
              }
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, overflow: 'hidden' }}>
              <span style={{ fontSize: 15, fontWeight: 700, flexShrink: 0 }}>T</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: displayFontFamily === 'inherit' ? undefined : displayFontFamily }}>{displayFontFamily === 'inherit' ? '系统默认' : (fonts.find(f => f.family === displayFontFamily)?.name || '系统默认')}</span>
            </span>
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={12}
              strokeWidth={2}
              style={{
                transform: showFontPicker ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
                flexShrink: 0,
                opacity: 0.7,
              }}
            />
          </button>
          {showFontPicker && (
            <FontPicker
              currentFont={displayFontFamily}
              onSelect={family => {
                editor.chain().focus().setFontFamily(family).run();
                onFontFamilyChange?.(family);
              }}
              onClose={() => setShowFontPicker(false)}
            />
          )}
        </div>

        <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 4px' }} />

        <ToolbarButton
          active={activeFormats.has('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title={t('editor.bold')}
        >
          <HugeiconsIcon icon={TextBoldIcon} size={20} strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          active={activeFormats.has('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title={t('editor.italic')}
        >
          <HugeiconsIcon icon={TextItalicIcon} size={20} strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          active={activeFormats.has('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title={t('editor.underline')}
        >
          <HugeiconsIcon icon={TextUnderlineIcon} size={20} strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          active={activeFormats.has('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title={t('editor.strike')}
        >
          <HugeiconsIcon icon={TextStrikethroughIcon} size={20} strokeWidth={2} />
        </ToolbarButton>

        <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 4px' }} />

        <ToolbarButton
          active={activeFormats.has('heading-1')}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          title={t('editor.heading1')}
        >
          <HugeiconsIcon icon={Heading01Icon} size={20} strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          active={activeFormats.has('heading-2')}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title={t('editor.heading2')}
        >
          <HugeiconsIcon icon={Heading02Icon} size={20} strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          active={activeFormats.has('heading-3')}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          title={t('editor.heading3')}
        >
          <HugeiconsIcon icon={Heading03Icon} size={20} strokeWidth={2} />
        </ToolbarButton>

        <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 4px' }} />

        <ToolbarButton
          active={activeFormats.has('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title={t('editor.bullet_list')}
        >
          <HugeiconsIcon icon={LeftToRightListBulletIcon} size={20} strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          active={activeFormats.has('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title={t('editor.ordered_list')}
        >
          <HugeiconsIcon icon={LeftToRightListNumberIcon} size={20} strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          active={activeFormats.has('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title={t('editor.blockquote')}
        >
          <HugeiconsIcon icon={QuoteUpIcon} size={20} strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          active={activeFormats.has('code')}
          onClick={() => editor.chain().focus().toggleCode().run()}
          title={t('editor.code')}
        >
          <HugeiconsIcon icon={CodeIcon} size={20} strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          active={activeFormats.has('codeBlock')}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          title={t('editor.code_block')}
        >
          <HugeiconsIcon icon={CodeSquareIcon} size={20} strokeWidth={2} />
        </ToolbarButton>

        <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 4px' }} />

        <ColorPickerButton
          color={textColor}
          onChange={color => {
            setTextColor(color);
            editor.chain().focus().setColor(color).run();
          }}
          icon={<HugeiconsIcon icon={ColorsIcon} size={20} strokeWidth={2} />}
          title={t('editor.text_color')}
        />
        <ColorPickerButton
          color={highlightColor}
          onChange={color => {
            setHighlightColor(color);
            editor.chain().focus().setHighlight({ color }).run();
          }}
          icon={<HugeiconsIcon icon={HighlighterIcon} size={20} strokeWidth={2} />}
          title={t('editor.highlight')}
        />

        <ToolbarButton
          active={activeFormats.has('link')}
          onClick={setLink}
          title={t('editor.link')}
        >
          <HugeiconsIcon icon={Link01Icon} size={20} strokeWidth={2} />
        </ToolbarButton>

        <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 4px' }} />

        <div ref={emojiButtonRef} style={{ position: 'relative' }}>
          <ToolbarButton
            active={showEmojiPicker}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            title={t('editor.emoji') || '表情'}
          >
            <HugeiconsIcon icon={SmileIcon} size={20} strokeWidth={2} />
          </ToolbarButton>
          {showEmojiPicker && (
            <EmojiPicker
              onSelect={insertEmoji}
              onClose={() => setShowEmojiPicker(false)}
            />
          )}
        </div>

        <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 4px' }} />

        <div ref={imageButtonRef} style={{ position: 'relative' }}>
          <ToolbarButton
            active={false}
            onClick={() => setDialogType(dialogType === 'image' ? null : 'image')}
            title="插入图片"
          >
            <HugeiconsIcon icon={Image01Icon} size={20} strokeWidth={2} />
          </ToolbarButton>
          {dialogType === 'image' && (
            <InsertDropdown
              type="image"
              onClose={() => setDialogType(null)}
              editor={editor}
            />
          )}
        </div>
        <div ref={videoButtonRef} style={{ position: 'relative' }}>
          <ToolbarButton
            active={false}
            onClick={() => setDialogType(dialogType === 'video' ? null : 'video')}
            title="插入视频"
          >
            <HugeiconsIcon icon={Video01Icon} size={20} strokeWidth={2} />
          </ToolbarButton>
          {dialogType === 'video' && (
            <InsertDropdown
              type="video"
              onClose={() => setDialogType(null)}
              editor={editor}
            />
          )}
        </div>
        <div ref={fileButtonRef} style={{ position: 'relative' }}>
          <ToolbarButton
            active={false}
            onClick={() => setDialogType(dialogType === 'file' ? null : 'file')}
            title="插入文件"
          >
            <HugeiconsIcon icon={File01Icon} size={20} strokeWidth={2} />
          </ToolbarButton>
          {dialogType === 'file' && (
            <InsertDropdown
              type="file"
              onClose={() => setDialogType(null)}
              editor={editor}
            />
          )}
        </div>
        <div ref={tableButtonRef} style={{ position: 'relative' }}>
          <ToolbarButton
            active={showTableGrid}
            onClick={() => setShowTableGrid(!showTableGrid)}
            title="插入表格"
          >
            <HugeiconsIcon icon={TableIcon} size={20} strokeWidth={2} />
          </ToolbarButton>
          {showTableGrid && (
            <TableGridPicker
              onInsert={insertTableGrid}
              onClose={() => setShowTableGrid(false)}
            />
          )}
        </div>

        <ToolbarButton
          active={false}
          onClick={() => editor.chain().focus().addRowAfter().run()}
          title="下方添加行"
        >
          <HugeiconsIcon icon={Add01Icon} size={20} strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          active={false}
          onClick={() => editor.chain().focus().deleteRow().run()}
          title="删除当前行"
        >
          <HugeiconsIcon icon={Remove01Icon} size={20} strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          active={false}
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          title="右侧添加列"
        >
          <HugeiconsIcon icon={Add01Icon} size={20} strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          active={false}
          onClick={() => editor.chain().focus().deleteColumn().run()}
          title="删除当前列"
        >
          <HugeiconsIcon icon={Remove01Icon} size={20} strokeWidth={2} />
        </ToolbarButton>

        {canMergeCells && (
          <ToolbarButton
            active={false}
            onClick={handleMergeCells}
            title="合并单元格"
          >
            <HugeiconsIcon icon={JoinRoundIcon} size={20} strokeWidth={2} />
          </ToolbarButton>
        )}
        {canSplitCell && (
          <ToolbarButton
            active={false}
            onClick={() => editor.chain().focus().splitCell().run()}
            title="拆分单元格"
          >
            <HugeiconsIcon icon={ScissorIcon} size={20} strokeWidth={2} />
          </ToolbarButton>
        )}

        <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 4px' }} />

        <ToolbarButton
          active={activeFormats.has('align-left')}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          title={t('editor.align_left')}
        >
          <HugeiconsIcon icon={TextAlignLeftIcon} size={20} strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          active={activeFormats.has('align-center')}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          title={t('editor.align_center')}
        >
          <HugeiconsIcon icon={TextAlignCenterIcon} size={20} strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          active={activeFormats.has('align-right')}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          title={t('editor.align_right')}
        >
          <HugeiconsIcon icon={TextAlignRightIcon} size={20} strokeWidth={2} />
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
