export const menu = [
    [
        { text: "Question Answering AI", callback_data: "question_answer" },
    ],
    [
        { text: "Image generator AI", callback_data: "generate_image" },
        { text: "Write Code AI", callback_data: "code_writer" },
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