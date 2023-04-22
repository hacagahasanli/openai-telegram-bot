import { Telegraf } from "telegraf"
import { config } from "dotenv";
import { Common, OnBot } from "./services/index.js";
config()

const bot = new Telegraf(process.env.TELEGRAF_TOKEN, { polling: true })

let menuIsOpened = false;

bot.start(async (ctx) => {
    if (!menuIsOpened || ctx.startPayload) {
        await Common.startMenuReply({ ctx });
        return menuIsOpened = true
    }
    await ctx.reply("You have already opened menu")
});

bot.action("generate_image", (ctx) => Common.btnAction({ ctx, name: "DALL-E" }))

bot.action("question_answer", (ctx) => Common.btnAction({ ctx, name: "ChatGBT" }))

bot.action("menu", async (ctx) => {
    Common.currentSelectedBot = ""
    await ctx.deleteMessage()
    await Common.startMenuReply({ ctx });
})

bot.hears(/.*/, async (ctx) => OnBot.botHears({ ctx, Common }));

// Start the bot
bot.launch();