import express from 'express';
import cors from 'cors';

// 1. Initialize the Express application
const app = express();
const PORT = 5001;

// 2. Middleware Configuration
// CORS allows requests from our React app running on port 5173
app.use(cors());

// Express.json() parses incoming JSON bodies sent from requests
app.use(express.json());

// 3. Test Route (GET request to check if server is alive)
app.get('/', (req, res) => {
  res.send('🚀 Code Formatter API is live and running!');
});

// 4. Formatting Endpoint (POST request where React sends raw code to process)
app.post('/api/format', (req, res) => {
  // Extract data sent from the client (React)
  const { code, config } = req.body;

  // Basic validation check
  if (!code) {
    return res.status(400).json({ error: 'No code provided to format.' });
  }

  // --- MOCK FORMATTING LOGIC FOR NOW ---
  // Apply hypothetical style rules based on the config object
  let formattedCode = code;

  if (config?.useSingleQuotes) {
    formattedCode = formattedCode.replace(/"/g, "'");
  }

  if (config?.removeSemicolons) {
    formattedCode = formattedCode.replace(/;/g, '');
  }

  // Send JSON response back to React
  res.json({
    originalCode: code,
    formattedCode: formattedCode,
    rulesApplied: config || {},
    timestamp: new Date().toISOString()
  });
});

// 5. Start listening for network traffic
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});