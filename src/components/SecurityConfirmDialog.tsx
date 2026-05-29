import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Cancel01Icon, SecurityWarningIcon, Download04Icon } from '@hugeicons/core-free-icons';
import { useTranslation } from '../i18n';

interface SecurityConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function SecurityConfirmDialog({ isOpen, onConfirm, onClose }: SecurityConfirmDialogProps) {
  const { t } = useTranslation();

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
          maxWidth: 440,
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <HugeiconsIcon
                icon={SecurityWarningIcon}
                size={20}
                strokeWidth={1.5}
                style={{ color: '#d97706' }}
              />
            </div>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                margin: 0,
              }}
              className="text-gray-900 dark:text-gray-100"
            >
              {t('security.warning')}
            </h2>
          </div>
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

        {/* Content */}
        <div style={{ padding: '24px' }}>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              margin: 0,
            }}
            className="text-gray-600 dark:text-gray-400"
          >
            {t('security.file_warning')}
          </p>
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
            {t('security.cancel_download')}
          </button>
          <button
            onClick={onConfirm}
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
            <HugeiconsIcon icon={Download04Icon} size={16} strokeWidth={1.5} />
            {t('security.i_understand')}
          </button>
        </div>
      </div>
    </div>
  );
}
