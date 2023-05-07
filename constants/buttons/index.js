export const choiceIs = {
    MENU: "menu",
    IMAGE_GENERATOR: "generate_image",
    QNA: "question_answer",
    CODE_WRITER: "code_writer"
}

export const menu = [
    [
        { text: "Question Answering AI", callback_data: choiceIs.QNA },
    ],
    [
        { text: "Image generator AI", callback_data: choiceIs.IMAGE_GENERATOR },
        { text: "Write Code AI", callback_data: choiceIs.CODE_WRITER },
    ]
]

const backToMenu = [
    [
        { text: "Back to Menu", callback_data: choiceIs.MENU },
    ],
]

export const buttonLists = {
    "menu": menu,
    "backToMenu": backToMenu
}

export const commands = ['/start', "/help"]