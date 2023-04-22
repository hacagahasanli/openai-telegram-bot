import { config } from "dotenv";
import { Telegraf } from "telegraf";
import { Configuration, OpenAIApi } from "openai"

config()

export const bot = new Telegraf(process.env.TELEGRAF_TOKEN, { polling: true })

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});
export const openai = new OpenAIApi(configuration);