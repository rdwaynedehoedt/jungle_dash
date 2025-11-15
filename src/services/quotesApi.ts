/**
 * SOURCE: Quotable API (https://api.quotable.io)
 * PURPOSE: Fetch motivational quotes for game over screen
 * INTEROPERABILITY: External REST API integration
 * MODIFICATIONS: Custom error handling and fallback quotes
 */

export interface Quote {
  content: string;
  author: string;
}

/**
 * Fallback quotes in case API fails
 * Demonstrates defensive programming and high cohesion
 */
const FALLBACK_QUOTES: Quote[] = [
  {
    content: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    content: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    content: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    content: "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Anonymous"
  }
];

/**
 * Fetch a random motivational quote from the API
 * LOW COUPLING: This service has no dependencies on UI or game logic
 * HIGH COHESION: Only handles quote fetching
 */
export const fetchMotivationalQuote = async (): Promise<Quote> => {
  try {
    // Fetch from external API
    const response = await fetch('https://api.quotable.io/random?tags=inspirational|motivational', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Validate response data
    if (!data.content || !data.author) {
      throw new Error('Invalid quote data received');
    }

    return {
      content: data.content,
      author: data.author
    };

  } catch (error) {
    console.error('Error fetching quote from API:', error);
    
    // Return fallback quote if API fails
    // This ensures the feature always works (HIGH COHESION)
    return getRandomFallbackQuote();
  }
};

/**
 * Get a random fallback quote
 * SINGLE RESPONSIBILITY: Only handles fallback logic
 */
const getRandomFallbackQuote = (): Quote => {
  const randomIndex = Math.floor(Math.random() * FALLBACK_QUOTES.length);
  return FALLBACK_QUOTES[randomIndex];
};

/**
 * Preload a quote (can be called when game starts)
 * PERFORMANCE OPTIMIZATION: Reduces wait time on game over
 */
export const preloadQuote = async (): Promise<Quote> => {
  return fetchMotivationalQuote();
};

