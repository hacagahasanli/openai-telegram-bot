import { config } from "dotenv";
import { Common, OnBot } from "./services/index.js";
import { bot } from "./config/index.js"
import { SERVICES_NAME, WARNING } from "./constants/index.js"
config()

let menuIsOpened = false;

bot.start(async (ctx) => {
    if (!menuIsOpened || ctx.startPayload) {
        ctx.state.openedMenu = true
        await Common.startMenuReply({ ctx });
        console.log(ctx.state.openedMenu)
        return menuIsOpened = true
    }

    await ctx.reply(WARNING.MENU)
});

bot.action("generate_image", (ctx) => Common.btnAction({ ctx, name: SERVICES_NAME.DALLE }))

bot.action("question_answer", (ctx) => Common.btnAction({ ctx, name: SERVICES_NAME.ChatGBT }))

bot.action("code_writer", (ctx) => Common.btnAction({ ctx, name: SERVICES_NAME.CODEX }))

bot.action("menu", async (ctx) => {
    Common.currentSelectedBot = ""
    await ctx.deleteMessage()
    await Common.startMenuReply({ ctx });
})

bot.hears(/.*/, async (ctx) => OnBot.botHears({ ctx }));

// Start the bot
bot.launch();

// Assume that the last message sent by the bot has a single inline keyboard with multiple buttons
// let keyboard = ctx.update.callback_query.message.reply_markup.inline_keyboard;
// let lastIndex = keyboard.length - 1;
// keyboard[lastIndex].splice(-1, 1); // Remove the last button
// keyboard[lastIndex].push({ text: 'New Button', callback_data: 'new_button' }); // Add a new button
// await ctx.editMessageReplyMarkup({ inline_keyboard: keyboard });
