#!/usr/bin/env node

console.log('🚀 CosmoBuddy API Test Script');
console.log('===============================');

const testAPI = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: "You are CosmoBuddy, a friendly space-loving AI assistant. Chat naturally like a real friend! User just said: Hey CosmoBuddy, what's the coolest thing about space? Respond conversationally as CosmoBuddy:"
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ API WORKING! Response:', data.response);
      console.log('\n🎉 CosmoBuddy is ready for natural conversations!');
    } else {
      const errorData = await response.json();
      if (errorData.message && errorData.message.includes('429')) {
        console.log('⏳ API quota still exceeded. Will retry in 10 seconds...');
        setTimeout(() => {
          console.log('🔄 Retrying...');
          testAPI();
        }, 10000);
      } else {
        console.log('❌ API Error:', errorData);
      }
    }
  } catch (error) {
    console.log('❌ Connection Error:', error.message);
    console.log('💡 Make sure the proxy server is running: cd ai-proxy && node server.js');
  }
};

console.log('🔍 Testing API connection...');
testAPI();