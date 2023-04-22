import { generateInlineKeyboard } from "../../helpers/index.js";
import { WARNING, INFO } from "../../constants/index.js";

class Common {
    constructor() {
        this.currentSelectedBot = ""
        this.isResGenerating = false;
        this.message = ""
    }
    async btnAction({ ctx, name }) {
        try {
            await ctx.deleteMessage()
            this.currentSelectedBot = name
            await this.backToMenuTab(ctx, name);
        } catch (err) {
            console.log(err.message)
            await ctx.reply(WARNING.WENT_WRONG)
        }
    }
    async backToMenuTab(ctx, currPage) {
        try {
            this.message = await ctx.reply(`Welcome to ${currPage}`, generateInlineKeyboard("backToMenu"))
        } catch (err) {
            console.log(err.message)
            await ctx.reply(WARNING.WENT_WRONG)
        }
    }
    async chatAction({ ctx, type }) {
        await ctx.telegram.sendChatAction(ctx.chat.id, type);
    }
    async startMenuReply({ ctx, btnListType = "menu" }) {
        this.message = await ctx.reply(INFO.AI_MODEL_TEXT, generateInlineKeyboard(btnListType));
    }
}

export default new Common()
export { Common }