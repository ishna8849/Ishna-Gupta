import { GoogleGenAI, Type } from "@google/genai";
import { PlotAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzePlot(plot: string): Promise<PlotAnalysis> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following book plot/storyline: \n\n${plot}`,
    config: {
      systemInstruction: `You are a world-class literary critic and publishing expert. 
      Analyze book plots for:
      1. Originality: Evaluate based on the uniqueness of the concept versus common tropes detected.
      2. Story Health: A score from 0 to 100 based on structural integrity, narrative flow, and lack of plot holes.
      3. Reader interest and market potential.
      4. Plot holes (Narrative Stains).
      
      Return the output strictly in JSON format.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          attractiveness: {
            type: Type.STRING,
            description: "How likely this book will attract readers and why.",
          },
          originalityRating: {
            type: Type.NUMBER,
            description: "Rating of originality from 1 to 10, considering how uniqueness outweighs tropes.",
          },
          tropes: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of common tropes detected in the summary.",
          },
          conceptUniqueness: {
            type: Type.STRING,
            description: "A brief breakdown of what makes the core concept unique.",
          },
          interestRate: {
            type: Type.NUMBER,
            description: "Rating of reader interest from 1 to 10.",
          },
          popularityPotential: {
            type: Type.STRING,
            description: "Prediction on whether this will be popular.",
          },
          economicSuitability: {
            type: Type.STRING,
            description: "Analysis of market fit for the current economy.",
          },
          storyHealth: {
            type: Type.NUMBER,
            description: "Overall structural health score from 0 to 100.",
          },
          plotHoles: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of potential holes (Narrative Stains).",
          },
          detailedAnalysis: {
            type: Type.STRING,
            description: "A comprehensive analysis.",
          },
        },
        required: [
          "attractiveness",
          "originalityRating",
          "tropes",
          "conceptUniqueness",
          "interestRate",
          "popularityPotential",
          "economicSuitability",
          "storyHealth",
          "plotHoles",
          "detailedAnalysis",
        ],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as PlotAnalysis;
}
