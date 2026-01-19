
import { GoogleGenAI } from "@google/genai";

export async function analyzeBuildLogs(logs: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    As a senior DevOps engineer, analyze the following build logs and provide:
    1. A concise summary of why the build failed.
    2. Specific steps to fix the detected issues.
    3. Recommendations to prevent this in the future.
    
    Logs:
    ${logs}
    
    Format the response as clear Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error analyzing logs:", error);
    return "Failed to analyze logs with AI. Please check the logs manually.";
  }
}
