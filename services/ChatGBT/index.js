import { Common } from "../Common/index.js";

class ChatGBT extends Common {
    async callAI({ openai, ctx }) {
        try {
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
            await ctx.reply(text)
        } catch (err) {
            await ctx.reply("Something went wront, while getting response!")
        }
    }
}

export default new ChatGBT()