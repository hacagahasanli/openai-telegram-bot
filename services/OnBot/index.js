import { commands } from "../../constants/index.js";
import { DALL_E, ChatGBT } from "../index.js";
import { Configuration, OpenAIApi } from "openai"
import { config } from "dotenv";
config()

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

class OnBot {
    async botHears({ ctx, Common }) {
        try {
            if (Common.isResGenerating) return;
            Common.isResGenerating = true

            if (!commands.includes(ctx.message?.text)) {
                switch (Common.currentSelectedBot) {
                    case "ChatGBT":
                        ChatGBT.callAI({ ctx, openai });
                        break;
                    case "DALL-E":
                        DALL_E.callAI({ ctx, openai });
                        break;
                    default:
                        await ctx.reply('You did not choose any AI')

                        Common.isResGenerating = false;
                }
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