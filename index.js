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

bot.hears(/.*/, async (ctx) => {
    try {
        if (isGeneratingResponse) return;
        isGeneratingResponse = true
        if (!commands.includes(ctx.message?.text)) {
            // Send a "typing" action to the user
            await ctx.telegram.sendChatAction(ctx.chat.id, 'typing');
            // Generate a response using the OpenAI GPT-3 API
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: ctx.message?.text,
                temperature: 0,
                max_tokens: 500,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            });

            const text = response.data.choices[0];
            await ctx.reply(text)
            isGeneratingResponse = false;
        } else {
            await ctx.reply('You can"t answer with command');
        }
    } catch (err) {
        console.log(err.message)
    }
});

// Start the bot
bot.launch();