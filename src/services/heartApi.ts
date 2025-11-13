/**
 * SOURCE: Custom implementation
 * PURPOSE: Heart Game API integration for trivia questions
 * MODIFICATIONS: Simple fetch API for getting heart counting questions
 */

export interface HeartQuestion {
  question: string;  // Image URL
  solution: number;  // Correct answer
}

/**
 * Fetch a heart counting question from the API
 */
export const fetchHeartQuestion = async (): Promise<HeartQuestion> => {
  try {
    const response = await fetch('https://marcconrad.com/uob/heart/api.php');
    
    if (!response.ok) {
      throw new Error('Failed to fetch question');
    }

    const data = await response.json();
    
    return {
      question: data.question || '',  // Image URL
      solution: parseInt(data.solution) || 0  // Correct answer
    };
  } catch (error) {
    console.error('Error fetching heart question:', error);
    throw error;
  }
};

