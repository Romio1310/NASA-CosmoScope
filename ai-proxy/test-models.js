import fetch from 'node-fetch';

const GEMINI_API_KEY = 'AIzaSyCtksvwfMsT-slZXD3PUejUh_0hUarygDg';

// Test available models
async function testModels() {
  try {
    console.log('Testing Gemini API connection...');
    
    // List available models
    const listResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${GEMINI_API_KEY}`);
    
    if (!listResponse.ok) {
      const errorText = await listResponse.text();
      console.error('List models error:', listResponse.status, errorText);
      return;
    }
    
    const models = await listResponse.json();
    console.log('Available models:', JSON.stringify(models, null, 2));
    
    // Find a suitable model for generateContent
    const generateModels = models.models?.filter(model => 
      model.supportedGenerationMethods?.includes('generateContent')
    );
    
    console.log('Models that support generateContent:', generateModels?.map(m => m.name));
    
    if (generateModels && generateModels.length > 0) {
      const modelName = generateModels[0].name;
      console.log(`Testing with model: ${modelName}`);
      
      // Test generation with the first available model
      const testResponse = await fetch(`https://generativelanguage.googleapis.com/v1/${modelName}:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "Hello! Can you tell me what is Earth?"
            }]
          }]
        })
      });
      
      if (!testResponse.ok) {
        const errorText = await testResponse.text();
        console.error('Generate content error:', testResponse.status, errorText);
        return;
      }
      
      const result = await testResponse.json();
      console.log('Success! Response:', JSON.stringify(result, null, 2));
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testModels();