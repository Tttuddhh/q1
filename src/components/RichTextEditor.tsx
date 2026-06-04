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
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { HugeiconsIcon } from '@hugeicons/react';
import { FileUploadDialog } from './FileUploadDialog';
import {
  UndoIcon,
  RedoIcon,
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
  ImageIcon,
  VideoIcon,
  File01Icon,
  TableIcon,
  GitMergeIcon,
  SplitIcon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  DeleteRowIcon,
  DeleteColumnIcon,
} from '@hugeicons/core-free-icons';
import { useCallback, useState, useEffect, useRef } from 'react';
import { useTranslation } from '../i18n';
import { Video, FileNode, DivNode, NewParagraphExtension } from './editor-extensions';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  fontSize?: string;
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
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_UPLOAD_FILE_SIZE = 10 * 1024 * 1024;
const MAX_VIDEO_SIZE = 50 * 1024 * 1024;

type EmojiTab = 'default' | 'recent' | 'favorites' | 'kaomoji';

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
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
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
        right: 0, // 改为右对齐，或者向左偏移
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

function TablePicker({
  onInsert,
  onClose,
}: {
  onInsert: (rows: number, cols: number) => void;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const size = 5;

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
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${size}, 1fr)`, gap: 4 }}>
        {Array.from({ length: size }, (_, row) =>
          Array.from({ length: size }, (_, col) => {
            const isActive = hovered ? row <= hovered.row && col <= hovered.col : false;
            return (
              <button
                key={`${row}-${col}`}
                type="button"
                onMouseEnter={() => setHovered({ row, col })}
                onClick={() => onInsert(row + 1, col + 1)}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 4,
                  border: '1px solid #e5e7eb',
                  background: isActive ? 'var(--theme-primary, #FF743D)' : '#f9fafb',
                  cursor: 'pointer',
                  transition: 'background 0.1s ease',
                }}
              />
            );
          })
        )}
      </div>
      <div style={{ marginTop: 8, fontSize: 12, color: '#6b7280', textAlign: 'center' }}>
        {hovered ? `${hovered.col + 1} × ${hovered.row + 1}` : '选择表格大小'}
      </div>
    </div>
  );
}

function VideoPicker({
  onLocalVideo,
  onVideoLink,
  onClose,
}: {
  onLocalVideo: () => void;
  onVideoLink: () => void;
  onClose: () => void;
}) {
  const { t } = useTranslation();
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
        padding: '6px 0',
        minWidth: 140,
      }}
    >
      <button
        type="button"
        onClick={onLocalVideo}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          width: '100%',
          padding: '8px 12px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          fontSize: 13,
          color: '#374151',
          textAlign: 'left',
          transition: 'background 0.15s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#f3f4f6'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
      >
        <HugeiconsIcon icon={UploadIcon} size={16} strokeWidth={2} />
        <span>{t('editor.local_video')}</span>
      </button>
      <button
        type="button"
        onClick={onVideoLink}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          width: '100%',
          padding: '8px 12px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          fontSize: 13,
          color: '#374151',
          textAlign: 'left',
          transition: 'background 0.15s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#f3f4f6'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
      >
        <HugeiconsIcon icon={Link01Icon} size={16} strokeWidth={2} />
        <span>{t('editor.video_link')}</span>
      </button>
    </div>
  );
}

export function RichTextEditor({ content, onChange, fontSize = 'medium' }: RichTextEditorProps) {
  const { t, language } = useTranslation();
  const [textColor, setTextColor] = useState('#1a1a1a');
  const [highlightColor, setHighlightColor] = useState('#fef08a');
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showTablePicker, setShowTablePicker] = useState(false);
  const [showVideoPicker, setShowVideoPicker] = useState(false);
  const [showFileDialog, setShowFileDialog] = useState(false);
  const [showTableMenu, setShowTableMenu] = useState(false);
  const [tableMenuPos, setTableMenuPos] = useState({ top: 0, left: 0 });
  const emojiButtonRef = useRef<HTMLDivElement>(null);
  const tableButtonRef = useRef<HTMLDivElement>(null);
  const videoButtonRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const editorContentRef = useRef<HTMLDivElement>(null);
  const { addRecentEmoji } = useRecentEmojis();

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
      Video,
      FileNode,
      DivNode,
      NewParagraphExtension,
      Table.configure({ 
        resizable: true,
        allowTableNodeSelection: true,
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: 'relative',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'relative',
        },
      }),
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
      requestAnimationFrame(() => {
        setActiveFormats(getActiveFormats(editor));
      });
    }
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    const updateTableMenu = () => {
      const isTableActive = editor.isActive('table');
      if (!isTableActive) {
        setShowTableMenu(false);
        return;
      }

      const { selection } = editor.state;
      const view = editor.view;
      const fromPos = selection.from;
      const domAtPos = view.domAtPos(fromPos);
      const node = domAtPos.node as HTMLElement;
      const tableElement = node.closest('table');

      if (tableElement && editorContentRef.current) {
        const editorRect = editorContentRef.current.getBoundingClientRect();
        const tableRect = tableElement.getBoundingClientRect();
        setTableMenuPos({
          top: tableRect.top - editorRect.top - 44,
          left: tableRect.left - editorRect.left,
        });
        setShowTableMenu(true);
      } else {
        setShowTableMenu(false);
      }
    };

    editor.on('selectionUpdate', updateTableMenu);
    editor.on('transaction', updateTableMenu);

    return () => {
      editor.off('selectionUpdate', updateTableMenu);
      editor.off('transaction', updateTableMenu);
    };
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
    addRecentEmoji(emoji);
    if (emoji.startsWith('data:image')) {
      editor.chain().focus().insertContent(`<img src="${emoji}" alt="emoji" style="width:20px;height:20px;vertical-align:middle;" />`).run();
    } else {
      editor.chain().focus().insertContent(emoji).run();
    }
    setShowEmojiPicker(false);
  }, [editor, addRecentEmoji]);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    if (file.size > MAX_IMAGE_SIZE) {
      alert(t('editor.image_size_limit'));
      return;
    }
    const reader = new FileReader();
    reader.onload = event => {
      const base64 = event.target?.result as string;
      if (base64) {
        editor.chain().focus().setImage({ src: base64 }).run();
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }, [editor, t]);

  const handleFileConfirm = useCallback((files: File[], links: { url: string; displayText?: string }[]) => {
    if (!editor) return;

    // Process local files
    if (files.length > 0) {
      Promise.all(
        files.map(file => {
          if (file.size > MAX_UPLOAD_FILE_SIZE) {
            alert(t('editor.file_size_limit'));
            return Promise.resolve(null);
          }
          return new Promise<{ name: string; size: number; type: string; data: string } | null>(resolve => {
            const reader = new FileReader();
            reader.onload = event => {
              const base64 = event.target?.result as string;
              if (base64) {
                resolve({ name: file.name, size: file.size, type: file.type, data: base64 });
              } else {
                resolve(null);
              }
            };
            reader.readAsDataURL(file);
          });
        })
      ).then(results => {
        const validResults = results.filter(Boolean) as { name: string; size: number; type: string; data: string }[];
        if (validResults.length > 0) {
          const content = validResults.map(attrs => ({
            type: 'fileNode',
            attrs,
          }));
          editor.chain().focus().insertContent(content).run();
        }
      });
    }

    // Process links
    if (links.length > 0) {
      links.forEach(link => {
        if (link.displayText) {
          // Insert text link
          editor.chain().focus().insertContent(`<a href="${link.url}">${link.displayText}</a> `).run();
        } else {
          // Insert plain link
          editor.chain().focus().insertContent(`<a href="${link.url}">${link.url}</a> `).run();
        }
      });
    }
  }, [editor, t]);

  const insertVideoLink = useCallback(() => {
    if (!editor) return;
    const url = window.prompt(t('editor.video_prompt'));
    if (!url) return;
    editor.chain().focus().insertContent({ type: 'video', attrs: { src: url } }).run();
  }, [editor, t]);

  const handleVideoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    if (file.size > MAX_VIDEO_SIZE) {
      alert(t('editor.video_size_limit'));
      return;
    }
    const reader = new FileReader();
    reader.onload = event => {
      const base64 = event.target?.result as string;
      if (base64) {
        editor.chain().focus().insertContent({ type: 'video', attrs: { src: base64 } }).run();
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }, [editor, t]);

  const insertTable = useCallback((rows: number, cols: number) => {
    if (!editor) return;
    editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
    setShowTablePicker(false);
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
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          padding: '8px 0',
          marginBottom: 8,
          borderBottom: '1px solid #e5e7eb',
          background: 'var(--color-bg, #ffffff)',
        }}
      >
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          title={t('editor.redo') || '重做'}
        >
          <HugeiconsIcon icon={RedoIcon} size={20} strokeWidth={2} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          title={t('editor.undo') || '撤销'}
        >
          <HugeiconsIcon icon={UndoIcon} size={20} strokeWidth={2} />
        </ToolbarButton>

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

        <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 4px' }} />

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

        <ToolbarButton
          onClick={() => imageInputRef.current?.click()}
          title={t('editor.image')}
        >
          <HugeiconsIcon icon={ImageIcon} size={20} strokeWidth={2} />
        </ToolbarButton>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />

        <div ref={videoButtonRef} style={{ position: 'relative' }}>
          <ToolbarButton
            active={showVideoPicker}
            onClick={() => setShowVideoPicker(!showVideoPicker)}
            title={t('editor.video')}
          >
            <HugeiconsIcon icon={VideoIcon} size={20} strokeWidth={2} />
          </ToolbarButton>
          {showVideoPicker && (
            <VideoPicker
              onLocalVideo={() => {
                videoInputRef.current?.click();
                setShowVideoPicker(false);
              }}
              onVideoLink={() => {
                insertVideoLink();
                setShowVideoPicker(false);
              }}
              onClose={() => setShowVideoPicker(false)}
            />
          )}
        </div>
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          style={{ display: 'none' }}
        />

        <ToolbarButton
          onClick={() => setShowFileDialog(true)}
          title={t('editor.file')}
        >
          <HugeiconsIcon icon={File01Icon} size={20} strokeWidth={2} />
        </ToolbarButton>

        <div ref={tableButtonRef} style={{ position: 'relative' }}>
          <ToolbarButton
            active={showTablePicker}
            onClick={() => setShowTablePicker(!showTablePicker)}
            title={t('editor.table')}
          >
            <HugeiconsIcon icon={TableIcon} size={20} strokeWidth={2} />
          </ToolbarButton>
          {showTablePicker && (
            <TablePicker onInsert={insertTable} onClose={() => setShowTablePicker(false)} />
          )}
        </div>

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
      <div ref={editorContentRef} style={{ position: 'relative' }}>
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

        {showTableMenu && (
          <div
            style={{
              position: 'absolute',
              top: tableMenuPos.top,
              left: tableMenuPos.left,
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              padding: '4px 6px',
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            <ToolbarButton
              onClick={() => editor.chain().focus().mergeCells().run()}
              title={t('editor.merge_cells')}
            >
              <HugeiconsIcon icon={GitMergeIcon} size={18} strokeWidth={2} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().splitCell().run()}
              title={t('editor.split_cell')}
            >
              <HugeiconsIcon icon={SplitIcon} size={18} strokeWidth={2} />
            </ToolbarButton>
            <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 2px' }} />
            <ToolbarButton
              onClick={() => editor.chain().focus().addRowBefore().run()}
              title={t('editor.add_row_before')}
            >
              <HugeiconsIcon icon={ArrowUp01Icon} size={18} strokeWidth={2} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().addRowAfter().run()}
              title={t('editor.add_row_after')}
            >
              <HugeiconsIcon icon={ArrowDown01Icon} size={18} strokeWidth={2} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().addColumnBefore().run()}
              title={t('editor.add_column_before')}
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={18} strokeWidth={2} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              title={t('editor.add_column_after')}
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={2} />
            </ToolbarButton>
            <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 2px' }} />
            <ToolbarButton
              onClick={() => editor.chain().focus().deleteRow().run()}
              title={t('editor.delete_row')}
            >
              <HugeiconsIcon icon={DeleteRowIcon} size={18} strokeWidth={2} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().deleteColumn().run()}
              title={t('editor.delete_column')}
            >
              <HugeiconsIcon icon={DeleteColumnIcon} size={18} strokeWidth={2} />
            </ToolbarButton>
          </div>
        )}
      </div>
      <style>{`
        .ProseMirror img {
          max-width: 100%;
          max-height: 400px;
          height: auto;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          margin: 1em 0;
        }
        .ProseMirror a {
          color: #3b82f6;
          text-decoration: underline;
        }
        .ProseMirror a:hover {
          color: #1d4ed8;
        }
        .ProseMirror table {
          border-collapse: collapse;
          width: 100%;
          margin: 1em 0;
          table-layout: fixed;
        }
        .ProseMirror table td,
        .ProseMirror table th {
          border: 1px solid #d1d5db;
          padding: 4px 8px;
          vertical-align: top;
          min-width: 80px;
          position: relative;
        }
        .ProseMirror table td.selectedCell,
        .ProseMirror table th.selectedCell {
          position: relative;
        }
        .ProseMirror table th {
          background-color: #f3f4f6;
          font-weight: 600;
          text-align: left;
        }
        .ProseMirror table td p,
        .ProseMirror table th p {
          margin: 0;
        }
        .ProseMirror table .selectedCell:after {
          background: rgba(59, 130, 246, 0.2);
          content: "";
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          pointer-events: none;
          position: absolute;
          z-index: 2;
          border: 2px solid #3b82f6;
        }
        .ProseMirror table .column-resize-handle {
          display: none;
        }
        .ProseMirror.resize-cursor {
          cursor: col-resize;
        }
      `}</style>
      
      <FileUploadDialog
        isOpen={showFileDialog}
        onClose={() => setShowFileDialog(false)}
        onConfirm={handleFileConfirm}
      />
    </div>
  );
}
