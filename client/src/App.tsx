import { useState } from 'react';
import { ConfigPanel } from './components/ConfigPanel';
import { type FormattingConfig, type FormatApiResponse } from './types/formatter';

export default function App() {
  const [code, setCode] = useState<string>('const name = "React";\nconsole.log("Hello", name);');
  const [formattedCode, setFormattedCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [config, setConfig] = useState<FormattingConfig>({
    useSingleQuotes: true,
    removeSemicolons: true,
    tabWidth: 2,
  });

  const handleFormat = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/format', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, config }),
      });

      const data: FormatApiResponse = await response.json();

      if (response.ok) {
        setFormattedCode(data.formattedCode);
      } else {
        alert(data.error || 'Formatting failed');
      }
    } catch (error) {
      console.error('Error connecting to Node server:', error);
      alert('Could not connect to the backend server.');
    } finally {
      setLoading(false);
    }
  };

  // Inside App component in src/App.tsx:
  const handleTestFormat = () => {
    setFormattedCode("const test = 'Works!';");
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      <ConfigPanel
        config={config}
        onChange={setConfig}
        onFormat={handleFormat}
        loading={loading}
      />

    <main style={{ display: 'flex', flex: 1, padding: '1rem', gap: '1rem' }}>
  {/* Left: Input Textarea */}
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
    <h4 style={{ color: '#0f172a' }}>Input Code</h4>
    <textarea
      value={code}
      onChange={(e) => setCode(e.target.value)}
      style={{
        flex: 1,
        fontFamily: 'monospace',
        fontSize: '14px',
        padding: '0.75rem',
        backgroundColor: '#ffffff',
        color: '#0f172a', /* Dark slate text color */
        border: '1px solid #cbd5e1',
        borderRadius: '6px',
        outline: 'none',
      }}
    />
  </div>

  {/* Right: Formatted Output Textarea */}
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
    <h4 style={{ color: '#0f172a' }}>Formatted Output</h4>
    <textarea
      value={formattedCode}
      readOnly
      placeholder="Formatted code will appear here..."
      style={{
        flex: 1,
        fontFamily: 'monospace',
        fontSize: '14px',
        padding: '0.75rem',
        backgroundColor: '#f8fafc', /* Light gray background */
        color: '#0f172a', /* Dark slate text color */
        border: '1px solid #cbd5e1',
        borderRadius: '6px',
        outline: 'none',
      }}
    />
  </div>
</main>
  </div>
  );
}