import { HuggingFaceEmbedding } from "llamaindex";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const hfe = new HuggingFaceEmbedding();
const openai = new OpenAI({
  apiKey: process.env.GPT_API,
  baseURL: process.env.AI_API_URL,
});

const JSON_FORMAT =
  '{"summary": "", "potentialImpact": "", "impactedGroups": "", "pros": "", "cons": ""}';
const MAX_TEXT_LENGTH = 10000;

export const getAnalysis = async (text) => {
  text = text.trim().replace(/[^a-zA-Z0-9]/g, "");

  if (text.length > MAX_TEXT_LENGTH) {
    text = text.substring(0, MAX_TEXT_LENGTH);
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant who only responds in JSON. You will receive a United States Bill as your input in text format. Your job is provide a consise summary of the bill so that someone can understand it in under 100 words. Additionally, you will provide potential impacts that this bill may have in under 100 words. Finally, please provide impacted groups of people affected by this bill in under 50 words. Finally give a quick analysis of the pros of the bill and a quick analysis of the cons of the bill. Both should be 100 words each. Please be sure to always use complete sentences in the JSON answers. Follow the following format: ${JSON_FORMAT}, and only respond with this JSON format.`,
      },
      {
        role: "user",
        content: text,
      },
    ],
  });

  if (completion.choices[0].refusal == null) {
    return JSON.parse(completion.choices[0].message["content"]);
  }
  throw new Error("Refusal from ChatGPT (illegal response)");
};

export const embeddings = async (text) => {
  const embedding = await hfe.getTextEmbedding(text);
  return embedding;
};
