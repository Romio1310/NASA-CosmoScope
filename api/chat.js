// Vercel API Route for NASA CosmoScope Chatbot
// Correct structure: /api/chat.js

export default async function handler(req, res) {
  // Set CORS headers for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests for chat
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'This endpoint only accepts POST requests'
    });
  }

  try {
    const { message } = req.body;
    
    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Invalid input',
        message: 'A valid message string is required'
      });
    }

    console.log('💬 CosmoBuddy received message:', message.substring(0, 100) + '...');
    
    // Simple typo corrections
    const fixTypos = (text) => {
      const corrections = {
        'wat': 'what', 'hw': 'how', 'u': 'you', 'ur': 'your', 'cant': 'cannot',
        'wnt': 'want', 'teh': 'the', 'adn': 'and', 'eart': 'earth', 'mars': 'Mars',
        'planit': 'planet', 'astronot': 'astronaut', 'nasa': 'NASA', 'spac': 'space'
      };
      
      let fixed = text.toLowerCase();
      Object.entries(corrections).forEach(([typo, correct]) => {
        const regex = new RegExp('\\b' + typo + '\\b', 'g');
        fixed = fixed.replace(regex, correct);
      });
      return fixed;
    };

    // Direct responses for common space topics
    const getDirectResponse = (message) => {
      const msg = message.toLowerCase();
      
      if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('greet')) {
        return "Hey there! 👋 I'm CosmoBuddy, your space-loving AI friend! I'm super excited to chat with you about the cosmos, science, or anything else on your mind. What would you like to explore today? 🚀✨";
      }
      
      if (msg.includes('mars')) {
        return "Mars is absolutely fascinating! 🔴 It's the fourth planet from the Sun, about half Earth's size, with two small moons named Phobos and Deimos. The red color comes from iron oxide (rust) covering its surface! Temperatures range from -195°F to 70°F, and scientists have found evidence of ancient water flows. We're actively searching for signs of past life there! What aspect of Mars interests you most? 🚀";
      }
      
      if (msg.includes('earth')) {
        return "Earth is our incredible blue marble! 🌍 It's the third planet from the Sun and the only known planet with life. About 71% of Earth's surface is covered in water, which gives it that beautiful blue appearance from space. We have one moon, and it takes exactly 365.25 days to orbit the Sun. Our atmosphere is perfect for life - 78% nitrogen, 21% oxygen! What would you like to know about our amazing home planet? ✨";
      }
      
      if (msg.includes('space') || msg.includes('universe') || msg.includes('cosmos')) {
        return "Space is absolutely mind-blowing! 🌌 The universe is about 13.8 billion years old and contains billions of galaxies, each with billions of stars. Our own galaxy, the Milky Way, has over 200 billion stars! Space might seem empty, but it's filled with incredible phenomena like black holes, nebulae, pulsars, and potentially habitable exoplanets. What aspect of the cosmos fascinates you most? 🚀";
      }
      
      if (msg.includes('sun')) {
        return "The Sun is our magnificent local star! ☀️ It's a massive ball of hot plasma, about 109 times wider than Earth and 333,000 times more massive! The core temperature reaches an incredible 27 million degrees Fahrenheit. It generates energy through nuclear fusion, converting hydrogen into helium and providing all the energy for life on Earth. Fun fact: The Sun is about 4.6 billion years old and has enough fuel to keep shining for another 5 billion years! 🌟";
      }
      
      if (msg.includes('moon')) {
        return "The Moon is Earth's faithful companion! 🌙 It's about 1/4 the size of Earth and sits roughly 238,855 miles away. The Moon creates our ocean tides and helps stabilize Earth's rotation and seasons. Here's something cool: the same side always faces Earth because the Moon's rotation period matches its orbital period - this is called tidal locking! The Apollo missions brought back 842 pounds of moon rocks between 1969-1972. What would you like to know about our lunar neighbor? 🌕";
      }
      
      if (msg.includes('rocket') || msg.includes('launch')) {
        return "Rockets are engineering marvels! 🚀 They work on Newton's third law - for every action, there's an equal and opposite reaction. They burn fuel to create extremely hot gases that shoot out the bottom at incredible speeds, pushing the rocket upward. The faster the exhaust velocity, the more thrust generated! Modern rockets use liquid oxygen with fuels like RP-1 or hydrogen. It's essentially a controlled explosion pointing downward to go up! Pretty amazing engineering, right? ✨";
      }
      
      if (msg.includes('black hole')) {
        return "Black holes are absolutely mind-bending! 🕳️ They're regions in space where gravity is so incredibly strong that nothing can escape once it crosses the event horizon - not even light! They form when massive stars (at least 20-25 times our Sun's mass) collapse at the end of their lives. Here's the really wild part: time actually slows down near them due to Einstein's theory of relativity! In 2019, scientists captured the first image of a black hole in galaxy M87. Space physics is incredible! 🌌";
      }
      
      if (msg.includes('astronaut') || msg.includes('spacewalk')) {
        return "Astronauts are real-life space heroes! 👨‍🚀 They undergo years of intense training to live and work in the harsh environment of space. On the International Space Station, they conduct scientific experiments, maintain equipment, and help us learn about long-term space habitation. Fun fact: In microgravity, astronauts actually grow about 2 inches taller because their spine stretches without gravity's compression! They also must exercise 2.5 hours daily to prevent muscle and bone loss. What aspect of space exploration interests you most? 🚀";
      }
      
      return null; // No direct match found, will use AI
    };
    
    // Process the message
    const fixedMessage = fixTypos(message);
    const wasFixed = message !== fixedMessage;
    
    console.log('🔧 Message processing:', wasFixed ? 'Typos corrected' : 'No corrections needed');
    
    // Try direct response first (faster and more reliable)
    const directResponse = getDirectResponse(fixedMessage);
    if (directResponse) {
      console.log('⚡ Using direct response for fast reply');
      return res.status(200).json({ 
        response: directResponse,
        status: 'direct',
        typosFixed: wasFixed,
        source: 'CosmoBuddy Direct Knowledge'
      });
    }

    // Fall back to Google Gemini AI for complex/unique questions
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      console.error('❌ GEMINI_API_KEY environment variable not found');
      return res.status(200).json({ 
        response: "I'm having some technical difficulties with my AI brain right now, but I'm still here to help! 🛠️ Try asking me something about space - I have lots of knowledge stored up about planets, stars, rockets, and space missions! 🚀✨",
        status: 'fallback',
        typosFixed: wasFixed,
        source: 'CosmoBuddy Fallback'
      });
    }

    console.log('🤖 Using Gemini AI for complex query...');

    const aiPrompt = `You are CosmoBuddy, the friendly and enthusiastic AI assistant for NASA CosmoScope. You love space, science, and helping people explore the cosmos.

User message: "${fixedMessage}"

Respond as CosmoBuddy with:
- Natural, conversational tone (like talking to a friend)
- Enthusiasm for space and science
- 1-2 sentences maximum
- Use appropriate emojis (🚀🌌⭐🌟✨) if relevant
- Be helpful and encouraging

Keep it concise but engaging!`;

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
          topP: 0.9,
          topK: 20
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!geminiResponse.ok) {
      console.error(`❌ Gemini API error: ${geminiResponse.status} ${geminiResponse.statusText}`);
      throw new Error(`Gemini API responded with status ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();
    const aiResponse = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (aiResponse && aiResponse.trim()) {
      console.log('✅ Gemini AI response generated successfully');
      return res.status(200).json({ 
        response: aiResponse.trim(),
        status: 'ai',
        typosFixed: wasFixed,
        source: 'CosmoBuddy AI (Gemini)'
      });
    } else {
      console.log('🎯 Gemini returned empty response, using fallback');
      return res.status(200).json({ 
        response: "I'm here and ready to help! What would you like to know? I love talking about space, science, NASA missions, or anything else that sparks your curiosity! 🚀✨",
        status: 'fallback',
        typosFixed: wasFixed,
        source: 'CosmoBuddy Fallback'
      });
    }

  } catch (error) {
    console.error('❌ CosmoBuddy API Error:', error.message);
    
    // Return a friendly error response instead of throwing
    return res.status(200).json({ 
      response: "Oops! I'm having some technical hiccups right now! 🛠️ But don't worry - I'm still here to help. Try asking me something about space and I'll do my best to give you an awesome answer! 🚀✨",
      status: 'error',
      typosFixed: false,
      source: 'CosmoBuddy Error Handler',
      error: error.message
    });
  }
}