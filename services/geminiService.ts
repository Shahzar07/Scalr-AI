
import { GoogleGenAI, Type } from "@google/genai";
import { FunnelData, Tool } from "../types";

const GHOSTWRITER_SYSTEM_INSTRUCTION = `
You are "The Ghostwriter," an elite Direct Response Copywriter and Shadow Monetization Architect. 
Your purpose is to generate high-LTV revenue systems, brutal conversion audits, and high-status marketing assets.

STRATEGIC MANDATES:
1. DO NOT be generic. Be authoritative, persuasive, and results-oriented.
2. If a URL is provided, perform a DEEP AUDIT. Research brand voice, audience pain points, and conversion gaps.
3. Every piece of copy must focus on the "Unfair Advantage" and a "Grand Slam Offer."
4. Use Direct Response principles (AIDA, PAS, BAB) as the foundation.
`;

const IDEA_GENERATOR_SYSTEM_INSTRUCTION = `
You are the World's Leading "Idea Architect." Your goal is to generate 5-10 high-ROI, monetizable, and unique strategic ideas based on the provided tool context.

STRATEGIC MANDATES:
1. NO FLUFF: Every idea must be actionable and focused on increasing revenue or engagement.
2. GRAND SLAM FOCUS: Think like Alex Hormozi or Dan Kennedy. How do we make the offer irrefutable?
3. PSYCHOLOGICAL TRIGGERS: Use scarcity, urgency, and authority in the ideas.
4. UNFAIR ADVANTAGE: Identify unique angles that competitors are missing.
5. CONVERSION FIRST: Every idea must lead the target audience closer to a transaction.
`;

const PROFILE_OPTIMIZER_SYSTEM_INSTRUCTION = `
You are the World's Highest-Paid Profile Conversion Architect. 
Your goal is to transform "Generic Profiles" into "High-Ticket Client Magnets."

STRATEGIC DIRECTIVES:
1. DEEP SCRAPE FOCUS: Do not give generic advice. Analyze the SPECIFIC content at the provided URLs (Profile, Portfolio, Competitors).
2. MONETIZATION GAPS: Identify exactly where the user is losing money. Is their backend missing? Is their CTA weak? Do they look like a "commodity" freelancer instead of an "expert"?
3. REAL REVENUE STRATEGY: Provide a custom monetization roadmap. Suggest specific high-ticket offers ($5k-$50k), productized service structures, or backend funnel designs.
4. BRUTAL HONESTY: If their branding is low-status, tell them. Then give them the high-status fix.
5. CONVERSION FLOW: Audit the entire flow from "Initial View" to "Booking a Call."
6. NO GLITCHY FILLER: Every sentence must add strategic value.
`;

const funnelSchema = {
  type: Type.OBJECT,
  properties: {
    ads: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING, description: "Type of ad (Story, Polarizing, or Direct)" },
          headline: { type: Type.STRING },
          primaryText: { type: Type.STRING },
          cta: { type: Type.STRING },
        },
        required: ["type", "headline", "primaryText", "cta"],
      },
    },
    landingPage: {
      type: Type.OBJECT,
      properties: {
        preHeadline: { type: Type.STRING },
        headline: { type: Type.STRING },
        subHeadline: { type: Type.STRING },
        vslScript: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
      required: ["preHeadline", "headline", "subHeadline", "vslScript"],
    },
    emails: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.STRING },
          type: { type: Type.STRING },
          subject: { type: Type.STRING },
          body: { type: Type.STRING },
        },
        required: ["day", "type", "subject", "body"],
      },
    },
  },
  required: ["ads", "landingPage", "emails"],
};

export const sendChatMessage = async (history: { role: string; text: string }[], message: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const contents = history.map(msg => ({
    role: msg.role as 'user' | 'model',
    parts: [{ text: msg.text }]
  }));
  contents.push({ role: 'user', parts: [{ text: message }] });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents,
    config: { systemInstruction: GHOSTWRITER_SYSTEM_INSTRUCTION },
  });
  return response.text || "";
};

export const generateFunnelStack = async (productName: string, audience: string, coreProblem: string): Promise<FunnelData> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Product: ${productName}, Audience: ${audience}, Problem: ${coreProblem}. Generate the Full Funnel Asset Stack in JSON format following Direct Response best practices.`;
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: GHOSTWRITER_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: funnelSchema,
    },
  });
  return JSON.parse(response.text || '{}') as FunnelData;
};

export const runTool = async (tool: Tool, inputs: Record<string, string>, creatorUrl?: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  let prompt = tool.promptTemplate;
  let useSearch = !!creatorUrl;
  
  for (const [key, value] of Object.entries(inputs)) {
    if (value && typeof value === 'string' && (value.includes('http') || value.includes('www'))) {
      useSearch = true;
    }
    prompt = prompt.replace(`{${key}}`, String(value));
  }

  if (useSearch) {
    prompt = `RESEARCH MANDATE: 
Analyze the following links for tone, audience, and strategy: ${creatorUrl || ''} ${Object.values(inputs).filter(v => typeof v === 'string' && v.includes('http')).join(' ')}. 

TASK:
${prompt}`;
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: tool.systemInstruction || GHOSTWRITER_SYSTEM_INSTRUCTION,
      tools: useSearch ? [{ googleSearch: {} }] : [],
    },
  });
  
  let text = response.text || "Execution failed. No output generated.";
  
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
  if (groundingChunks && groundingChunks.length > 0) {
    text += "\n\n---\n### 🌐 VERIFIED SOURCES\n";
    const uniqueUris = new Set<string>();
    groundingChunks.forEach(chunk => {
      if (chunk.web?.uri && !uniqueUris.has(chunk.web.uri)) {
        uniqueUris.add(chunk.web.uri);
        text += `- [${chunk.web.title || chunk.web.uri}](${chunk.web.uri})\n`;
      }
    });
  }
  return text;
};

export const optimizeProfile = async (profileUrl: string, goals: string, portfolioUrl?: string, competitorUrls?: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `
    AUDIT COMMAND: PERFORM A DEEP MONETIZATION AUDIT ON ${profileUrl}.
    
    RESEARCH TASKS:
    1. SCRAPE ${profileUrl}: Analyze current headlines, bio narratives, and engagement quality.
    2. ANALYZE ${portfolioUrl || "Portfolio not provided"}: Look for proof points and case studies.
    3. COMPARE against ${competitorUrls || "Competitors not provided"}: Find where they are winning and where they have left a massive gap for you.
    
    PRIMARY GOAL: ${goals}
    
    EXPECTED OUTPUT (BE BRUTAL & ACTIONABLE):
    - PROFIT LEAK ANALYSIS: Why are they not generating high-ticket inbound leads currently?
    - MONETIZATION ROADMAP: Suggest a specific high-ticket offer (e.g., $10k backend coaching) or productized service.
    - HEADLINE & BIO REWRITE: High-status copy to deploy immediately based on the audit.
    - REVENUE-GROWTH ACTION PLAN: 3 immediate high-impact steps to increase revenue.
  `;
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: PROFILE_OPTIMIZER_SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }],
      temperature: 0.8,
    },
  });
  
  let text = response.text || "Audit failed.";
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
  if (groundingChunks && groundingChunks.length > 0) {
    text += "\n\n### 🌐 AUDIT RESEARCH SOURCES\n";
    const uniqueUris = new Set<string>();
    groundingChunks.forEach(chunk => {
      if (chunk.web?.uri && !uniqueUris.has(chunk.web.uri)) {
        uniqueUris.add(chunk.web.uri);
        text += `- [${chunk.web.title || chunk.web.uri}](${chunk.web.uri})\n`;
      }
    });
  }
  return text;
};

export const refineContent = async (content: string, instruction: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Original: ${content}\n\nRefine based on: ${instruction}`,
  });
  return response.text || content;
};

export const generateImage = async (prompt: string, style: string, referenceImage?: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const parts: any[] = [{ text: `${prompt}. Style: ${style}` }];
  
  if (referenceImage) {
    const base64Data = referenceImage.includes(',') ? referenceImage.split(',')[1] : referenceImage;
    parts.push({
      inlineData: {
        mimeType: 'image/png',
        data: base64Data,
      },
    });
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      const base64EncodeString: string = part.inlineData.data;
      return `data:${part.inlineData.mimeType || 'image/png'};base64,${base64EncodeString}`;
    }
  }
  
  return "";
};

export const generateIdeas = async (prompt: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: { systemInstruction: IDEA_GENERATOR_SYSTEM_INSTRUCTION },
  });
  return response.text || "";
};
