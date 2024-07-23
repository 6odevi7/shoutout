import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const response = await openai.completions.create({
      model: "text-davinci-002",
      prompt: `Create a single, impactful sentence about the current global situation and its effect on our local community. Use simple language and focus on a trending topic.`,
      max_tokens: 50,
      temperature: 0.8,
      presence_penalty: 0.6,
      frequency_penalty: 0.6,
    });
    res.status(200).json({ insight: response.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate insight' });
  }
}