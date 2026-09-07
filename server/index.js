import express from 'express';
import cors from 'cors';
import prettier from 'prettier';

const app = express();
const PORT = 5001;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('🚀 Code Formatter API is live and running!');
});

app.post('/api/format', async (req, res) => {
  const { code, config } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'No code provided to format.' });
  }

  try {
    // Run Prettier with dynamic configuration options sent from React
    const formattedCode = await prettier.format(code, {
      parser: 'babel', // Parses standard JavaScript & JSX
      singleQuote: config?.useSingleQuotes ?? true,
      semi: !(config?.removeSemicolons ?? false),
      tabWidth: config?.tabWidth || 2,
    });

    res.json({
      originalCode: code,
      formattedCode: formattedCode,
      rulesApplied: config || {},
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    // Return syntax errors gracefully if the user types invalid JS
    res.status(400).json({
      error: 'Syntax Error in input code',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});