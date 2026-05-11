import { Sparkles, Plus } from 'lucide-react';
import { useTranslation } from '../i18n';

interface EmptyStateProps {
  onCreatePage?: () => void;
}

export function EmptyState({ onCreatePage }: EmptyStateProps) {
  const { t } = useTranslation();

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 48px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          maxWidth: 400,
        }}
      >
        <Sparkles size={64} color="var(--color-primary)" />
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginTop: 24,
            marginBottom: 8,
            color: '#1a1a1a',
          }}
        >
          {t('empty.title')}
        </h2>
        <p style={{ color: '#6b7280', marginBottom: 24 }}>
          {t('empty.description')}
        </p>
        <button
          onClick={() => onCreatePage?.()}
          style={{
            padding: '12px 24px',
            borderRadius: 12,
            border: 'none',
            color: '#ffffff',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'linear-gradient(135deg, var(--color-primary), rgb(255, 143, 107))',
            boxShadow: '0 4px 12px color-mix(in srgb, var(--color-primary) 30%, transparent)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 20px color-mix(in srgb, var(--color-primary) 40%, transparent)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px color-mix(in srgb, var(--color-primary) 30%, transparent)';
          }}
        >
          <Plus size={18} />
          {t('empty.create')}
        </button>
      </div>
    </div>
  );
}
