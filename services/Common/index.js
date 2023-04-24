import { generateInlineKeyboard } from "../../helpers/index.js";
import { WARNING, INFO } from "../../constants/index.js";

class Common {
    constructor() {
        this.currentSelectedBot = ""
        this.isResGenerating = false;
        this.message = ""
        this.timeoutInstance = ''
    }
    async btnAction({ ctx, name }) {
        try {
            await ctx.deleteMessage()
            clearTimeout(this.timeoutInstance)
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
    async refreshButton({ data, Common, ctx }) {
        try {
            if (data) {
                this.timeoutInstance = setTimeout(async () => {
                    await ctx.telegram.deleteMessage(Common.message.chat.id, Common.message.message_id);
                    await ctx.telegram.sendMessage(Common.message.chat.id, `Welcome to ${this.currentSelectedBot}`, generateInlineKeyboard("backToMenu"));
                }, 10000)
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export default new Common()
export { Common }