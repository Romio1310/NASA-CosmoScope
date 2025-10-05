// Vercel API Route for NASA CosmoScope Chatbot
export default async function handler(req, res) {
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { message } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Valid message is required' });
    }

    console.log('💬 Received message:', message);
    
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
      
      if (msg.includes('earth')) {
        return "Earth is our amazing blue planet! 🌍 It's the third planet from the Sun and the only known planet with life. About 71% of Earth's surface is water, which is why it looks blue from space. What would you like to know about our home planet? ✨";
      }
      
      if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
        return "Hey there! 👋 I'm CosmoBuddy, your space-loving AI friend! I'm super excited to chat with you about anything - space, science, or whatever's on your mind. What would you like to explore today? 🚀✨";
      }
      
      if (msg.includes('space') || msg.includes('universe')) {
        return "Space is incredible! 🌌 The universe is about 13.8 billion years old and contains billions of galaxies, each with billions of stars. Our galaxy, the Milky Way, has over 200 billion stars! What aspect of space fascinates you most? 🚀";
      }
      
      if (msg.includes('sun')) {
        return "The Sun is our local star! ☀️ It's a massive ball of hot plasma, about 109 times wider than Earth. The Sun's core temperature reaches 27 million degrees Fahrenheit! Fun fact: The Sun is about 4.6 billion years old and has enough fuel to shine for another 5 billion years! 🌟";
      }
      
      if (msg.includes('moon')) {
        return "The Moon is Earth's only natural satellite! 🌙 It's about 1/4 the size of Earth and 238,855 miles away. The Moon causes our tides and helps stabilize Earth's rotation. Fun fact: The same side always faces Earth! 🌕";
      }
      
      return null;
    };
    
    // Fix typos first
    const fixedMessage = fixTypos(message);
    console.log('🔧 Fixed message:', fixedMessage);
    
    // Try direct response first
    const directResponse = getDirectResponse(fixedMessage);
    if (directResponse) {
      console.log('⚡ Using direct response');
      return res.status(200).json({ 
        response: directResponse,
        status: 'direct',
        typosFixed: message !== fixedMessage
      });
    }

    // Use Google Gemini AI for complex questions
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      console.error('❌ GEMINI_API_KEY not found in environment variables');
      return res.status(500).json({ 
        error: 'API configuration error',
        response: "I'm having some technical difficulties right now, but I'm still here to help! Try asking me something about space - I have lots of knowledge stored up! 🚀✨"
      });
    }

    console.log('🤖 Using Gemini AI...');

    const aiPrompt = `You are CosmoBuddy, a friendly AI assistant who loves space and science for NASA CosmoScope.

User asked: "${fixedMessage}"

Respond naturally and enthusiastically in 1-2 sentences. If it's about space, show excitement with emojis. Be conversational and helpful.`;

    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ text: aiPrompt }] 
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 150,
          topP: 0.8,
          topK: 10
        }
      })
    });

    if (!geminiResponse.ok) {
      console.error('❌ Gemini API error:', geminiResponse.status);
      throw new Error(`Gemini API error: ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();
    const aiResponse = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (aiResponse && aiResponse.trim()) {
      console.log('✅ AI response generated');
      return res.status(200).json({ 
        response: aiResponse.trim(),
        status: 'ai',
        typosFixed: message !== fixedMessage
      });
    } else {
      console.log('🎯 Using fallback response');
      return res.status(200).json({ 
        response: "I'm here and ready to help! What would you like to know? I love talking about space, science, or anything else! 🚀✨",
        status: 'fallback',
        typosFixed: message !== fixedMessage
      });
    }

  } catch (error) {
    console.error('❌ API Error:', error.message);
    return res.status(500).json({ 
      error: 'Internal server error',
      response: "Sorry, I'm having some technical hiccups! 🛠️ But I'm still here - try asking me something about space and I'll do my best to help! 🚀",
      details: error.message
    });
  }
}