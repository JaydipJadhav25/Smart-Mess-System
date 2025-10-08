import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// ✅ Available models: gemini-1.5-flash or gemini-1.5-pro
const model = genAI.getGenerativeModel({  model: 'gemini-2.0-flash-001' ,
     generationConfig: {
    responseMimeType: "application/json",
    temperature: 0.3,
  },
 });


 export const generateAnalytics = async (feedbackArray) => {
  try {
    const prompt = `
${systemPrompt}

Feedback array:
${JSON.stringify(feedbackArray)}
`;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    console.log("AI Analytics JSON:", text);

    // Optionally parse JSON
    const analytics = JSON.parse(text);
    return analytics;

  } catch (err) {
    console.error("AI Error:", err);
    throw err;
  }
};




const systemPrompt = `
You are an AI assistant that analyzes student meal feedbacks.
You will receive an array of feedbacks with the following fields:
- user: string
- meal: string
- Date: string (ISO format)
- overallRating: number (1-5)
- itemFeedback: object with each meal item { rating, comment, positiveTags, negativeTags }
- positiveTags: array of strings
- negativeTags: array of strings
- comment: string

Analyze all feedbacks and return a JSON object with the following structure:

{
  "summary": {
    "totalFeedbacks": number,
    "averageRating": number
  },
  "positiveFeedbacks": {
    "count": number
  },
  "negativeFeedbacks": {
    "count": number
  },
  "spammingUsers": {
    "count": number,
    "list": [array of usernames who submitted 2+ feedbacks]
  },
  "mostPositiveMeals": {
    "count": number,
    "meals": [
      {
        "name": string,
        "averageRating": number,
        "comments": [array of positive comments for this meal]
      }
    ]
  },
  "mostNegativeMeals": {
    "count": number,
    "meals": [
      {
        "name": string,
        "averageRating": number,
        "negativeComments": [array of negative comments for this meal]
      }
    ]
  },
  "sentimentDistribution": {
    "1_star": number,
    "2_star": number,
    "3_star": number,
    "4_star": number,
    "5_star": number
  },
  "mealAnalysis": [
    {
      "meal": string,
      "averageRating": number,
      "positiveComments": [array],
      "negativeComments": [array]
    }
  ],
  "aiSuggestions": {
    "goodPoints": [array],
    "badPoints": [array]
  },
  "aiSummaryText": string
}

Return **only JSON** and do not add any explanations.
`;

