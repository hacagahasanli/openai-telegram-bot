import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai"

config()

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});
export const openai = new OpenAIApi(configuration);