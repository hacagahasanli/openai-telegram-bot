export const menu = [
    [
        { text: "Question answering bot", callback_data: "question_answer" },
        { text: "Image generator bot", callback_data: "generate_image" }
    ],
    [
        { text: "Write Code into application", callback_data: "code_writer" },
        { text: "Telegram message", callback_data: "0" }
    ]
]

const backToMenu = [
    [
        { text: "Back to Menu", callback_data: "menu" },
    ],
]

export const buttonLists = {
    "menu": menu,
    "backToMenu": backToMenu
}

export const commands = ['/start', "/help"]