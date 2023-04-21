import { Telegraf } from "telegraf"
import { Configuration, OpenAIApi } from "openai"
import { config } from "dotenv";
import { Common, ChatGBT } from "./services/index.js";
config()

const bot = new Telegraf(process.env.TELEGRAF_TOKEN, { polling: true })

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);
const commands = ['/start', "/help"]

let isGeneratingResponse = false;
let menuIsOpened = false;

const createImage = async (ctx) => {
    await ctx.telegram.sendChatAction(ctx.chat.id, 'upload_photo');
    try {
        const response = await openai.createImage({
            prompt: ctx.message?.text,
            n: 2,
            size: "256x256",
        })

        const imageUrls = response.data.data;
        imageUrls.map(async ({ url }) => {
            await ctx.replyWithPhoto({ url: url })
        })
    } catch (error) {
        console.error(error, "ERROR DALL-E");
    }
};

bot.start(async (ctx) => {
    if (!menuIsOpened || ctx.startPayload) {
        await ctx.reply('Hey, I am an AI model. How can I help you?', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "I wanna give question", callback_data: "question_answer" },
                        { text: "Generate Image", callback_data: "generate_image" }
                    ],
                    [
                        { text: "Voice Chat", callback_data: "0" },
                        { text: "Telegram message", callback_data: "0" }
                    ]
                ]
            }
        });
        menuIsOpened = true
    }
    else {
        await ctx.reply("You have already opened menu")
    }
});

bot.action("generate_image", (ctx) => Common.btnAction({ ctx, name: "DALL-E" }))

bot.action("question_answer", (ctx) => Common.btnAction({ ctx, name: "ChatGBT" }))

bot.action("menu", async (ctx) => {
    await ctx.deleteMessage()
    await ctx.reply('Hey, I am an AI model. How can I help you?', {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "I wanna give question", callback_data: "question_answer" },
                    { text: "Generate Image", callback_data: "generate_image" }],
                [
                    { text: "Voice Chat", callback_data: "0" },
                    { text: "Telegram message", callback_data: "0" }
                ]
            ]
        }
    });
})

bot.hears(/.*/, async (ctx) => {
    try {
        if (isGeneratingResponse) return;
        isGeneratingResponse = true
        if (!commands.includes(ctx.message?.text)) {
            isGeneratingResponse = false;
            switch (Common.currentSelectedBot) {
                case "ChatGBT":
                    ChatGBT.callAI({ ctx, openai });
                    break;
                case "DALL-E":
                    createImage(ctx);
                    break;
            }
        } else {
            await ctx.reply('You can"t answer with command');
        }
    } catch (err) {
        await ctx.reply("Check again with another, something went wrong")
    }
});

// Start the bot
bot.launch();