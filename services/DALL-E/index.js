import Common, { Common as CommonClass } from "../Common/index.js";
import { openai } from "../../config/index.js";
import { WARNING } from "../../constants/index.js";

class DALL_E extends CommonClass {
    async callAI({ ctx }) {
        try {
            clearTimeout(Common.timeoutInstance)
            this.chatAction({ ctx, type: "upload_photo" })
            const response = await openai.createImage({
                prompt: ctx.message?.text,
                n: 3,
                size: "256x256",
            })

            const imageUrls = response.data.data;
            imageUrls.map(async ({ url }) => await ctx.replyWithPhoto({ url }))
            Common.refreshButton({ data: imageUrls, Common, ctx })

        } catch (error) {
            console.log(err.message)
            await ctx.reply(WARNING.WRONG_RESPONSE)
        }
    }
}

export default new DALL_E()