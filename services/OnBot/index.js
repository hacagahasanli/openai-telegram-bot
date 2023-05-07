import { commands, servicesName, warning, INFO } from "../../constants/index.js";
import { DALL_E, ChatGBT, Common, CODEX } from "../index.js";
import { config } from "dotenv";
config()

class OnBot {
    async botHears({ ctx }) {
        try {
            if (Common.isResGenerating) return;
            Common.isResGenerating = true

            if (!commands.includes(ctx.message?.text)) {
                switch (Common.currentSelectedBot) {
                    case servicesName.ChatGBT:
                        ChatGBT.callAI({ ctx });
                        break;
                    case servicesName.DALLE:
                        DALL_E.callAI({ ctx });
                        break;
                    case servicesName.CODEX:
                        CODEX.callAI({ ctx });
                        break;
                    default:
                        await ctx.reply(INFO.UNKNOWN_AI)
                }
                Common.isResGenerating = false;
            } else {
                await ctx.reply(warning.WENT_WRONG);
            }
        } catch (err) {
            console.log(err)
            await ctx.reply(warning.CHECK_ANOTHER)
        }
    }
}

export default new OnBot()