import { config } from "dotenv";
import { Common, OnBot } from "./services/index.js";
import { bot } from "./config/index.js"
import { SERVICES_NAME } from "./constants/index.js"
config()

let menuIsOpened = false;

bot.start(async (ctx) => {
    if (!menuIsOpened || ctx.startPayload) {
        await Common.startMenuReply({ ctx });
        return menuIsOpened = true
    }
    await ctx.reply("You have already opened menu")
});

bot.action("generate_image", (ctx) => Common.btnAction({ ctx, name: SERVICES_NAME.DALLE }))

bot.action("question_answer", (ctx) => Common.btnAction({ ctx, name: SERVICES_NAME.ChatGBT }))

bot.action("menu", async (ctx) => {
    Common.currentSelectedBot = ""
    await ctx.deleteMessage()
    await Common.startMenuReply({ ctx });
})

bot.hears(/.*/, async (ctx) => OnBot.botHears({ ctx }));

// Start the bot
bot.launch();