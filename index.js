import { Telegraf } from "telegraf"
import { Configuration, OpenAIApi } from "openai"
import axios from "axios";
import { config } from "dotenv";
config()

const bot = new Telegraf(process.env.TELEGRAF_TOKEN, { polling: true })

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);
const commands = ['/start', "/help"]

let isGeneratingResponse = false;
let menuIsOpened = false;
let currentSelectedBot = ''

const chatGBT = async (ctx) => {
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
}
const createImage = async (ctx) => {
    await ctx.telegram.sendChatAction(ctx.chat.id, 'typing');
    try {
        const response = await openai.createImage({
            prompt: ctx.message?.text,
            n: 2,
            size: "256x256",
        })

        const imageUrls = response.data.data;
        imageUrls.map(async ({ url }, index) => {
            await ctx.replyWithPhoto({ url: url })
            await ctx.reply("Example " + (index + 1))
        })
    } catch (error) {
        console.error(error, "ERROR DALL-E");
    }
};

bot.use((ctx, next) => {
    ctx.state.hasMenu = true;
    return next();
});

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

const backToMenuTab = async (ctx, currPage) => {
    await ctx.reply(`Welcome to ${currPage}`, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Back to Menu", callback_data: "menu" },
                ],
            ]
        }
    })
}

bot.action("generate_image", async (ctx) => {
    await ctx.deleteMessage()
    currentSelectedBot = "DALL-E"
    await backToMenuTab(ctx, "DALL-E");
})

bot.action("question_answer", async (ctx) => {
    await ctx.deleteMessage()
    currentSelectedBot = "ChatGBT"
    await backToMenuTab(ctx, "ChatGBT");
})

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
            switch (currentSelectedBot) {
                case "ChatGBT":
                    chatGBT(ctx);
                    break;
                case "DALL-E":
                    createImage(ctx);
                    break;
            }
            isGeneratingResponse = false;
        } else {
            await ctx.reply('You can"t answer with command');
        }
    } catch (err) {
        await ctx.reply("Check again with another, something went wrong")
    }
});

// Start the bot
bot.launch();