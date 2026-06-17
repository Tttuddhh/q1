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
  const [expandedUpdate, setExpandedUpdate] = useState<number | null>(null);
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

  const renderTabContent = () => {
    if (activeTab === 'updates') {
      const currentYear = new Date().getFullYear();
      const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        if (year === currentYear) {
          return `${month}-${day}`;
        }
        return `${year}-${month}-${day}`;
      };
      // expandedUpdate state is managed at component level
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {container.tabs.updates.map((update, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a' }}>
                  {formatDate(update.date)}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--theme-primary, #FF743D)',
                    background: 'rgba(255,116,61,0.1)',
                    padding: '2px 10px',
                    borderRadius: 9999,
                  }}
                >
                  {update.version}
                </span>
              </div>
              <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, paddingLeft: 4 }}>
                {update.content}
              </div>
              {update.detail && (
                <button
                  onClick={() => setExpandedUpdate(expandedUpdate === i ? null : i)}
                  style={{
                    fontSize: 13,
                    color: 'var(--theme-primary, #FF743D)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    textAlign: 'left',
                    marginTop: 4,
                  }}
                >
                  {expandedUpdate === i ? '收起详情' : '查看详情'}
                </button>
              )}
              {expandedUpdate === i && update.detail && (
                <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, paddingLeft: 4, marginTop: 8 }}>
                  {update.detail}
                  {update.images && update.images.length > 0 && (
                    <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
                      {update.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`更新图片 ${idx + 1}`}
                          style={{ maxWidth: 200, borderRadius: 8, border: '1px solid #e5e7eb' }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === 'features') {
      const implementedFeatures = container.tabs.features.filter((f) => f.implemented);
      const plannedFeatures = container.tabs.features.filter((f) => !f.implemented);
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {implementedFeatures.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px' }}>
              {implementedFeatures.map((feature, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 0',
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      border: '2px solid var(--theme-primary, #FF743D)',
                      background: 'var(--theme-primary, #FF743D)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6L5 8.5L9.5 4"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span style={{ fontSize: 14, color: '#1a1a1a', fontWeight: 500 }}>
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>
          )}
          {plannedFeatures.length > 0 && (
            <>
              <div style={{ borderTop: '1px dashed #e5e7eb', margin: '8px 0' }} />
              <div style={{ fontSize: 13, color: '#9ca3af', fontWeight: 500, marginBottom: 4 }}>
                开发下一步
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px' }}>
                {plannedFeatures.map((feature, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '8px 0',
                    }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        border: '2px solid #d1d5db',
                        background: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: 14, color: '#9ca3af', fontWeight: 400 }}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      );
    }

    if (activeTab === 'other') {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px' }}>
          {container.tabs.other.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 14px',
                background: '#f9fafb',
                borderRadius: 10,
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#6b7280',
                  minWidth: 80,
                  flexShrink: 0,
                }}
              >
                {item.label}
              </span>
              <span style={{ fontSize: 14, color: '#1a1a1a', fontWeight: 500 }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div
        style={{
          fontSize: 14,
          color: '#374151',
          lineHeight: 1.7,
          whiteSpace: 'pre-line',
          minHeight: 120,
        }}
      >
        {container.tabs[activeTab] as string}
      </div>
    );
  };

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
              background: 'var(--theme-primary, #FF743D)',
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
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
