import { Common } from "../Common/index.js";
import { openai } from "../../config/index.js";
import { WARNING } from "../../constants/index.js";

class DALL_E extends Common {
    async callAI({ ctx }) {
        try {
            this.chatAction({ ctx, type: "upload_photo" })
            const response = await openai.createImage({
                prompt: ctx.message?.text,
                n: 3,
                size: "256x256",
            })

            const imageUrls = response.data.data;
            imageUrls.map(async ({ url }) => await ctx.replyWithPhoto({ url }))

        } catch (error) {
            await ctx.reply(WARNING.WRONG_RESPONSE)
        }
    }
}

export default new DALL_E()