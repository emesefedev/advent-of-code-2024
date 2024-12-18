import { error } from "console"
import { readFile } from "../utilities/file-manager.js"

export async function day4A() {
    const letters = await day4Input()

    let xmasCounter = 0

    xmasCounter += checkHorizontally(letters)
    xmasCounter += checkVertically(letters)
    xmasCounter += checkDiagonally(letters)
    
    console.log(`XMAS appears ${xmasCounter} times`)
}

export async function day4B() {
    const letters = await day4Input()

    const windowSize = 3
    let xmasCounter = 0

    for (let i = 0; i <= letters.length - windowSize; i++) {
        for (let j = 0; j <= letters[0].length - windowSize; j++) {
            const window = []
            for (let row = i; row < i + windowSize; row++) {
                const aux = []
                for (let col = j; col < j + windowSize; col++) {
                    const letter = letters[row][col];
                    aux.push(letter)
                }
                window.push(aux)
            }
            if (checkX(window)) xmasCounter++
        }
    }

    console.log(`X-MAS appears ${xmasCounter} times`)
}

async function day4Input() {
    const lines = await readFile({filePath: "day04/day4-input.txt"})

    const letters = lines.map((line) => line.split(""))
    
    return letters
}

function checkHorizontally(letters) {
    let counter = 0
    letters.forEach((line) => {
        counter += checkLine(line)
    })
    return counter
}

function checkVertically(letters) {
    let counter = 0
    const lineLength = letters[0].length

    for (let i = 0; i < lineLength; i++) {
        const verticalLine = letters.map((line) => {
            return line[i]
        })

        counter += checkLine(verticalLine)
    }
    
    return counter
}

function checkDiagonally(letters) {
    let counter = 0

    counter += checkDiagonallyUp(letters)
    counter += checkDiagonallyDown(letters)
    
    return counter
}

function checkDiagonallyUp(letters) {
    let counter = 0
    let diagonal = []

    for (let row = 0; row < letters.length; row++) {
        diagonal = []
        for (let i = row, j = 0; i >= 0; i--, j++) {
            const letter = letters[i][j]
            diagonal.push(letter)
        }
        counter += checkLine(diagonal)
    }

    for (let column = 1; column < letters[0].length; column++) {
        diagonal = []
        for (let i = letters.length - 1, j = column; j < letters[0].length; i--, j++) {
            const letter = letters[i][j]
            diagonal.push(letter)
        }
        counter += checkLine(diagonal)
    }

    return counter
}

function checkDiagonallyDown(letters) {
    let counter = 0
    let diagonal = []

    for (let row = 0; row < letters.length; row++) {
        diagonal = []
        for (let i = row, j = 0; i < letters.length; i++, j++) {
            const letter = letters[i][j]
            diagonal.push(letter)
        }
        counter += checkLine(diagonal)
    }

    for (let column = 1; column < letters[0].length; column++) {
        diagonal = []
        for (let i = 0, j = column; j < letters[0].length; i++, j++) {
            const letter = letters[i][j]
            diagonal.push(letter)
        }
        counter += checkLine(diagonal)
    }

    return counter
}

function checkLine(line) {
    const windowSize = 4

    let startIndex = 0
    let endIndex = startIndex + windowSize

    let counter = 0

    while (endIndex <= line.length) {
        const word = line.slice(startIndex, endIndex).join("")
        
        if (checkXMAS(word) || checkSAMX(word)) {
            counter++
        }

        startIndex++
        endIndex = startIndex + windowSize
    }

    return counter
}

function checkX(window) {
    const windowSize = 3

    if (window.length !== windowSize || window[0].length !== windowSize) {
        throw new Error(`Window must be size ${windowSize}x${windowSize}`);
    }
    
    const diagonalUp = []
    const diagonalDown = []
    for (let i = 0; i <windowSize; i++) {
        diagonalUp.push(window[i][windowSize - 1 - i])
        diagonalDown.push(window[i][i])
    }

    const checkDiagonalUp = checkXDiagonal(diagonalUp)
    const checkDiagonalDown = checkXDiagonal(diagonalDown)

    return checkDiagonalUp && checkDiagonalDown
}

function checkXMAS(word) {
    return word === "XMAS"
}

function checkSAMX(word) {
    return word === "SAMX"
}

function checkMAS(word) {
    return word === "MAS"
}

function checkSAM(word) {
    return word === "SAM"
}

function checkXDiagonal(diagonal) {
    const diagonalWord = diagonal.join("")
    return (checkMAS(diagonalWord) || checkSAM(diagonalWord))
}