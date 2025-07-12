import * as fs from "fs";
import { GoogleGenAI } from "@google/genai";

// This API key is from Gemini Developer API Key, not vertex AI API Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface WasteAnalysisResult {
  wasteType: string;
  category: string;
  recyclable: boolean;
  disposalMethod: string;
  instructions: string;
  ecoPoints: number;
  confidence: number;
  carbonFootprint: number;
}

export async function analyzeWasteImage(imageBase64: string): Promise<WasteAnalysisResult> {
  try {
    const systemPrompt = `You are a waste management expert. Analyze the image and identify the waste item.
    
    Provide analysis in JSON format with these fields:
    - wasteType: specific item name (e.g., "Plastic Water Bottle")
    - category: one of ["plastic", "organic", "paper", "glass", "metal", "electronic", "hazardous", "textile"]
    - recyclable: boolean
    - disposalMethod: specific disposal method
    - instructions: detailed disposal instructions
    - ecoPoints: points to award (1-10 based on eco-friendliness)
    - confidence: confidence score (0-1)
    - carbonFootprint: estimated CO2 impact in kg`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            wasteType: { type: "string" },
            category: { type: "string" },
            recyclable: { type: "boolean" },
            disposalMethod: { type: "string" },
            instructions: { type: "string" },
            ecoPoints: { type: "number" },
            confidence: { type: "number" },
            carbonFootprint: { type: "number" },
          },
          required: ["wasteType", "category", "recyclable", "disposalMethod", "instructions", "ecoPoints", "confidence", "carbonFootprint"],
        },
      },
      contents: [
        {
          inlineData: {
            data: imageBase64,
            mimeType: "image/jpeg",
          },
        },
        "Analyze this waste item and provide disposal guidance.",
      ],
    });

    const rawJson = response.text;
    if (rawJson) {
      const data: WasteAnalysisResult = JSON.parse(rawJson);
      return data;
    } else {
      throw new Error("Empty response from model");
    }
  } catch (error) {
    console.error("Error analyzing waste image:", error);
    throw new Error(`Failed to analyze waste image: ${error}`);
  }
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: string;
}

export async function generateQuiz(topic: string, difficulty: string = "medium"): Promise<QuizQuestion[]> {
  try {
    const systemPrompt = `You are an environmental education expert. Generate 5 multiple-choice questions about ${topic}.
    
    Difficulty level: ${difficulty}
    
    Return JSON array with this structure for each question:
    - question: the question text
    - options: array of 4 answer options
    - correctAnswer: index of correct option (0-3)
    - explanation: explanation of why the answer is correct
    - difficulty: the difficulty level`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              question: { type: "string" },
              options: { type: "array", items: { type: "string" } },
              correctAnswer: { type: "number" },
              explanation: { type: "string" },
              difficulty: { type: "string" },
            },
            required: ["question", "options", "correctAnswer", "explanation", "difficulty"],
          },
        },
      },
      contents: `Generate 5 multiple-choice questions about ${topic} at ${difficulty} difficulty level.`,
    });

    const rawJson = response.text;
    if (rawJson) {
      const data: QuizQuestion[] = JSON.parse(rawJson);
      return data;
    } else {
      throw new Error("Empty response from model");
    }
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error(`Failed to generate quiz: ${error}`);
  }
}

export async function generateEducationalContent(topic: string): Promise<string> {
  try {
    const prompt = `Create educational content about ${topic} in the context of waste management and environmental sustainability. 
    
    Include:
    - Key concepts and definitions
    - Practical tips and actionable advice
    - Environmental impact information
    - Real-world examples
    
    Write in a clear, engaging style suitable for general audiences.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "Failed to generate content";
  } catch (error) {
    console.error("Error generating educational content:", error);
    throw new Error(`Failed to generate educational content: ${error}`);
  }
}