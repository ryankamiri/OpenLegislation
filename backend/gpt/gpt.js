import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GPT_API,
});

const JSON_FORMAT =
  '{"summary": "", "potentialImpact": "", "impactedGroups": ""}';
const MAX_TEXT_LENGTH = 1000;

const getSummary = async (text) => {
  // Validate text
  if (text.length > MAX_TEXT_LENGTH) {
    throw new Error(`Text length is over max length (${MAX_TEXT_LENGTH})`);
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

export default { getSummary };
