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
}

export default new Common()