import type { Container } from '../types';

interface ContainerCardProps {
  container: Container;
  onSelect: (container: Container) => void;
}

export function ContainerCard({ container, onSelect }: ContainerCardProps) {
  return (
    <div
      onClick={() => onSelect(container)}
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      {/* Cover area - 16:10 ratio */}
      <div
        style={{
          width: '100%',
          aspectRatio: '16/10',
          borderRadius: 10,
          background: '#f3f4f6',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 10,
            background: container.iconColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 24, color: '#fff' }}>📦</span>
        </div>
      </div>

      {/* Info row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2px',
        }}
      >
        <span
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: '#1a1a1a',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            flex: 1,
            marginRight: 8,
          }}
        >
          {container.name}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <span style={{ fontSize: 13, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: '#f59e0b' }}>★</span>
            <span>{container.rating}</span>
          </span>
          <span style={{ fontSize: 13, color: '#6b7280' }}>
            {container.installs >= 10000
              ? `${(container.installs / 10000).toFixed(1)}万`
              : container.installs}
            {' '}下载
          </span>
        </div>
      </div>

      {/* Category tags */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          flexWrap: 'wrap',
          padding: '0 2px',
          marginTop: 2,
        }}
      >
        {container.categories.map((cat) => (
          <span
            key={cat}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '3px 12px',
              borderRadius: 9999,
              background: '#e5e7eb',
              color: '#9ca3af',
              fontSize: 12,
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}
