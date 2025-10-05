// Vercel Serverless Function for AI Chat
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('💬 User message:', message);
    
    // Simple typo corrections
    const fixTypos = (text) => {
      const corrections = {
        'wat': 'what', 'hw': 'how', 'u': 'you', 'ur': 'your', 'cant': 'cannot',
        'wnt': 'want', 'teh': 'the', 'adn': 'and', 'eart': 'earth', 'mars': 'Mars',
        'planit': 'planet', 'astronot': 'astronaut', 'nasa': 'NASA'
      };
      
      let fixed = text.toLowerCase();
      for (const [typo, correct] of Object.entries(corrections)) {
        fixed = fixed.replace(new RegExp('\\b' + typo + '\\b', 'g'), correct);
      }
      return fixed;
    };

    // Simple responses for space questions
    const getDirectResponse = (message) => {
      const msg = message.toLowerCase();
      
      if (msg.includes('mars')) {
        return "Mars is the red planet! 🔴 It's the fourth planet from the Sun, about half Earth's size, with two small moons (Phobos and Deimos). The surface is covered in iron oxide (rust), giving it that iconic red color. What else about Mars interests you? 🚀";
      }
      
      if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
        return "Hey there! 👋 I'm CosmoBuddy, your space-loving AI friend! I'm super excited to chat with you about anything - space, science, or whatever's on your mind. What would you like to explore today? 🚀✨";
      }
      
      if (msg.includes('space') || msg.includes('universe')) {
        return "Space is incredible! 🌌 The universe is about 13.8 billion years old and contains billions of galaxies, each with billions of stars. Our galaxy, the Milky Way, has over 200 billion stars! What aspect of space fascinates you most? 🚀";
      }
      
      return null;
    };
    
    // Fix common typos
    const fixedMessage = fixTypos(message);
    console.log('🔧 Fixed message:', fixedMessage);
    
    // Try direct response first
    const directResponse = getDirectResponse(fixedMessage);
    if (directResponse) {
      console.log('⚡ Direct response used');
      return res.json({ 
        response: directResponse,
        status: 'direct',
        typosFixed: message !== fixedMessage
      });
    }

    // Use AI for complex questions
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    const aiPrompt = `You are CosmoBuddy, a friendly AI assistant who loves space and science. 

User asked: "${fixedMessage}"

Give a helpful, enthusiastic response in 1-2 sentences. Be friendly and conversational. If it's about space, show excitement with appropriate emojis.`;

    console.log('🤖 Using AI for response...');

    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: aiPrompt }] }],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 150,
          topP: 0.8,
          topK: 10
        }
      })
    });

    if (!response.ok) {
      throw new Error(`AI Error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (aiResponse && aiResponse.trim()) {
      console.log('✅ AI response:', aiResponse);
      res.json({ 
        response: aiResponse.trim(),
        status: 'ai',
        typosFixed: message !== fixedMessage
      });
    } else {
      console.log('🎯 Using fallback');
      res.json({ 
        response: "I'm here and ready to help! What would you like to know? I love talking about space, science, or anything else! 🚀✨",
        status: 'fallback',
        typosFixed: message !== fixedMessage
      });
    }

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ 
      error: 'Failed to get response',
      message: error.message 
    });
  }
}