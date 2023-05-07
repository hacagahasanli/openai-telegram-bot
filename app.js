import { config } from "dotenv";
import { Common, OnBot } from "./services/index.js";
import { bot } from "./config/index.js"
import { servicesName, warning, choiceIs } from "./constants/index.js"
config()

let menuIsOpened = false;
const { IMAGE_GENERATOR, QNA, CODE_WRITER, MENU } = choiceIs
const { DALLE, ChatGBT, CODEX } = servicesName

bot.start(async (ctx) => {
    if (!menuIsOpened || ctx.startPayload) {
        ctx.state.openedMenu = true
        await Common.startMenuReply({ ctx });
        return menuIsOpened = true
    }

    await ctx.reply(warning.MENU)
});

bot.action(IMAGE_GENERATOR, (ctx) => Common.btnAction({ ctx, name: DALLE }))

bot.action(QNA, (ctx) => Common.btnAction({ ctx, name: ChatGBT }))

bot.action(CODE_WRITER, (ctx) => Common.btnAction({ ctx, name: CODEX }))

bot.action(MENU, async (ctx) => {
    Common.currentSelectedBot = ""
    await ctx.deleteMessage()
    await Common.startMenuReply({ ctx });
})

bot.hears(/.*/, async (ctx) => OnBot.botHears({ ctx }));

// Start the bot
bot.launch();
