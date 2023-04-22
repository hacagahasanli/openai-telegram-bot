import { commands, SERVICES_NAME, WARNING, INFO } from "../../constants/index.js";
import { DALL_E, ChatGBT, Common } from "../index.js";
import { config } from "dotenv";
config()

class OnBot {
    async botHears({ ctx }) {
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
                        await ctx.reply(INFO.UNKNOWN_AI)
                }
                Common.isResGenerating = false;
            } else {
                await ctx.reply(WARNING.WENT_WRONG);
            }
        } catch (err) {
            console.log(err)
            await ctx.reply(WARNING.CHECK_ANOTHER)
        }
    }
}

export default new OnBot()