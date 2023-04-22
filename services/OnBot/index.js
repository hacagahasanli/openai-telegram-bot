import { commands } from "../../constants/index.js";
import { DALL_E, ChatGBT } from "../index.js";
import { config } from "dotenv";
config()

class OnBot {
    async botHears({ ctx, Common }) {
        try {
            if (Common.isResGenerating) return;
            Common.isResGenerating = true

            if (!commands.includes(ctx.message?.text)) {
                console.log(Common.currentSelectedBot, "Common.currentSelectedBot")
                switch (Common.currentSelectedBot) {
                    case "ChatGBT":
                        ChatGBT.callAI({ ctx });
                        break;
                    case "DALL-E":
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