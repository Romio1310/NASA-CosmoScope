import natural from 'natural';
import compromise from 'compromise';
import Typo from 'typo-js';
import leven from 'leven';
import Sentiment from 'sentiment';

class AdvancedNLPProcessor {
  constructor() {
    // Initialize sentiment analyzer
    this.sentiment = new Sentiment();
    
    // Initialize spell checker with English dictionary (handle errors gracefully)
    try {
      this.spellChecker = new Typo('en_US');
    } catch (error) {
      console.log('Spell checker initialization failed, using fallback');
      this.spellChecker = null;
    }
    
    // Common typos and corrections dictionary
    this.commonTypos = {
      'teh': 'the',
      'adn': 'and',
      'taht': 'that',
      'wnat': 'want',
      'ont': 'not',
      'wihth': 'with',
      'fro': 'for',
      'youre': 'you are',
      'your': 'you are', // context dependent
      'recieve': 'receive',
      'beleive': 'believe',
      'seperate': 'separate',
      'definately': 'definitely',
      'occured': 'occurred',
      'begining': 'beginning',
      'wierd': 'weird',
      'freind': 'friend',
      'becuase': 'because',
      'wich': 'which',
      'thier': 'their',
      'there': 'their', // context dependent
      'wat': 'what',
      'wht': 'what',
      'hw': 'how',
      'u': 'you',
      'ur': 'your',
      'plz': 'please',
      'pls': 'please',
      'thx': 'thanks',
      'thanx': 'thanks',
      'gonna': 'going to',
      'wanna': 'want to',
      'gotta': 'got to',
      'shouldnt': 'should not',
      'couldnt': 'could not',
      'wouldnt': 'would not',
      'dont': 'do not',
      'cant': 'can not',
      'wont': 'will not',
      'isnt': 'is not',
      'arent': 'are not',
      'wasnt': 'was not',
      'werent': 'were not',
      'hasnt': 'has not',
      'havent': 'have not',
      'hadnt': 'had not',
      'im': 'I am',
      'ive': 'I have',
      'ill': 'I will',
      'id': 'I would',
      'youll': 'you will',
      'youd': 'you would',
      'hes': 'he is',
      'shes': 'she is',
      'its': 'it is',
      'were': 'we are',
      'theyre': 'they are',
      'theyve': 'they have',
      'theyll': 'they will',
      'theyd': 'they would',
      // Space/NASA related typos
      'eart': 'earth',
      'earht': 'earth',
      'erath': 'earth',
      'mars': 'Mars',
      'jupitar': 'Jupiter',
      'saturan': 'Saturn',
      'nepture': 'Neptune',
      'uranus': 'Uranus',
      'mercery': 'Mercury',
      'vebus': 'Venus',
      'pluto': 'Pluto',
      'nasa': 'NASA',
      'spacex': 'SpaceX',
      'iss': 'ISS',
      'astronot': 'astronaut',
      'astronaut': 'astronaut',
      'galaxy': 'galaxy',
      'univers': 'universe',
      'universa': 'universe',
      'planit': 'planet',
      'planets': 'planets',
      'sattelite': 'satellite',
      'rockets': 'rockets',
      'rocket': 'rocket'
    };

    // Initialize tokenizer
    this.tokenizer = new natural.WordTokenizer();
    
    // Initialize stemmer
    this.stemmer = natural.PorterStemmer;
    
    console.log('🧠 Advanced NLP Processor initialized successfully!');
  }

  // Main processing function
  processUserInput(userMessage) {
    console.log('🔍 Processing user input:', userMessage);
    
    const originalMessage = userMessage;
    
    // Step 1: Basic cleaning
    let processedMessage = this.basicCleanup(userMessage);
    
    // Step 2: Fix common typos
    processedMessage = this.fixCommonTypos(processedMessage);
    
    // Step 3: Spell correction
    processedMessage = this.spellCorrection(processedMessage);
    
    // Step 4: Grammar improvement
    processedMessage = this.improveGrammar(processedMessage);
    
    // Step 5: Analyze intent and context
    const analysis = this.analyzeIntent(processedMessage);
    
    // Step 6: Generate enhanced context
    const enhancedContext = this.generateEnhancedContext(originalMessage, processedMessage, analysis);
    
    console.log('✅ NLP Processing complete:');
    console.log('   Original:', originalMessage);
    console.log('   Processed:', processedMessage);
    console.log('   Intent:', analysis.intent);
    console.log('   Sentiment:', analysis.sentiment.score);
    
    return {
      originalMessage,
      processedMessage,
      analysis,
      enhancedContext
    };
  }

  // Step 1: Basic text cleanup
  basicCleanup(text) {
    return text
      .trim()
      .replace(/\s+/g, ' ') // Multiple spaces to single space
      .replace(/[^\w\s.,!?'"()-]/g, '') // Remove special characters except punctuation
      .toLowerCase();
  }

  // Step 2: Fix common typos
  fixCommonTypos(text) {
    let words = text.split(' ');
    
    words = words.map(word => {
      const cleanWord = word.replace(/[.,!?'"()-]/g, '');
      const punctuation = word.replace(cleanWord, '');
      
      if (this.commonTypos[cleanWord]) {
        return this.commonTypos[cleanWord] + punctuation;
      }
      
      return word;
    });
    
    return words.join(' ');
  }

  // Step 3: Advanced spell correction
  spellCorrection(text) {
    if (!this.spellChecker) {
      return text; // Skip spell checking if not available
    }
    
    let words = text.split(' ');
    
    words = words.map(word => {
      const cleanWord = word.replace(/[.,!?'"()-]/g, '');
      const punctuation = word.replace(cleanWord, '');
      
      try {
        if (cleanWord.length > 2 && !this.spellChecker.check(cleanWord)) {
          const suggestions = this.spellChecker.suggest(cleanWord);
          if (suggestions && suggestions.length > 0) {
            // Use Levenshtein distance to find closest match
            let bestMatch = suggestions[0];
            let bestDistance = leven(cleanWord, bestMatch);
            
            for (let suggestion of suggestions.slice(1, 5)) { // Check top 5 suggestions
              const distance = leven(cleanWord, suggestion);
              if (distance < bestDistance) {
                bestMatch = suggestion;
                bestDistance = distance;
              }
            }
            
            // Only replace if the distance is reasonable (not too different)
            if (bestDistance <= Math.ceil(cleanWord.length * 0.4)) {
              return bestMatch + punctuation;
            }
          }
        }
      } catch (error) {
        console.log('Spell check error for word:', cleanWord);
      }
      
      return word;
    });
    
    return words.join(' ');
  }

  // Step 4: Grammar improvement using compromise
  improveGrammar(text) {
    try {
      const doc = compromise(text);
      
      // Fix common grammar issues
      let improved = doc.text();
      
      // Fix double negatives
      improved = improved.replace(/don't got no/g, "don't have any");
      improved = improved.replace(/ain't got no/g, "don't have any");
      
      // Fix subject-verb agreement (basic cases)
      improved = improved.replace(/\bi am are\b/g, "I am");
      improved = improved.replace(/\byou is\b/g, "you are");
      improved = improved.replace(/\bhe are\b/g, "he is");
      improved = improved.replace(/\bshe are\b/g, "she is");
      improved = improved.replace(/\bit are\b/g, "it is");
      
      return improved;
    } catch (error) {
      console.log('Grammar processing error:', error);
      return text;
    }
  }

  // Step 5: Intent and sentiment analysis
  analyzeIntent(text) {
    const doc = compromise(text);
    const sentiment = this.sentiment.analyze(text);
    
    // Detect question types
    const isQuestion = text.includes('?') || 
                      doc.has('#QuestionWord') ||
                      /^(what|how|why|when|where|who|which|can|could|would|should|do|does|did|is|are|was|were)/i.test(text);
    
    // Detect topics
    const topics = {
      space: /\b(space|earth|mars|jupiter|saturn|neptune|uranus|mercury|venus|pluto|galaxy|universe|planet|star|moon|sun|nasa|astronaut|rocket|satellite|iss|spacex)\b/i.test(text),
      science: /\b(science|physics|chemistry|biology|research|experiment|theory|discovery)\b/i.test(text),
      technology: /\b(technology|computer|ai|artificial intelligence|robot|programming|software|hardware)\b/i.test(text),
      greeting: /\b(hello|hi|hey|good morning|good afternoon|good evening|how are you|what's up|sup)\b/i.test(text),
      personal: /\b(i am|i'm|my|me|myself|personal|feel|feeling|think|believe)\b/i.test(text)
    };
    
    // Determine primary intent
    let intent = 'general';
    if (topics.greeting) intent = 'greeting';
    else if (topics.space) intent = 'space_inquiry';
    else if (topics.science) intent = 'science_inquiry';
    else if (topics.technology) intent = 'tech_inquiry';
    else if (topics.personal) intent = 'personal_chat';
    else if (isQuestion) intent = 'question';
    
    return {
      intent,
      isQuestion,
      topics,
      sentiment: {
        score: sentiment.score,
        comparative: sentiment.comparative,
        positive: sentiment.positive,
        negative: sentiment.negative
      },
      entities: this.extractEntities(doc),
      complexity: this.assessComplexity(text)
    };
  }

  // Extract named entities
  extractEntities(doc) {
    try {
      return {
        places: doc.places()?.out('array') || [],
        people: doc.people()?.out('array') || [],
        organizations: doc.organizations()?.out('array') || [],
        dates: doc.match('#Date')?.out('array') || [],
        numbers: doc.values()?.out('array') || []
      };
    } catch (error) {
      console.log('Entity extraction error:', error);
      return {
        places: [],
        people: [],
        organizations: [],
        dates: [],
        numbers: []
      };
    }
  }

  // Assess text complexity
  assessComplexity(text) {
    const words = text.split(' ').length;
    const sentences = text.split(/[.!?]+/).length;
    const avgWordsPerSentence = words / sentences;
    
    let complexity = 'simple';
    if (avgWordsPerSentence > 15) complexity = 'complex';
    else if (avgWordsPerSentence > 8) complexity = 'moderate';
    
    return complexity;
  }

  // Step 6: Generate enhanced context for AI
  generateEnhancedContext(original, processed, analysis) {
    let context = `The user said: "${processed}"\n\n`;
    
    // Add processing notes if significant changes were made
    if (original.toLowerCase() !== processed) {
      context += `Note: The user's original message was "${original}" but I've processed it to correct typos and improve clarity.\n\n`;
    }
    
    // Add intent analysis
    context += `User Intent Analysis:
- Primary Intent: ${analysis.intent}
- Is Question: ${analysis.isQuestion}
- Sentiment: ${analysis.sentiment.score > 0 ? 'Positive' : analysis.sentiment.score < 0 ? 'Negative' : 'Neutral'} (${analysis.sentiment.score})
- Text Complexity: ${analysis.complexity}
`;

    // Add topic context
    const activeTopics = Object.entries(analysis.topics).filter(([_, active]) => active).map(([topic, _]) => topic);
    if (activeTopics.length > 0) {
      context += `- Topics Detected: ${activeTopics.join(', ')}\n`;
    }
    
    // Add entities if found
    const allEntities = Object.values(analysis.entities).flat();
    if (allEntities.length > 0) {
      context += `- Named Entities: ${allEntities.join(', ')}\n`;
    }
    
    context += `\nBased on this analysis, respond as CosmoBuddy in a way that:
1. Addresses the user's corrected and clarified intent
2. Matches their sentiment and complexity level
3. Shows understanding of any typos or grammar issues they had
4. Provides relevant information for the detected topics
5. Maintains a natural, conversational tone\n`;
    
    return context;
  }

  // Utility method to check if processing made significant improvements
  hasSignificantImprovement(original, processed) {
    const similarity = 1 - (leven(original.toLowerCase(), processed) / Math.max(original.length, processed.length));
    return similarity < 0.8; // If less than 80% similar, there were significant changes
  }
}

export default AdvancedNLPProcessor;