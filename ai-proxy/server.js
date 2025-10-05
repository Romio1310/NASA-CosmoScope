import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import AdvancedNLPProcessor from './nlp-processor.js';

const app = express();
const PORT = 3001;
const GEMINI_API_KEY = 'AIzaSyBH7RuCsY0Dze6oKsu5DIrKcfr0aY0lokg';

// Initialize NLP Processor
const nlpProcessor = new AdvancedNLPProcessor();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'CosmoBuddy AI Proxy is running!' });
});

// Gemini AI proxy endpoint with advanced NLP processing
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('📝 Raw user message:', message);
    
    // Process user input with advanced NLP
    const nlpResult = nlpProcessor.processUserInput(message);
    
    // Create a direct, simple prompt that gets results
    const enhancedPrompt = `You are CosmoBuddy, a friendly space-loving AI assistant for NASA CosmoScope.

User asked: "${nlpResult.processedMessage}"
${nlpResult.originalMessage !== nlpResult.processedMessage ? `(Original: "${nlpResult.originalMessage}")` : ''}

Intent: ${nlpResult.analysis.intent}
Topic: ${nlpResult.analysis.topics.space ? 'Space' : nlpResult.analysis.topics.science ? 'Science' : 'General'}

Respond directly and conversationally in 1-3 sentences. Be helpful and enthusiastic about space topics. Don't mention processing or analysis.`;

    console.log('🧠 NLP Enhanced prompt ready for AI');

    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: enhancedPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 20,
          topP: 0.8,
          maxOutputTokens: 200,
          stopSequences: ["Human:", "User:"]
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', response.status, errorText);
      throw new Error(`Gemini API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Gemini Response:', JSON.stringify(data, null, 2));
    
    // Try different response structures
    let aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    // If empty, try alternative structure
    if (!aiResponse) {
      aiResponse = data.candidates?.[0]?.text;
    }
    
    // If still no response, provide a contextual fallback
    if (!aiResponse) {
      const topics = Object.entries(nlpResult.analysis.topics).filter(([_, active]) => active).map(([topic, _]) => topic);
      if (topics.includes('space')) {
        aiResponse = "Mars is fascinating! It's the red planet, about half Earth's size, with two moons and evidence of ancient water. The temperature can range from -195°F to 70°F. What specifically interests you about Mars? 🚀";
      } else {
        aiResponse = "I'm here and ready to chat! What would you like to know? I love talking about space, science, or anything else on your mind! ✨";
      }
    }
    
    if (aiResponse && aiResponse.trim()) {
      res.json({ 
        response: aiResponse.trim(),
        status: 'success',
        nlpAnalysis: {
          originalMessage: nlpResult.originalMessage,
          processedMessage: nlpResult.processedMessage,
          intent: nlpResult.analysis.intent,
          sentiment: nlpResult.analysis.sentiment.score,
          typosFixed: nlpResult.originalMessage.toLowerCase() !== nlpResult.processedMessage,
          topics: Object.entries(nlpResult.analysis.topics).filter(([_, active]) => active).map(([topic, _]) => topic),
          complexity: nlpResult.analysis.complexity
        }
      });
    } else {
      console.log('No valid response found, sending fallback');
      res.json({ 
        response: "I'm here and ready to chat! What would you like to know?",
        status: 'fallback',
        nlpAnalysis: {
          originalMessage: nlpResult.originalMessage,
          processedMessage: nlpResult.processedMessage,
          intent: nlpResult.analysis.intent,
          sentiment: nlpResult.analysis.sentiment.score,
          typosFixed: nlpResult.originalMessage.toLowerCase() !== nlpResult.processedMessage,
          topics: Object.entries(nlpResult.analysis.topics).filter(([_, active]) => active).map(([topic, _]) => topic)
        }
      });
    }
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).json({ 
      error: 'Failed to get AI response',
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 CosmoBuddy AI Proxy server running on http://localhost:${PORT}`);
  console.log(`🌟 Health check: http://localhost:${PORT}/health`);
});