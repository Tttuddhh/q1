import { useState } from 'react';
import { X, Download, FileText, FileCode, FileJson, FileType } from 'lucide-react';
import { useTranslation } from '../i18n';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const { t } = useTranslation();
  const formats = [
    { id: 'markdown', label: 'Markdown', icon: <FileText size={24} />, description: t('download.format_markdown_desc') },
    { id: 'html', label: 'HTML', icon: <FileCode size={24} />, description: t('download.format_html_desc') },
    { id: 'json', label: 'JSON', icon: <FileJson size={24} />, description: t('download.format_json_desc') },
    { id: 'pdf', label: 'PDF', icon: <FileType size={24} />, description: t('download.format_pdf_desc') },
  ];
  const [selectedFormat, setSelectedFormat] = useState('markdown');
  const [includeChildren, setIncludeChildren] = useState(true);
  const [includeComments, setIncludeComments] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 480,
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
        className="bg-white dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid #f3f4f6',
          }}
          className="dark:[border-bottom:1px_solid_#374151]"
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              margin: 0,
            }}
            className="text-gray-900 dark:text-gray-100"
          >
            {t('download.title')}
          </h2>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
            className="text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 12,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
            className="text-gray-400 dark:text-gray-500"
          >
            {t('download.format')}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 24 }}>
            {formats.map((format) => (
              <button
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                style={{
                  padding: '16px',
                  borderRadius: 12,
                  border: '2px solid',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.15s',
                }}
                className={
                  selectedFormat === format.id
                    ? 'border-primary bg-active-bg dark:bg-gray-800'
                    : 'border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-700'
                }
              >
                <span className={selectedFormat === format.id ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}>
                  {format.icon}
                </span>
                <span
                  style={{ fontSize: 14, fontWeight: 600 }}
                  className={selectedFormat === format.id ? 'text-primary-dark dark:text-orange-400' : 'text-gray-700 dark:text-gray-300'}
                >
                  {format.label}
                </span>
                <span style={{ fontSize: 11 }} className="text-gray-400 dark:text-gray-500">
                  {format.description}
                </span>
              </button>
            ))}
          </div>

          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 12,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
            className="text-gray-400 dark:text-gray-500"
          >
            {t('download.options')}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'pointer',
                fontSize: 14,
              }}
              className="text-gray-700 dark:text-gray-300"
            >
              <input
                type="checkbox"
                checked={includeChildren}
                onChange={(e) => setIncludeChildren(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: 'var(--color-primary)' }}
              />
              {t('download.include_children')}
            </label>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'pointer',
                fontSize: 14,
              }}
              className="text-gray-700 dark:text-gray-300"
            >
              <input
                type="checkbox"
                checked={includeComments}
                onChange={(e) => setIncludeComments(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: 'var(--color-primary)' }}
              />
              {t('download.include_comments')}
            </label>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 10,
            padding: '16px 24px',
            borderTop: '1px solid #f3f4f6',
          }}
          className="dark:[border-top:1px_solid_#374151]"
        >
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
            }}
            className="text-gray-600 dark:text-gray-400 dark:border-gray-600"
          >
            {t('download.cancel')}
          </button>
          <button
            style={{
              padding: '10px 24px',
              borderRadius: 8,
              border: 'none',
              color: '#ffffff',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'linear-gradient(135deg, var(--color-primary), rgb(255, 143, 107))',
            }}
            onClick={() => {
              const formatLabel = formats.find(f => f.id === selectedFormat)?.label || '';
              alert(t('download.downloading').replace('{format}', formatLabel));
              onClose();
            }}
          >
            <Download size={16} />
            {t('download.download')}
          </button>
        </div>
      </div>
    </div>
  );
}
