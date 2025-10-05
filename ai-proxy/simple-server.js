import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3001;
const GEMINI_API_KEY = 'AIzaSyBH7RuCsY0Dze6oKsu5DIrKcfr0aY0lokg';

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
    return "Mars is the red planet! 🔴 It's the fourth planet from the Sun, about half Earth's size, with two small moons (Phobos and Deimos). The surface is covered in iron oxide (rust), giving it that iconic red color. Temperatures range from -195°F to 70°F. Scientists have found evidence of ancient water flows and are actively searching for signs of past life! What else about Mars interests you? 🚀";
  }
  
  if (msg.includes('earth')) {
    return "Earth is our amazing blue planet! 🌍 It's the third planet from the Sun and the only known planet with life. About 71% of Earth's surface is water, which is why it looks blue from space. Earth has one moon and takes 365.25 days to orbit the Sun. The atmosphere is perfect for life - 78% nitrogen, 21% oxygen! What would you like to know about our home planet? ✨";
  }
  
  if (msg.includes('space') || msg.includes('universe')) {
    return "Space is incredible! 🌌 The universe is about 13.8 billion years old and contains billions of galaxies, each with billions of stars. Our galaxy, the Milky Way, has over 200 billion stars! Space is mostly empty, but it's filled with amazing phenomena like black holes, nebulae, and potentially habitable planets. What aspect of space fascinates you most? 🚀";
  }
  
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return "Hey there! 👋 I'm CosmoBuddy, your space-loving AI friend! I'm super excited to chat with you about anything - space, science, or whatever's on your mind. What would you like to explore today? 🚀✨";
  }
  
  if (msg.includes('sun')) {
    return "The Sun is our local star! ☀️ It's a massive ball of hot plasma, about 109 times wider than Earth. The Sun's core temperature reaches 27 million degrees Fahrenheit! It provides all the energy for life on Earth through nuclear fusion, converting hydrogen into helium. Fun fact: The Sun is about 4.6 billion years old and has enough fuel to shine for another 5 billion years! 🌟";
  }
  
  if (msg.includes('rocket')) {
    return "Rockets work on Newton's third law - for every action, there's an equal and opposite reaction! 🚀 They burn fuel to create hot gases that shoot out the bottom at high speed, pushing the rocket upward. The faster the exhaust, the more thrust! Modern rockets use liquid oxygen and fuel like RP-1 or hydrogen. It's like a controlled explosion pointing downward to go up! Pretty cool, right? ✨";
  }
  
  if (msg.includes('moon')) {
    return "The Moon is Earth's only natural satellite! 🌙 It's about 1/4 the size of Earth and 238,855 miles away. The Moon causes our tides and helps stabilize Earth's rotation. Fun fact: The same side always faces Earth because the Moon's rotation matches its orbit! Apollo missions brought back 842 pounds of moon rocks. What would you like to know about our lunar neighbor? 🌕";
  }
  
  if (msg.includes('jupiter')) {
    return "Jupiter is the giant of our solar system! 🪐 It's so massive that all other planets combined could fit inside it! Jupiter has over 80 moons, including the four largest: Io, Europa, Ganymede, and Callisto. The Great Red Spot is a storm bigger than Earth that's been raging for centuries! Jupiter acts like a cosmic vacuum cleaner, protecting inner planets from asteroids. Amazing, right? 🌟";
  }
  
  if (msg.includes('black hole')) {
    return "Black holes are mind-blowing! 🕳️ They're regions where gravity is so strong that nothing can escape - not even light! They form when massive stars collapse. The edge is called the event horizon - cross it and you're gone forever! But here's the weird part: time slows down near them due to Einstein's relativity. Scientists recently photographed one in galaxy M87! Space is wild! 🌌";
  }
  
  if (msg.includes('astronaut')) {
    return "Astronauts are space heroes! 👨‍🚀 They train for years to live and work in zero gravity. On the ISS, they conduct experiments, maintain equipment, and help us learn about living in space. Fun fact: In space, astronauts grow about 2 inches taller because their spine stretches without gravity! They also have to exercise 2.5 hours daily to prevent muscle loss. What about space travel interests you? 🚀";
  }
  
  return null; // No direct match, use AI
};

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'CosmoBuddy AI Proxy is running!' });
});

// Simple, direct chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('💬 User message:', message);
    
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
    const aiPrompt = `You are CosmoBuddy, a friendly AI assistant who loves space and science. 

User asked: "${fixedMessage}"

Give a helpful, enthusiastic response in 1-2 sentences. Be friendly and conversational. If it's about space, show excitement with appropriate emojis.`;

    console.log('🤖 Using AI for response...');

    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
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
});

app.listen(PORT, () => {
  console.log(`🚀 CosmoBuddy Simple Proxy running on http://localhost:${PORT}`);
  console.log(`🌟 Health check: http://localhost:${PORT}/health`);
});

export default app;