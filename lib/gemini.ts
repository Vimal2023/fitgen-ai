import { GoogleGenerativeAI } from "@google/generative-ai";
import { UserData } from "@/types";

/**
 * ✅ Lazy Gemini client initialization
 * (Never initialize at module scope on Vercel)
 */
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing in environment variables");
  }

  return new GoogleGenerativeAI(apiKey);
}

/**
 * Helper function to safely extract JSON from Gemini output
 */
function extractJSON(text: string): string {
  if (!text) return text;

  // Remove markdown code blocks
  let cleaned = text.replace(/^\s*```(json)?\s*|```\s*$/g, "").trim();

  // Extract first valid JSON object
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  return cleaned;
}

/**
 * 🔥 MAIN FITNESS PLAN GENERATOR
 */
export async function generateFitnessPlan(userData: UserData) {
  try {
    console.log(`Generating fitness plan for ${userData.name}`);

    // ✅ Create Gemini client per request
    const genAI = getGeminiClient();

    // ✅ Use STABLE production model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are an expert fitness coach and nutritionist. Create a comprehensive, personalized fitness plan.

User Profile:
- Name: ${userData.name}
- Age: ${userData.age}, Gender: ${userData.gender}
- Height: ${userData.height}cm, Weight: ${userData.weight}kg
- Fitness Goal: ${userData.fitnessGoal}
- Fitness Level: ${userData.fitnessLevel}
- Workout Location: ${userData.workoutLocation}
- Dietary Preference: ${userData.dietaryPreference}
${
  userData.medicalHistory ? `- Medical History: ${userData.medicalHistory}` : ""
}
${userData.stressLevel ? `- Stress Level: ${userData.stressLevel}` : ""}

Create a detailed 7-day plan. Return ONLY a valid JSON object with NO markdown formatting.

Required structure:
{
  "workoutPlan": [
    {
      "day": "Day 1",
      "exercises": [
        {
          "name": "Exercise Name",
          "sets": 3,
          "reps": "10-12",
          "rest": "60s",
          "description": "Brief description"
        }
      ]
    }
  ],
  "dietPlan": [
    {
      "day": "Day 1",
      "meals": [
        {
          "type": "breakfast",
          "name": "Meal Name",
          "calories": 350,
          "protein": "20g",
          "carbs": "45g",
          "fats": "10g",
          "description": "Brief description"
        }
      ]
    }
  ],
  "tips": ["Tip 1", "Tip 2", "Tip 3", "Tip 4", "Tip 5"],
  "motivation": "Motivational message here"
}

Return only the JSON object without any extra text.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const cleanedJSON = extractJSON(text);
    const parsedData = JSON.parse(cleanedJSON);

    // Validate structure
    if (
      !parsedData.workoutPlan ||
      !parsedData.dietPlan ||
      !parsedData.tips ||
      !parsedData.motivation
    ) {
      throw new Error("Invalid AI response structure");
    }

    console.log("Fitness plan generated successfully");
    return parsedData;
  } catch (error) {
    console.error("Gemini failed, returning fallback:", error);
    return getFallbackPlan(userData);
  }
}

/**
 * 🔹 MOTIVATION QUOTE GENERATOR
 */
export async function generateMotivationQuote() {
  try {
    const genAI = getGeminiClient();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(
      "Generate a short, powerful fitness motivation quote (max 20 words). Return only the quote."
    );

    return result.response
      .text()
      .replace(/^["'`]|["'`]$/g, "")
      .trim();
  } catch (error) {
    console.error("Motivation quote failed:", error);
    return "Push yourself because no one else will!";
  }
}

/**
 * 🛟 FALLBACK PLAN (always safe)
 */
function getFallbackPlan(userData: UserData) {
  return {
    workoutPlan: [
      {
        day: "Day 1 - Upper Body",
        exercises: [
          {
            name: "Push-ups",
            sets: 3,
            reps: "10-15",
            rest: "60s",
            description:
              "Classic upper body exercise targeting chest, shoulders, and triceps",
          },
        ],
      },
      {
        day: "Day 2 - Lower Body",
        exercises: [
          {
            name: "Squats",
            sets: 4,
            reps: "12-15",
            rest: "90s",
            description:
              "Fundamental leg exercise for overall lower body strength",
          },
        ],
      },
      {
        day: "Day 3 - Cardio & Core",
        exercises: [
          {
            name: "Running/Jogging",
            sets: 1,
            reps: "20-30 min",
            rest: "0s",
            description: "Cardiovascular endurance training",
          },
        ],
      },
      {
        day: "Day 4 - Active Recovery",
        exercises: [
          {
            name: "Stretching",
            sets: 1,
            reps: "15 min",
            rest: "0s",
            description: "Full body flexibility work",
          },
        ],
      },
      {
        day: "Day 5 - Full Body",
        exercises: [
          {
            name: "Burpees",
            sets: 3,
            reps: "10-15",
            rest: "90s",
            description: "Full body conditioning exercise",
          },
        ],
      },
      {
        day: "Day 6 - Flexibility & Balance",
        exercises: [
          {
            name: "Yoga Flow",
            sets: 1,
            reps: "30 min",
            rest: "0s",
            description: "Improve flexibility and mental focus",
          },
        ],
      },
      {
        day: "Day 7 - Rest",
        exercises: [
          {
            name: "Complete Rest",
            sets: 0,
            reps: "N/A",
            rest: "N/A",
            description: "Allow your body to fully recover",
          },
        ],
      },
    ],
    dietPlan: [
      {
        day: "Day 1",
        meals: [
          {
            type: "breakfast",
            name: "Oatmeal with Fruits",
            calories: 350,
            protein: "15g",
            carbs: "45g",
            fats: "10g",
            description: "Healthy fiber-rich breakfast",
          },
          {
            type: "lunch",
            name:
              userData.dietaryPreference === "vegetarian"
                ? "Paneer & Veg Bowl"
                : "Grilled Chicken & Rice",
            calories: 500,
            protein: "35g",
            carbs: "50g",
            fats: "15g",
            description: "Balanced protein-rich meal",
          },
          {
            type: "dinner",
            name:
              userData.dietaryPreference === "vegetarian"
                ? "Dal + Roti + Salad"
                : "Fish + Veggies",
            calories: 450,
            protein: "30g",
            carbs: "40g",
            fats: "12g",
            description: "Light and nutritious dinner",
          },
        ],
      },
    ],

    tips: [
      "Stay hydrated throughout the day",
      "Sleep at least 7–8 hours",
      "Warm up before workouts",
      "Focus on proper form",
      "Stay consistent",
    ],
    motivation: `${userData.name}, consistency will transform you. Stay strong 💪`,
  };
}
