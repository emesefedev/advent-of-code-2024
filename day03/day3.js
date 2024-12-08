import { readFile } from "../utilities/file-manager.js"

function day3A(input) {
    const matches = input.map(line => parseRawInput(line))
    const matchesList = matches.flat()
    
    const factorsList = matchesList.map(match => parseMatches(match))
    return factorsList
}

function day3B(input) {
    const matches = input.map(line => parseRawInputWithDoDont(line))
    const matchesList = matches.flat()

    const matchesFiltered = filterMatchesWithDoDont(matchesList)

    const factorsList = matchesFiltered.map(match => parseMatches(match))
    return factorsList
}

export async function day3(solveDay3A) {
    const lines = await day3Input()
    const factorsList = solveDay3A ? day3A(lines) : day3B(lines)

    const products = factorsList.map(factors => {
        const [a, b] = factors
        return multiply(a, b)
    })

    const sum = products.reduce((acc, curr) => acc + curr)
    console.log(`The total sum is ${sum}`)
}

async function day3Input() {
    const lines = await readFile({filePath: "day03/day3-input.txt"})
    return lines
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

function parseRawInputWithDoDont(line) {
    const re = /mul\([0-9]{1,3},[0-9]{1,3}\)|(don't)|do/g
    const matches = line.match(re)
    
    return matches
}

function filterMatchesWithDoDont(matchesList) {
    let save = true
    const matchesFiltered = []
    
    for (let i = 0; i < matchesList.length; i++) {
        const element = matchesList[i]
        if (element === "do") save = true
        else if (element === "don't") save = false
        else if (save) matchesFiltered.push(element)
    }

    return matchesFiltered
}