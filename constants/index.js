export const menu = [
    [
        { text: "I wanna give question", callback_data: "question_answer" },
        { text: "Generate Image", callback_data: "generate_image" }
    ],
    [
        { text: "Voice Chat", callback_data: "0" },
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
