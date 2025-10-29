import { GoogleGenAI, Chat } from "@google/genai";
import type { ChatMessage } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const chat: Chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
        systemInstruction: "You are a helpful cooking assistant specializing in low carb recipes. Your task is to analyze photos of ingredients and suggest recipes based on them. Always stick to recipe suggestions and cooking advice. If asked about anything unrelated to cooking or nutrition, politely redirect the conversation back to recipe ideas. Provide recipes in a clear, step-by-step format, including approximate cooking time and how many people the meal should serve. Use markdown for formatting recipes."
    }
});

function fileToGenerativePart(base64DataUrl: string) {
    const [meta, base64Data] = base64DataUrl.split(',');
    if (!meta || !base64Data) {
        throw new Error("Invalid image data URL format");
    }
    const mimeTypeMatch = meta.match(/:(.*?);/);
    if (!mimeTypeMatch || !mimeTypeMatch[1]) {
        throw new Error("Could not extract MIME type from image data URL");
    }
    const mimeType = mimeTypeMatch[1];
    return {
        inlineData: {
            data: base64Data,
            mimeType
        }
    };
}


export async function generateRecipe(lastUserMessage: ChatMessage): Promise<string> {
    const { text, image } = lastUserMessage;

    const parts: any[] = [];
    
    if (image) {
        parts.push(fileToGenerativePart(image));
    }
    
    const userText = text || "Here are my ingredients. What low-carb recipes can I make with these? Please also ask about my dietary preferences before giving a detailed recipe.";
    parts.push({ text: userText });

    if (parts.length === 0) {
        return "Please provide some ingredients, either by typing or uploading a photo.";
    }

    try {
        // Fix: The parts array should be passed inside a 'message' property.
        const result = await chat.sendMessage({ message: parts });
        return result.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "I'm sorry, but I've encountered an issue and can't generate a recipe right now. Please check your setup or try again later.";
    }
}