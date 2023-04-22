import { openai } from "../../config/index.js";
import { Common } from "../Common/index.js";

class Codex {
    async callAI({ ctx }) {
        try {
            /* 
                clearTimeout(Common.timeoutInstance)
                const response = await openai.createCompletion({
                    model: "davinci-codex",
                    prompt: ctx.message?.text,
                    max_tokens: 1024,
                    n: 1,
                    stop: ['\n'],
                    temperature: 0.7,
                });

                const { choices } = response.data;
                const { text } = choices[0];
                Common.refreshButton({ text,  Common, ctx })
            */
            await ctx.reply("Unfortunately, As of March 2023, the Codex model is now deprecated")
        } catch (error) {
            console.log(error.message);
        }
    }
}

export default new Codex()