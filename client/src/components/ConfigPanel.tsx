import React from 'react';
import { type FormattingConfig } from '../types/formatter';

interface ConfigPanelProps {
  config: FormattingConfig;
  onChange: (updatedConfig: FormattingConfig) => void;
  onFormat: () => void;
  loading: boolean;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
  config,
  onChange,
  onFormat,
  loading,
}) => {
  return (
    <div className="config-panel" style={{ padding: '1rem', borderRight: '1px solid #ccc' }}>
      <h3>Formatting Rules</h3>

      <label style={{ display: 'block', marginBottom: '0.5rem' }}>
        <input
          type="checkbox"
          checked={config.useSingleQuotes}
          onChange={(e) => onChange({ ...config, useSingleQuotes: e.target.checked })}
        />
        Use Single Quotes ( ' )
      </label>

      <label style={{ display: 'block', marginBottom: '1rem' }}>
        <input
          type="checkbox"
          checked={config.removeSemicolons}
          onChange={(e) => onChange({ ...config, removeSemicolons: e.target.checked })}
        />
        Remove Semicolons ( ; )
      </label>

      <button
        onClick={onFormat}
        disabled={loading}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#4f46e5',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Formatting...' : 'Format Code ⚡'}
      </button>
    </div>
  );
};