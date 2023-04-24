import { WARNING } from "../../constants/index.js";
import Common, { Common as CommonClass } from "../Common/index.js";
import { openai } from "../../config/index.js";
class ChatGBT extends CommonClass {
    async callAI({ ctx }) {
        try {
            clearTimeout(Common.timeoutInstance)
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
            Common.refreshButton({ data:text,  Common, ctx })
            await ctx.reply(text)
        } catch (err) {
            console.log(err.message)
            await ctx.reply(WARNING.WRONG_RESPONSE)
        }
    }
}

export default new ChatGBT()