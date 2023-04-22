import { WARNING } from "../../constants/index.js";
import Common, { Common as CommonClass } from "../Common/index.js";
import { openai } from "../../config/index.js";
import { generateInlineKeyboard } from "../../helpers/index.js";
class ChatGBT extends CommonClass {
    async callAI({ ctx }) {
        try {
            let timeoutInstance;
            clearTimeout(timeoutInstance)
            this.chatAction({ ctx, type: "typing" })
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
            console.log(Common.message, "COMMONG MESSAGE")
            if (text) {
                timeoutInstance = setTimeout(async () => {
                    // await ctx.reply(text)
                    await ctx.telegram.deleteMessage(Common.message.chat.id, Common.message.message_id);
                    await ctx.telegram.sendMessage(Common.message.chat.id, 'Welcome to ChatGBT', generateInlineKeyboard("backToMenu"));
                }, 10000)
            }
            await ctx.reply(text)
        } catch (err) {
            console.log(err.message)
            await ctx.reply(WARNING.WRONG_RESPONSE)
        }
    }
}

export default new ChatGBT()