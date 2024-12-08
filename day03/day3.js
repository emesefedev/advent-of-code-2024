import { readFile } from "../utilities/file-manager.js"

export async function day3A() {
    const factorsList = await day3Input()

    const products = factorsList.map(factors => {
        const [a, b] = factors
        return multiply(a, b)
    })

    const sum = products.reduce((acc, curr) => acc + curr)
    console.log(`The total sum is ${sum}`)
}

export async function day3B() {
    
}

async function day3Input() {
    const lines = await readFile({filePath: "day03/day3-input.txt"})
    const matches = lines.map(line => parseRawInput(line))
    const matchesList = matches.flat()
    
    const factorsList = matchesList.map(match => parseMatches(match))
    return factorsList
}

function parseRawInput(line) {
    const re = /(mul\([0-9]{1,3},[0-9]{1,3}\))/g
    const matches = line.match(re)
    
    return matches
}

function parseMatches(match) {
    const re = /([0-9]{1,3})/g
    const factorsStr = match.match(re)
    const factors = factorsStr.map(factor => parseInt(factor))

    return factors
}

function multiply(a, b) {
    return a * b
}