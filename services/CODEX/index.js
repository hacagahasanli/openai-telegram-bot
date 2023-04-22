import { openai } from "../../config/index.js";

class Codex {
    async callAI({ ctx }) {
        try {
            const response = await openai.createCompletion({
                model: "davinci-codex",
                prompt: ctx.message?.text,
                max_tokens: 1024,
                n: 1,
                stop: ['\n'],
                temperature: 0.7,
            });
            console.log(response.data, "RESPONSE DATA");
        } catch (error) {
            console.error(error);
        }
    }
}

export default new Codex()