import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.GPT_API,
});

const JSON_FORMAT =
  '{"summary": "", "potentialImpact": "", "impactedGroups": ""}';
const MAX_TEXT_LENGTH = 10000;

export const getSummary = async (text) => {
  // Validate text
  text = text.trim().replace(/[^a-zA-Z0-9]/g, "");

  if (text.length > MAX_TEXT_LENGTH) {
    text = text.substring(0, MAX_TEXT_LENGTH);
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant who only responds in JSON. You will receive a United States Bill as your input in text format. Your job is provide a consise summary of the bill so that someone can understand it in under 100 words. Additionally, you will provide potential impacts that this bill may have in under 100 words. Finally, please provide impacted groups of people affected by this bill in under 50 words. Please be sure to always use complete sentences in the JSON answers. Follow the following format: ${JSON_FORMAT}, and only respond with this JSON format.`,
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

export const createEmbedding = async (input) => {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GPT_API}`,
    },
    body: JSON.stringify({
      model: "text-embedding-ada-002",
      input,
    }),
  });
  const data = await response.json();
  if(data.error) {
    return(data);
  }
  return data.data[0].embedding;
};
