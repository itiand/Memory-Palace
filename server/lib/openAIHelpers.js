import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';


dotenv.config();

const { GPT_API_KEY } = process.env;
const openai = new OpenAIApi(new Configuration({
  apiKey: GPT_API_KEY
}));

export async function getChatResponse(content) {
  try {
    const res = await openai.createChatCompletion({ 
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: content }]
    });
    return res.data.choices[0].message.content;
  } catch (error) {
    console.error("Error in getChatResponse helper:", error);
    throw error;
  }
}

export async function getImage(promptText) {
  try {
    const response = await openai.createImage({
      prompt: promptText,
      n: 3,
      size: "256x256",
    });
    return response.data.data[0].url ;
  } catch (error) {
    console.error("Error in getImage helper:", error);
    throw error;
  }
}
