import { useState, useRef, useCallback } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  Cancel01Icon, 
  File01Icon, 
  Link01Icon, 
  Delete01Icon,
  Upload01Icon
} from '@hugeicons/core-free-icons';
import { useTranslation } from '../i18n';

interface FileItem {
  id: string;
  file: File;
  preview?: string;
}

interface LinkItem {
  id: string;
  url: string;
  displayText?: string;
}

interface FileUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (files: File[], links: LinkItem[]) => void;
}

export function FileUploadDialog({ isOpen, onClose, onConfirm }: FileUploadDialogProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'local' | 'link'>('local');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [linkType, setLinkType] = useState<'plain' | 'text'>('plain');
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [displayTextInput, setDisplayTextInput] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const generateId = (): string => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleFileSelect = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    
    const newFiles: FileItem[] = Array.from(selectedFiles).map(file => ({
      id: generateId(),
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));
    
    setFiles(prev => {
      const combined = [...prev, ...newFiles];
      return combined.slice(0, 5);
    });
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const clearAllFiles = () => {
    setFiles([]);
  };

  const addLink = () => {
    if (!urlInput.trim()) return;
    
    const newLink: LinkItem = {
      id: generateId(),
      url: urlInput.trim(),
      displayText: linkType === 'text' ? displayTextInput.trim() || undefined : undefined
    };
    
    setLinks(prev => [...prev, newLink]);
    setUrlInput('');
    setDisplayTextInput('');
    setShowLinkForm(false);
  };

  const removeLink = (id: string) => {
    setLinks(prev => prev.filter(l => l.id !== id));
  };

  const clearAllLinks = () => {
    setLinks([]);
  };

  const handleConfirm = () => {
    const fileList = files.map(f => f.file);
    onConfirm(fileList, links);
    setFiles([]);
    setLinks([]);
    onClose();
  };

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
          maxWidth: 560,
          maxHeight: '90vh',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
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
            {t('fileUpload.title')}
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
            <HugeiconsIcon icon={Cancel01Icon} size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            padding: '8px 24px 0',
            gap: 8,
            borderBottom: '1px solid #f3f4f6',
          }}
          className="dark:[border-bottom:1px_solid_#374151]"
        >
          <button
            onClick={() => setActiveTab('local')}
            style={{
              padding: '10px 16px',
              borderRadius: '8px 8px 0 0',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.15s',
            }}
            className={
              activeTab === 'local'
                ? 'text-primary bg-active-bg dark:bg-gray-800'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }
          >
            <HugeiconsIcon icon={File01Icon} size={16} strokeWidth={1.5} />
            {t('fileUpload.tab.local')}
          </button>
          <button
            onClick={() => setActiveTab('link')}
            style={{
              padding: '10px 16px',
              borderRadius: '8px 8px 0 0',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.15s',
            }}
            className={
              activeTab === 'link'
                ? 'text-primary bg-active-bg dark:bg-gray-800'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }
          >
            <HugeiconsIcon icon={Link01Icon} size={16} strokeWidth={1.5} />
            {t('fileUpload.tab.link')}
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            padding: '24px',
            flex: 1,
            overflow: 'auto',
          }}
        >
          {activeTab === 'local' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Drop Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                style={{
                  border: `2px dashed ${dragOver ? 'var(--color-primary)' : '#e5e7eb'}`,
                  borderRadius: 12,
                  padding: '32px 24px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  background: dragOver ? 'var(--color-active-bg)' : 'transparent',
                }}
                className="dark:[border-color:#374151] dark:hover:[border-color:#4b5563]"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileSelect(e.target.files)}
                />
                <HugeiconsIcon
                  icon={Upload01Icon}
                  size={40}
                  strokeWidth={1.5}
                  className={dragOver ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}
                />
                <p
                  style={{ marginTop: 12, fontSize: 14, marginBottom: 0 }}
                  className="text-gray-600 dark:text-gray-400"
                >
                  {t('fileUpload.dropArea')}
                </p>
                {files.length >= 5 && (
                  <p
                    style={{ marginTop: 8, fontSize: 12, marginBottom: 0, color: '#ef4444' }}
                  >
                    {t('fileUpload.maxFiles')}
                  </p>
                )}
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                      className="text-gray-400 dark:text-gray-500"
                    >
                      {files.length} {t('fileUpload.fileName')}{files.length > 1 ? 's' : ''}
                    </span>
                    <button
                      onClick={clearAllFiles}
                      style={{
                        fontSize: 13,
                        color: '#6b7280',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                      className="dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                    >
                      {t('fileUpload.clearAll')}
                    </button>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}
                  >
                    {files.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: 12,
                          borderRadius: 8,
                          background: '#f9fafb',
                          gap: 12,
                        }}
                        className="dark:bg-gray-800"
                      >
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 6,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#e5e7eb',
                            overflow: 'hidden',
                          }}
                          className="dark:bg-gray-700"
                        >
                          {item.preview ? (
                            <img
                              src={item.preview}
                              alt=""
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <HugeiconsIcon
                              icon={File01Icon}
                              size={20}
                              strokeWidth={1.5}
                              className="text-gray-500 dark:text-gray-400"
                            />
                          )}
                        </div>
                        <div
                          style={{
                            flex: 1,
                            minWidth: 0,
                          }}
                        >
                          <p
                            style={{
                              margin: 0,
                              fontSize: 14,
                              fontWeight: 500,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                            className="text-gray-900 dark:text-gray-100"
                          >
                            {item.file.name}
                          </p>
                          <p
                            style={{
                              margin: 0,
                              fontSize: 12,
                            }}
                            className="text-gray-500 dark:text-gray-400"
                          >
                            {formatFileSize(item.file.size)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFile(item.id)}
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 6,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          className="text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-red-500"
                        >
                          <HugeiconsIcon icon={Delete01Icon} size={16} strokeWidth={1.5} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'link' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Link Type Toggle */}
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  background: '#f3f4f6',
                  padding: 4,
                  borderRadius: 8,
                }}
                className="dark:bg-gray-800"
              >
                <button
                  onClick={() => setLinkType('plain')}
                  style={{
                    flex: 1,
                    padding: '8px 16px',
                    borderRadius: 6,
                    border: 'none',
                    background: linkType === 'plain' ? '#ffffff' : 'transparent',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 500,
                    transition: 'all 0.15s',
                  }}
                  className={
                    linkType === 'plain'
                      ? 'text-gray-900 dark:text-gray-100 dark:bg-gray-700 shadow-sm'
                      : 'text-gray-500 dark:text-gray-400'
                  }
                >
                  {t('fileUpload.plainLink')}
                </button>
                <button
                  onClick={() => setLinkType('text')}
                  style={{
                    flex: 1,
                    padding: '8px 16px',
                    borderRadius: 6,
                    border: 'none',
                    background: linkType === 'text' ? '#ffffff' : 'transparent',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 500,
                    transition: 'all 0.15s',
                  }}
                  className={
                    linkType === 'text'
                      ? 'text-gray-900 dark:text-gray-100 dark:bg-gray-700 shadow-sm'
                      : 'text-gray-500 dark:text-gray-400'
                  }
                >
                  {t('fileUpload.textLink')}
                </button>
              </div>

              {/* Add Link Button */}
              {!showLinkForm && (
                <button
                  onClick={() => setShowLinkForm(true)}
                  style={{
                    width: '100%',
                    padding: '12px 24px',
                    borderRadius: 8,
                    border: '2px dashed #e5e7eb',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    transition: 'all 0.15s',
                  }}
                  className="text-gray-600 dark:text-gray-400 dark:[border-color:#374151] hover:[border-color:var(--color-primary)] hover:text-primary"
                >
                  <HugeiconsIcon icon={Link01Icon} size={18} strokeWidth={1.5} />
                  {t('fileUpload.addLink')}
                </button>
              )}

              {/* Link Form */}
              {showLinkForm && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    padding: 16,
                    borderRadius: 12,
                    background: '#f9fafb',
                  }}
                  className="dark:bg-gray-800"
                >
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 13,
                        fontWeight: 500,
                        marginBottom: 6,
                      }}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      {t('fileUpload.url')}
                    </label>
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://..."
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1px solid #e5e7eb',
                        fontSize: 14,
                        outline: 'none',
                        transition: 'all 0.15s',
                        boxSizing: 'border-box',
                      }}
                      className="dark:bg-gray-700 dark:[border-color:#374151] dark:text-gray-100 focus:[border-color:var(--color-primary)] focus:ring-1 focus:[ring-color:var(--color-primary)]"
                    />
                  </div>

                  {linkType === 'text' && (
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: 13,
                          fontWeight: 500,
                          marginBottom: 6,
                        }}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {t('fileUpload.displayText')}
                      </label>
                      <input
                        type="text"
                        value={displayTextInput}
                        onChange={(e) => setDisplayTextInput(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: 8,
                          border: '1px solid #e5e7eb',
                          fontSize: 14,
                          outline: 'none',
                          transition: 'all 0.15s',
                          boxSizing: 'border-box',
                        }}
                        className="dark:bg-gray-700 dark:[border-color:#374151] dark:text-gray-100 focus:[border-color:var(--color-primary)] focus:ring-1 focus:[ring-color:var(--color-primary)]"
                      />
                    </div>
                  )}

                  <div
                    style={{
                      display: 'flex',
                      gap: 8,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <button
                      onClick={() => {
                        setShowLinkForm(false);
                        setUrlInput('');
                        setDisplayTextInput('');
                      }}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 6,
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                      className="text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      {t('fileUpload.cancel')}
                    </button>
                    <button
                      onClick={addLink}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 6,
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#ffffff',
                        background: 'linear-gradient(135deg, var(--color-primary), color-mix(in srgb, var(--color-primary) 70%, white))',
                      }}
                    >
                      {t('fileUpload.confirm')}
                    </button>
                  </div>
                </div>
              )}

              {/* Link List */}
              {links.length > 0 && (
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                      className="text-gray-400 dark:text-gray-500"
                    >
                      {links.length} {t('fileUpload.url')}{links.length > 1 ? 's' : ''}
                    </span>
                    <button
                      onClick={clearAllLinks}
                      style={{
                        fontSize: 13,
                        color: '#6b7280',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                      className="dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                    >
                      {t('fileUpload.clearAll')}
                    </button>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                      maxHeight: 300,
                      overflow: 'auto',
                    }}
                  >
                    {links.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: 12,
                          borderRadius: 8,
                          background: '#f9fafb',
                          gap: 12,
                        }}
                        className="dark:bg-gray-800"
                      >
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 6,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#e5e7eb',
                          }}
                          className="dark:bg-gray-700"
                        >
                          <HugeiconsIcon
                            icon={Link01Icon}
                            size={20}
                            strokeWidth={1.5}
                            className="text-gray-500 dark:text-gray-400"
                          />
                        </div>
                        <div
                          style={{
                            flex: 1,
                            minWidth: 0,
                          }}
                        >
                          {item.displayText && (
                            <p
                              style={{
                                margin: 0,
                                fontSize: 14,
                                fontWeight: 500,
                              }}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {item.displayText}
                            </p>
                          )}
                          <p
                            style={{
                              margin: 0,
                              fontSize: item.displayText ? 12 : 14,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              color: item.displayText ? '#6b7280' : '#111827',
                            }}
                            className={item.displayText ? 'dark:text-gray-400' : 'dark:text-gray-100'}
                          >
                            {item.url}
                          </p>
                        </div>
                        <button
                          onClick={() => removeLink(item.id)}
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 6,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          className="text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-red-500"
                        >
                          <HugeiconsIcon icon={Delete01Icon} size={16} strokeWidth={1.5} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
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
            {t('fileUpload.cancel')}
          </button>
          <button
            onClick={handleConfirm}
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
              background: 'linear-gradient(135deg, var(--color-primary), color-mix(in srgb, var(--color-primary) 70%, white))',
            }}
          >
            {t('fileUpload.confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}
