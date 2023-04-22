import { buttonLists } from "../constants/index.js"

export const generateInlineKeyboard = (listName) => {
    return {
        reply_markup: {
            inline_keyboard: buttonLists[listName]
        }
    }
}

