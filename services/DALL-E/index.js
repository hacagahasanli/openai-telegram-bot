import { Common } from "../Common/index.js";
import { openai } from "../../config/index.js";

class DALL_E extends Common {
    async callAI({ ctx }) {
        try {
            this.chatAction({ ctx, type: "upload_photo" })
            const response = await openai.createImage({
                prompt: ctx.message?.text,
                n: 2,
                size: "256x256",
            })

            const imageUrls = response.data.data;
            imageUrls.map(async ({ url }) => await ctx.replyWithPhoto({ url }))

        } catch (error) {
            await ctx.reply("Something went wrong, while getting response!")
        }
    }
}

export default new DALL_E()