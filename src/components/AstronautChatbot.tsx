import { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, RotateCcw, CheckCircle, Brain } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  nlpAnalysis?: {
    originalMessage?: string;
    processedMessage?: string;
    intent?: string;
    sentiment?: number;
    typosFixed?: boolean;
    topics?: string[];
    complexity?: string;
  };
}

interface ConversationTurn {
  user: string;
  assistant: string;
}

const AstronautChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey there! 👋 I'm CosmoBuddy! Think of me as your curious friend who loves space but is genuinely interested in everything. I remember our conversations as we go, so we can have real back-and-forth chats! What's on your mind today? Could be anything - space adventures, random thoughts, or just what you had for lunch! 😄",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ConversationTurn[]>([]);
  const [showNLPIndicator, setShowNLPIndicator] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Build conversation context for AI
  const buildConversationContext = (newUserMessage: string): string => {
    let context = `You are CosmoBuddy, a friendly and enthusiastic AI assistant for NASA CosmoScope. Chat like you're a real person having a natural conversation! 

Personality:
- Talk like a friend, not a formal assistant
- Be curious and ask follow-up questions sometimes
- Use natural language, contractions, and casual expressions
- Show genuine interest in what the user is saying
- Reference our previous conversation naturally
- Use emojis but don't overdo it
- Be conversational and engaging (2-5 sentences)
- Express opinions and personality
- If discussing space, show genuine excitement but discuss other topics naturally too

Chat naturally - imagine you're texting a friend who happens to know a lot about space and science!

`;

    if (conversationHistory.length > 0) {
      context += "\nOur conversation so far:\n";
      // Include last 6 conversation turns for better context
      const recentHistory = conversationHistory.slice(-6);
      recentHistory.forEach((turn, index) => {
        context += `${index === 0 && conversationHistory.length > 6 ? '...\n' : ''}User: ${turn.user}\nYou: ${turn.assistant}\n\n`;
      });
    }

    context += `User just said: ${newUserMessage}\n\nRespond naturally as CosmoBuddy:`;
    return context;
  };

  // AI Proxy integration with conversation context
  const getAIResponse = async (userMessage: string): Promise<{ response: string; nlpAnalysis?: any }> => {
    try {
      console.log('Sending message to AI proxy:', userMessage);
      
      const contextualPrompt = buildConversationContext(userMessage);
      
      // Use Vercel API in production, local server in development
      const isProduction = !window.location.hostname.includes('localhost');
      const apiUrl = isProduction ? '/api/chat' : 'http://localhost:3001/api/chat';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: contextualPrompt
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Proxy Error:', response.status, errorData);
        throw new Error(`Proxy Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Proxy Response:', data);
      
      // Log NLP analysis if available
      if (data.nlpAnalysis) {
        console.log('🧠 NLP Analysis:', data.nlpAnalysis);
        
        // Show user if their message was corrected
        if (data.nlpAnalysis.typosFixed) {
          console.log('✅ Fixed typos/grammar:', data.nlpAnalysis.originalMessage, '→', data.nlpAnalysis.processedMessage);
        }
      }
      
      if (data.response && data.response.trim()) {
        return { 
          response: data.response.trim(), 
          nlpAnalysis: data.nlpAnalysis 
        };
      } else {
        throw new Error('Empty response from AI proxy');
      }
    } catch (error) {
      console.error('AI Response Error:', error);
      
      // More natural fallback responses based on conversation context
      const message = userMessage.toLowerCase();
      const responses = [];
      
      // Context-aware responses
      if (conversationHistory.length > 0) {
        const lastResponse = conversationHistory[conversationHistory.length - 1];
        const lastTopic = lastResponse?.user.toLowerCase();
        
        if (lastTopic?.includes('space') || lastTopic?.includes('mars') || lastTopic?.includes('moon')) {
          responses.push(`My connection's acting up, but I remember we were just talking about space! 🚀 That got me excited. What else would you like to know?`);
        } else if (lastTopic?.includes('science') || lastTopic?.includes('technology')) {
          responses.push(`Hmm, my systems are having a moment... but I was enjoying our science chat! Can you ask me that again?`);
        } else {
          responses.push(`Sorry, I'm having some technical hiccups! But I remember what we were discussing. Mind repeating that?`);
        }
      }
      
      // Greeting responses
      if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('sup')) {
        responses.push(
          "Hey there! 👋 I'm CosmoBuddy - think of me as your space-loving friend who's always up for a chat about anything!",
          "Hi! Great to meet you! I'm CosmoBuddy and I love talking about... well, everything! Space, life, random thoughts - what's on your mind?",
          "Hello! 🌟 I'm CosmoBuddy! I'm genuinely excited to chat with you. What's something interesting that happened to you today?"
        );
      }
      
      // Topic-specific responses
      if (message.includes('space') || message.includes('nasa') || message.includes('planet') || message.includes('star')) {
        responses.push(
          "Oh, a space question! 🚀 I'm having connection troubles but this is totally my jam! Can you try asking again?",
          "Space topics are my absolute favorite! 🌌 My connection's being weird though - mind asking that once more?"
        );
      } else if (message.includes('how are you') || message.includes('how you doing')) {
        responses.push(
          "I'm doing great! Well, except for these connection hiccups... but hey, I love chatting with people! How are YOU doing?",
          "Pretty good! Just dealing with some technical gremlins, but I'm excited to talk with you! What's up?"
        );
      } else {
        responses.push(
          "My connection's being finicky right now! 🤖 But I'm really interested in what you're asking. Can you try once more?",
          "Ugh, technical difficulties! But I want to properly answer that - can you ask again?",
          "Sorry, my systems are hiccuping! I'm definitely here and want to chat though. Try me again?"
        );
      }
      
      // Return a random response for variety
      return { 
        response: responses[Math.floor(Math.random() * responses.length)],
        nlpAnalysis: undefined
      };
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    const userInput = inputText;
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const aiResult = await getAIResponse(userInput);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResult.response,
        sender: 'bot',
        timestamp: new Date(),
        nlpAnalysis: aiResult.nlpAnalysis
      };
      
      // Update conversation history
      setConversationHistory(prev => [...prev, {
        user: userInput,
        assistant: aiResult.response
      }]);
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm experiencing some cosmic interference! 🛰️ Please try asking your question again, space explorer!",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([
      {
        id: '1',
        text: "Fresh start! 🔄 Alright, I'm ready for whatever you want to chat about. What's been on your mind lately?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
    setConversationHistory([]);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 w-96 h-[500px] bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl shadow-2xl border border-cyan-500/30 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                <img 
                  src="/astronaut-normal.png" 
                  alt="CosmoBuddy"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <h3 className="text-white font-semibold">CosmoBuddy</h3>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <p className="text-cyan-100 text-xs">AI Assistant • Context Aware</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearConversation}
                className="text-cyan-100 hover:text-white transition-colors hover:bg-white/10 rounded-full p-1"
                title="Clear conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-cyan-100 hover:text-white transition-colors hover:bg-white/10 rounded-full p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-slate-900/50 to-slate-950 scroll-smooth scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-slate-800/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-xl text-sm shadow-lg ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : 'bg-slate-700/80 text-slate-100 border border-slate-600/50 relative'
                  }`}
                >
                  {message.sender === 'bot' && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-2 h-2 text-white" />
                    </div>
                  )}
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-slate-700/80 text-slate-100 px-4 py-2 rounded-xl text-sm border border-slate-600/50">
                  <div className="flex space-x-1 items-center">
                    <span className="text-xs text-slate-300 mr-2">CosmoBuddy is thinking</span>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 bg-slate-800/80 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-slate-700/50 placeholder-slate-400"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-slate-600 disabled:to-slate-600 text-white p-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Astronaut Button */}
      <div className="fixed bottom-12 right-8 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative w-36 h-36 transition-all duration-300 hover:scale-110 focus:outline-none"
        >
          {/* Astronaut character */}
          <img 
            src={isHovered ? "/astronaut-waving.png" : "/astronaut-normal.png"}
            alt="CosmoBuddy Astronaut"
            className={`w-full h-full object-contain transition-all duration-500 ${
              isHovered ? 'scale-110 rotate-12' : 'animate-pulse'
            }`}
            style={{
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4)) drop-shadow(0 0 20px rgba(6, 182, 212, 0.3))'
            }}
          />

          {/* Interactive elements on hover */}
          {isHovered && (
            <>
              <div className="absolute -top-2 -left-2 text-lg animate-ping">⭐</div>
              <div className="absolute -bottom-2 -left-3 text-lg animate-ping" style={{ animationDelay: '0.5s' }}>✨</div>
              <div className="absolute -top-3 right-1 text-lg animate-ping" style={{ animationDelay: '1s' }}>🌟</div>
            </>
          )}
        </button>

        {/* Enhanced Tooltip */}
        {isHovered && !isOpen && (
          <div className="absolute bottom-40 right-0 bg-gradient-to-r from-slate-900 to-slate-800 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-2xl border border-cyan-500/30 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center space-x-2">
              <span>🚀</span>
              <span>Chat with CosmoBuddy!</span>
              <span className="text-xs text-cyan-300">(Context Aware)</span>
            </div>
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
          </div>
        )}

        {/* Floating particles effect */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-2 h-2 bg-cyan-300 rounded-full animate-ping" style={{ top: '10%', left: '15%', animationDelay: '0s' }}></div>
            <div className="absolute w-2 h-2 bg-blue-300 rounded-full animate-ping" style={{ top: '85%', right: '10%', animationDelay: '0.3s' }}></div>
            <div className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-ping" style={{ top: '25%', right: '5%', animationDelay: '0.6s' }}></div>
            <div className="absolute w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ bottom: '15%', left: '5%', animationDelay: '0.9s' }}></div>
          </div>
        )}
      </div>
    </>
  );
};

export default AstronautChatbot;