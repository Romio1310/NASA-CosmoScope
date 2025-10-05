// Vercel API Health Check
export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  
  res.status(200).json({
    status: 'OK',
    message: 'CosmoBuddy API is running on Vercel!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    hasApiKey: !!GEMINI_API_KEY,
    apiKeyLength: GEMINI_API_KEY ? GEMINI_API_KEY.length : 0,
    method: req.method,
    url: req.url
  });
}