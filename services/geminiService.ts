
import { GoogleGenAI, Type } from "@google/genai";
import type { Blueprint } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        projectName: { type: Type.STRING },
        architecture: {
            type: Type.OBJECT,
            properties: {
                diagram: { type: Type.STRING, description: "A MermaidJS flowchart diagram string (e.g., 'graph TD; A-->B;')." },
                description: { type: Type.STRING, description: "A high-level description of the architecture." }
            },
            required: ["diagram", "description"]
        },
        backend: {
            type: Type.OBJECT,
            properties: {
                language: { type: Type.STRING, description: "e.g., 'Node.js'" },
                framework: { type: Type.STRING, description: "e.g., 'Express'" },
                apiExample: { type: Type.STRING, description: "A code snippet for a sample REST API endpoint." },
                geminiIntegration: { type: Type.STRING, description: "A code snippet showing Gemini API integration." }
            },
            required: ["language", "framework", "apiExample", "geminiIntegration"]
        },
        database: {
            type: Type.OBJECT,
            properties: {
                type: { type: Type.STRING, description: "e.g., 'Firestore (NoSQL)'" },
                schemaSuggestion: { type: Type.STRING, description: "A JSON string representing the suggested schema." }
            },
            required: ["type", "schemaSuggestion"]
        },
        frontend: {
            type: Type.OBJECT,
            properties: {
                framework: { type: Type.STRING, description: "e.g., 'React with TypeScript'" },
                apiCallExample: { type: Type.STRING, description: "A code snippet showing how to call the backend API." }
            },
            required: ["framework", "apiCallExample"]
        },
        security: {
            type: Type.OBJECT,
            properties: {
                bestPractices: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                }
            },
            required: ["bestPractices"]
        },
        aiPrompt: {
            type: Type.OBJECT,
            properties: {
                samplePrompt: { type: Type.STRING, description: "A sample prompt to use with the Gemini API for a core feature of the app." }
            },
            required: ["samplePrompt"]
        }
    }
};


export const generateBlueprint = async (projectDescription: string): Promise<Blueprint> => {
    const prompt = `
        You are a world-class full-stack software architect. A user wants to build an application and has provided a description.
        Your task is to generate a comprehensive technical blueprint for them.
        Use the following technologies: Next.js/React for frontend, Node.js with Express for the backend, and Google Firestore for the database.
        Integrate the Google Gemini API for AI-powered features.
        Provide clear, concise, and actionable information, including code snippets.
        Ensure all code snippets are complete and syntactically correct.
        The architecture diagram must be in MermaidJS 'graph' or 'flowchart' format.
        The database schema suggestion must be a valid JSON string.

        User's Project Description:
        "${projectDescription}"

        Generate the blueprint now.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.5,
            },
        });
        
        const jsonText = response.text;
        const blueprintData: Blueprint = JSON.parse(jsonText);
        
        // Basic validation
        if (!blueprintData.projectName || !blueprintData.backend || !blueprintData.frontend) {
            throw new Error("Invalid blueprint structure received from API.");
        }
        
        return blueprintData;

    } catch (error) {
        console.error("Error generating blueprint with Gemini:", error);
        throw new Error("Failed to communicate with the AI model.");
    }
};
