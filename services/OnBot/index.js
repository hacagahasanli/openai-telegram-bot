import { commands, SERVICES_NAME } from "../../constants/index.js";
import { DALL_E, ChatGBT, Common } from "../index.js";
import { config } from "dotenv";
config()

class OnBot {
    async botHears({ ctx, Common }) {
        try {
            if (Common.isResGenerating) return;
            Common.isResGenerating = true

            if (!commands.includes(ctx.message?.text)) {
                switch (Common.currentSelectedBot) {
                    case SERVICES_NAME.ChatGBT:
                        ChatGBT.callAI({ ctx });
                        break;
                    case SERVICES_NAME.DALLE:
                        DALL_E.callAI({ ctx });
                        break;
                    default:
                        await ctx.reply('You did not choose any AI')
                }
                Common.isResGenerating = false;
            } else {
                await ctx.reply('You can"t answer with command');
            }
        } catch (err) {
            console.log(err)
            await ctx.reply("Check again with another one, something went wrong")
        }
    }
}

export default new OnBot()