import { generateInlineKeyboard } from "../../helpers/index.js";

class Common {
    constructor() {
        this.currentSelectedBot = ""
        this.isResGenerating = false;
    }
    async btnAction({ ctx, name }) {
        try {
            await ctx.deleteMessage()
            this.currentSelectedBot = name
            await this.backToMenuTab(ctx, name);
        } catch (err) {
            await ctx.reply(`Eseflesme, just something went wrong`)
        }
    }
    async backToMenuTab(ctx, currPage) {
        try {
            await ctx.reply(`Welcome to ${currPage}`, generateInlineKeyboard("backToMenu"))
        } catch (err) {
            await ctx.reply(`Eseflesme, just something went wrong`)
        }
    }
    async chatAction({ ctx, type }) {
        await ctx.telegram.sendChatAction(ctx.chat.id, type);
    }
    async startMenuReply({ ctx, btnListType = "menu" }) {
        await ctx.reply('Hey, I am an AI model. How can I help you?', generateInlineKeyboard(btnListType));
    }
}

export default new Common()
export { Common }