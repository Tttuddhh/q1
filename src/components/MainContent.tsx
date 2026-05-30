import { useState, useEffect, useCallback } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Tag01Icon, Add01Icon, Cancel01Icon, Calendar01Icon, Clock03Icon } from '@hugeicons/core-free-icons';
import type { Page } from '../types';
import { RichTextEditor } from './RichTextEditor';
import { useTranslation } from '../i18n';

interface MainContentProps {
  page: Page | null;
  onCreatePage?: () => void;
  onUpdatePage?: (pageId: string, updates: Partial<Page>) => void;
  isEditing?: boolean;
  onStopEditing?: () => void;
  editContent?: string;
  onEditContentChange?: (content: string) => void;
  editTags?: string[];
  onEditTagsChange?: (tags: string[]) => void;
  dateFormat?: string;
  timezone?: string;
  editorFontSize?: string;
}

export function MainContent({
  page,
  onCreatePage,
  onUpdatePage,
  isEditing = false,
  onStopEditing,
  editContent: controlledEditContent,
  onEditContentChange,
  editTags: controlledEditTags,
  onEditTagsChange,
  dateFormat = 'YYYY-MM-DD',
  timezone,
  editorFontSize = 'medium',
}: MainContentProps) {
  const { t } = useTranslation();
  const isControlled = controlledEditContent !== undefined && controlledEditTags !== undefined;

  const [localTags, setLocalTags] = useState<string[]>(page?.tags || []);
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [localEditContent, setLocalEditContent] = useState(page?.content || '');
  const [removingTag, setRemovingTag] = useState<string | null>(null);
  const [justAddedTag, setJustAddedTag] = useState<string | null>(null);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: timezone || undefined,
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(date);
    const partMap: Record<string, string> = {};
    for (const part of parts) {
      if (part.type !== 'literal') {
        partMap[part.type] = part.value;
      }
    }
    const y = partMap.year;
    const m = partMap.month;
    const d = partMap.day;
    switch (dateFormat) {
      case 'MM/DD/YYYY':
        return `${m}/${d}/${y}`;
      case 'DD/MM/YYYY':
        return `${d}/${m}/${y}`;
      case 'YYYY/MM/DD':
        return `${y}/${m}/${d}`;
      case 'DD-MM-YYYY':
        return `${d}-${m}-${y}`;
      case 'YYYY-MM-DD':
      default:
        return `${y}-${m}-${d}`;
    }
  };

  const tags = isControlled ? controlledEditTags! : localTags;
  const editContent = isControlled ? controlledEditContent! : localEditContent;

  const setTags = isControlled ? onEditTagsChange! : setLocalTags;
  const setEditContent = isControlled ? onEditContentChange! : setLocalEditContent;

  // Sync tags and content when page changes
  useEffect(() => {
    setTags(page?.tags || []);
    setEditContent(page?.content || '');
  }, [page?.id]);

  if (!page) {
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#9ca3af',
        }}
      >
        {t('page.select_to_start')}
      </div>
    );
  }

  const handleAddTag = () => {
    const trimmed = newTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setJustAddedTag(trimmed);
      setTimeout(() => setJustAddedTag(null), 400);
    }
    setNewTag('');
    setShowTagInput(false);
  };

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    setRemovingTag(tagToRemove);
    setTimeout(() => {
      setTags(tags.filter(t => t !== tagToRemove));
      setRemovingTag(null);
    }, 200);
  }, [tags, setTags]);

  const handleSave = () => {
    onUpdatePage?.(page.id, { content: editContent, tags });
    onStopEditing?.();
  };

  return (
    <div
      style={{
        flex: 1,
        overflow: 'auto',
        padding: '0 48px',
        maxWidth: 900,
        margin: '0 auto',
        width: '100%',
      }}
      className="main-content-scroll animate-fade-in"
    >
      {/* Page Header */}
      <div style={{ paddingTop: 40, marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          {/* Emoji */}
          <button
            style={{
              fontSize: '3rem',
              lineHeight: 1,
              padding: '8px 12px',
              borderRadius: 12,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              marginBottom: 16,
              display: 'block',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#f3f4f6')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            {page.emoji}
          </button>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: '2.25rem',
            fontWeight: 700,
            color: '#1a1a1a',
            margin: '0 0 12px 0',
            lineHeight: 1.3,
          }}
        >
          {page.isEdited === false ? t('page.untitled') : page.title}
        </h1>

        {/* Meta info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 14,
            color: '#6b7280',
            marginBottom: 16,
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <HugeiconsIcon icon={Calendar01Icon} size={18} strokeWidth={1.5} />
            {t('page.created_at')} {formatDate(page.createdAt)}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <HugeiconsIcon icon={Clock03Icon} size={18} strokeWidth={1.5} />
            {t('page.updated_at')} {formatDate(page.updatedAt)}
          </span>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {page.isEdited === false ? null : tags.map(tag => (
            <span
              key={tag}
              className={justAddedTag === tag ? 'animate-pop-in' : removingTag === tag ? 'animate-pop-out' : ''}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 10px',
                borderRadius: 9999,
                fontSize: 13,
                fontWeight: 500,
                background: 'color-mix(in srgb, var(--color-primary) 10%, transparent)',
                color: 'var(--color-primary)',
                transition: 'background-color 0.2s, transform 0.15s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'color-mix(in srgb, var(--color-primary) 20%, transparent)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'color-mix(in srgb, var(--color-primary) 10%, transparent)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <HugeiconsIcon icon={Tag01Icon} size={12} strokeWidth={1.5} />
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="tag-remove-btn"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  color: 'inherit',
                  opacity: 0.5,
                  transition: 'opacity 0.15s, transform 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'scale(1.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.opacity = '0.5';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <HugeiconsIcon icon={Cancel01Icon} size={12} strokeWidth={1.5} />
              </button>
            </span>
          ))}

          {showTagInput ? (
            <input
              autoFocus
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleAddTag();
                if (e.key === 'Escape') setShowTagInput(false);
              }}
              onBlur={handleAddTag}
              placeholder={t('tag.input_placeholder')}
              className="animate-pop-in"
              style={{
                padding: '4px 10px',
                borderRadius: 9999,
                border: '1px solid #e5e7eb',
                fontSize: 13,
                outline: 'none',
                width: 100,
                animation: 'pop-in 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            />
          ) : (
            <button
              onClick={() => setShowTagInput(true)}
              className="tag-add-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 10px',
                borderRadius: 9999,
                fontSize: 13,
                fontWeight: 500,
                background: 'transparent',
                color: '#9ca3af',
                border: '1px dashed #d1d5db',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.color = 'var(--color-primary)';
                e.currentTarget.style.background = 'color-mix(in srgb, var(--color-primary) 5%, transparent)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.color = '#9ca3af';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <HugeiconsIcon icon={Add01Icon} size={12} strokeWidth={1.5} />
              {t('tag.add')}
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {isEditing ? (
        <div className="animate-slide-in-right">
          <RichTextEditor content={editContent} onChange={setEditContent} fontSize={editorFontSize} />
        </div>
      ) : (
        <div
          className="prose animate-fade-in"
          style={{ paddingTop: 40 }}
          dangerouslySetInnerHTML={{ __html: page.isEdited === false ? t('page.default_content') : page.content }}
        />
      )}
    </div>
  );
}
