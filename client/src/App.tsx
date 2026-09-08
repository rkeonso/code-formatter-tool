import { useState } from 'react';
import { ConfigPanel } from './components/ConfigPanel';
import { type FormattingConfig, type FormatApiResponse } from './types/formatter';
import Editor from '@monaco-editor/react';

export default function App() {
  const [code, setCode] = useState<string>('const name = "React";\nconsole.log("Hello", name);');
  const [formattedCode, setFormattedCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorDetails, setErrorDetails] = useState<{ message: string; line?: number } | null>(null);

  const [config, setConfig] = useState<FormattingConfig>({
    useSingleQuotes: true,
    removeSemicolons: true,
    tabWidth: 2,
  });

  const handleFormat = async () => {
  setLoading(true);
  setErrorDetails(null); // Clear previous errors

  try {
    const response = await fetch('http://localhost:5001/api/format', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, config }),
    });

    const data = await response.json();

    if (response.ok) {
      setFormattedCode(data.formattedCode);
    } else {
      // Set the structured error message and line number from Express
      setErrorDetails({
        message: data.message || data.error,
        line: data.location?.line,
      });
    }
  } catch (error) {
    setErrorDetails({ message: 'Could not connect to the Express server.' });
  } finally {
    setLoading(false);
  }
 };

  
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      <ConfigPanel config={config} onChange={setConfig} onFormat={handleFormat} loading={loading} />
      
      <main style={{ display: 'flex', flex: 1, padding: '1rem', gap: '1rem', backgroundColor: '#0f172a' }}>
        {/* Left Pane: Input Code */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h4 style={{ color: '#f8fafc', marginBottom: '0.5rem' }}>Input Code</h4>
          {errorDetails && (
            <div style={{ padding: '0.75rem', marginBottom: '0.5rem', backgroundColor: '#451a1a', border: '1px solid #fca5a5', borderRadius: '6px', color: '#fca5a5', fontSize: '0.875rem' }}>
              <strong>🚨 {errorDetails.message}</strong> {errorDetails.line && <span> (at Line {errorDetails.line})</span>}
            </div>
          )}
          <div style={{ flex: 1, borderRadius: '6px', overflow: 'hidden', border: errorDetails ? '1px solid #ef4444' : '1px solid #334155' }}>
            <Editor 
              height="100%" 
              defaultLanguage="javascript" 
              theme="vs-dark" 
              value={code} 
              onChange={(newValue) => setCode(newValue || '')} 
              options={{ fontSize: 14, minimap: { enabled: false }, scrollBeyondLastLine: false, automaticLayout: true, tabSize: config.tabWidth }} 
            />
          </div>
        </div>

        {/* Right Pane: Formatted Output */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h4 style={{ color: '#f8fafc', marginBottom: '0.5rem' }}>Formatted Output</h4>
          <div style={{ flex: 1, borderRadius: '6px', overflow: 'hidden', border: '1px solid #334155' }}>
            <Editor 
              height="100%" 
              defaultLanguage="javascript" 
              theme="vs-dark" 
              value={formattedCode} 
              options={{ readOnly: true, fontSize: 14, minimap: { enabled: false }, scrollBeyondLastLine: false, automaticLayout: true, tabSize: config.tabWidth }} 
            />
          </div>
        </div>
      </main> 
    </div> 
  ); 
}