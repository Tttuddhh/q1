import { useState, useMemo } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { PackageIcon } from '@hugeicons/core-free-icons';
import { containers, containerCategories } from '../data/containers';
import { ContainerCard } from './ContainerCard';
import { ContainerDetailModal } from './ContainerDetailModal';
import type { Container } from '../types';

export function ContainerMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(null);

  const filteredContainers = useMemo(() => {
    if (selectedCategory === '全部') return containers;
    return containers.filter((c) => c.categories.includes(selectedCategory));
  }, [selectedCategory]);

  return (
    <div
      style={{
        flex: 1,
        overflow: 'auto',
        background: '#fff',
      }}
    >
      <div style={{ padding: '32px 40px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: 32,
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: 'var(--theme-primary, #FF743D)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <HugeiconsIcon icon={PackageIcon} size={32} strokeWidth={1.5} color="#fff" />
              </div>
              <h1
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: '#1a1a1a',
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                容器
              </h1>
            </div>
            <div style={{ paddingLeft: 80 }}>
              <div
                style={{
                  fontSize: 14,
                  color: '#6b7280',
                  lineHeight: 1.6,
                  maxWidth: 480,
                }}
              >
                <span style={{ fontWeight: 600, color: '#374151' }}>简述：</span>
                <br />
                测试测试测试测试测试测试测试测试
                <br />
                责任责任，责任，责任，责任，责任，责任，责任责任
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexShrink: 0, marginTop: 8 }}>
            <button
              style={{
                padding: '10px 24px',
              borderRadius: 9999,
              background: 'var(--theme-primary, #FF743D)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            上传容器
          </button>
          <button
            style={{
              padding: '10px 24px',
              borderRadius: 9999,
              background: 'var(--theme-primary, #FF743D)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            我的
          </button>
          </div>
        </div>

        {/* Category filter */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 28,
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {containerCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 9999,
                  background: selectedCategory === cat ? 'var(--theme-primary, #FF743D)' : '#f3f4f6',
                  color: selectedCategory === cat ? '#fff' : '#6b7280',
                  fontSize: 13,
                  fontWeight: selectedCategory === cat ? 600 : 400,
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <button
            style={{
              padding: '8px 20px',
              borderRadius: 9999,
              background: 'var(--theme-primary, #FF743D)',
              color: '#fff',
              fontSize: 13,
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            筛选
          </button>
        </div>

        {/* Grid - responsive auto-fill */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '24px 20px',
          }}
        >
          {filteredContainers.map((container) => (
            <ContainerCard
              key={container.id}
              container={container}
              onSelect={setSelectedContainer}
            />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <ContainerDetailModal
        container={selectedContainer}
        onClose={() => setSelectedContainer(null)}
      />
    </div>
  );
}
