const { GoogleGenAI } = require("@google/genai");

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateItinerary = async (trip) => {
  try {
    const prompt = `
You are a travel planner AI.

Return ONLY valid JSON.

Trip:
Destination: ${trip.destination}
Days: ${trip.days}
Budget: ${trip.budgetType}
Interests: ${trip.interests.join(", ")}

Format:
{
  "itinerary": {
    "day1": ["activity1", "activity2"],
    "day2": ["activity1", "activity2"]
  },
  "budget": {
    "total": 1000
  },
  "hotels": ["Hotel A", "Hotel B"]
}
`;

    const response = await client.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const text = response.text;

    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch (error) {
    console.log("AI ERROR:", error.message);
    throw error;
  }
};

module.exports = { generateItinerary };