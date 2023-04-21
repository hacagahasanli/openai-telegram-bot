import { Telegraf } from "telegraf"
import { Configuration, OpenAIApi } from "openai"
import { config } from "dotenv";
config()

const bot = new Telegraf(process.env.TELEGRAF_TOKEN, { polling: true })

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});
let isGeneratingResponse = false;
const openai = new OpenAIApi(configuration);

const commands = ['/start', "/help"]

bot.start(async (ctx) => {
    await ctx.reply('Hey, I am an AI model. How can I help you?', {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "I wanna give question", callback_data: "0" },
                    { text: "Translate word", callback_data: "0" }
                ],
                [
                    { text: "Voice Chat", callback_data: "0" },
                    { text: "Telegram message", callback_data: "0" }
                ]
            ]
        }
    });
});


// Start the bot
bot.launch();