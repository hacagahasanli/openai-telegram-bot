import { generateInlineKeyboard } from "../../helpers/index.js";
class Common {
    constructor() {
        this.currentSelectedBot = ""
    }
    async btnAction({ ctx, name }) {
        try {
            await ctx.deleteMessage()
            this.currentSelectedBot = name
            await this.backToMenuTab(ctx, name);
        } catch (err) {

        }
    }
    async backToMenuTab(ctx, currPage) {
        try {
            await ctx.reply(`Welcome to ${currPage}`, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "Back to Menu", callback_data: "menu" },
                        ],
                    ]
                }
            })
        } catch (err) {

        }

    }
    async chatAction({ ctx, type }) {
        await ctx.telegram.sendChatAction(ctx.chat.id, type);
    }
    async startMenuReply({ ctx }) {
        await ctx.deleteMessage()
        await ctx.reply('Hey, I am an AI model. How can I help you?', generateInlineKeyboard("menu"));
    }
}

export default new Common()
export { Common }