import { readFile } from "../utilities/file-manager.js"

export async function day4A() {
    const lines = await day4Input()

    let xmasCounter = 0

    lines.forEach((line) => {
        xmasCounter += checkHorizontal(line)
    })
   
    console.log(xmasCounter)
}

function day4B(input) {
    
}

async function day4Input() {
    const lines = await readFile({filePath: "test-input.txt"})
    console.log(lines)
    return lines
}

function checkHorizontal(line, xmasCounter) {
    const windowSize = 4
    const letters = line.split("")

    let startIndex = 0
    let endIndex = startIndex + windowSize

    let counter = 0

    while (endIndex <= letters.length) {
        const word = letters.slice(startIndex, endIndex).join("")
        
        if (checkXMAS(word) || checkSAMX(word)) {
            counter++
        }

        startIndex++
        endIndex = startIndex + windowSize
    }

    console.log(counter)

    return counter
}

function checkXMAS(word) {
    return word === "XMAS"
}

function checkSAMX(word) {
    return word === "SAMX"
}
