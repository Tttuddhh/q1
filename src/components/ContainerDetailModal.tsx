import { useState, useEffect, useRef } from 'react';
import type { Container } from '../types';

interface ContainerDetailModalProps {
  container: Container | null;
  onClose: () => void;
}

const TAB_LABELS = ['说明', '功能介绍', '使用教程', '更新日杂', '其他信息'] as const;
type TabKey = 'description' | 'features' | 'tutorial' | 'updates' | 'other';
const TAB_KEYS: TabKey[] = ['description', 'features', 'tutorial', 'updates', 'other'];

export function ContainerDetailModal({ container, onClose }: ContainerDetailModalProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('description');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container) {
      setActiveTab('description');
    }
  }, [container]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (container) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [container, onClose]);

  if (!container) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 24,
      }}
    >
      <div
        ref={modalRef}
        style={{
          background: '#fff',
          borderRadius: 16,
          width: '100%',
          maxWidth: 640,
          maxHeight: '85vh',
          overflow: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 28px 0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: container.iconColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 28, color: '#fff' }}>📦</span>
            </div>
            <div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#1a1a1a',
                  lineHeight: 1.3,
                }}
              >
                {container.name}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: '#6b7280',
                  marginTop: 4,
                }}
              >
                作者：{container.author}
              </div>
            </div>
          </div>
          <button
            style={{
              padding: '8px 24px',
              borderRadius: 9999,
              background: '#1a1a1a',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            安装
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px 28px' }}>
          {/* Description */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#1a1a1a',
                marginBottom: 12,
              }}
            >
              简述
            </div>
            <div
              style={{
                fontSize: 14,
                color: '#374151',
                lineHeight: 1.7,
                whiteSpace: 'pre-line',
              }}
            >
              {container.description}
            </div>
          </div>

          {/* Previews */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#1a1a1a',
                marginBottom: 12,
              }}
            >
              预览
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {container.previews.map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    aspectRatio: '16/10',
                    borderRadius: 12,
                    background: container.iconColor,
                    opacity: 0.15,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              marginBottom: 16,
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: 8,
            }}
          >
            {TAB_LABELS.map((label, i) => {
              const key = TAB_KEYS[i];
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#1a1a1a' : '#6b7280',
                    background: isActive ? '#f3f4f6' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div
            style={{
              fontSize: 14,
              color: '#374151',
              lineHeight: 1.7,
              whiteSpace: 'pre-line',
              minHeight: 120,
            }}
          >
            {container.tabs[activeTab]}
          </div>
        </div>
      </div>
    </div>
  );
}
