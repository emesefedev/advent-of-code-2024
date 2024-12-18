import { readFile } from "../utilities/file-manager.js"
import { getMiddleValue } from "../utilities/array-functions.js"

export async function day5A() {

    const {orderingRules, pages} = await day5Input()

    const orderedUpdates = pages.filter((update) => checkUpdate(update, orderingRules))
    
    const middleNumbers = orderedUpdates.map((update) => getMiddleValue(update))
    const result = middleNumbers.reduce((acc, curr) => acc + curr) 

    console.log(`Result: ${result}`)
}

export async function day5B() {
    const {orderingRules, pages} = await day5Input()

    const unorderedUpdates = pages.filter((update) => !checkUpdate(update, orderingRules))
    const orderedUpdates = unorderedUpdates.map((update) => orderUpdate(update, orderingRules))
    
    const middleNumbers = orderedUpdates.map((update) => getMiddleValue(update))
    const result = middleNumbers.reduce((acc, curr) => acc + curr) 

    console.log(`Result: ${result}`)
    
}

// Important: for this input, filter(line => line.trim() !== '') must not be applied in readFile() function
async function day5Input() {
    const lines = await readFile({filePath: "day05/day5-input.txt"})
    //console.log(lines)
    
    const separatorIdx = lines.findIndex((line) => line === '')

    const orderingRules = lines.splice(0, separatorIdx).map((rule) => rule.split("|").map(Number))
    const pages = lines.slice(1).map((update) => update.split(",").map(Number))
    
    return {orderingRules, pages}
}

function checkUpdate(update, orderingRules) {
    for (let pageIdx = 0; pageIdx < update.length; pageIdx++) {
        const page = update[pageIdx]

        for (let ruleIdx = 0; ruleIdx < orderingRules.length; ruleIdx++) {
            const rule = orderingRules[ruleIdx]
            // Before
            if (page === rule[0]) {
                for (let i = 0; i < pageIdx; i++) {
                    if (update[i] === rule[1]) {
                        return false
                    }
                }
            } 
            
            // After
            if (page === rule[1]) {
                for (let i = pageIdx + 1; i < update.length; i++) {
                    if (update[i] === rule[0]) {
                        return false
                    }
                }
            } 
        }
    }
    return true
}

function orderUpdate(update, orderingRules) {
    const orderedUpdate = [...update]
    
    for (let pageIdx = 0; pageIdx < update.length; pageIdx++) {
        let forceBreak = false
        const page = orderedUpdate[pageIdx]

        for (let ruleIdx = 0; ruleIdx < orderingRules.length; ruleIdx++) {
            const rule = orderingRules[ruleIdx]
            // Before
            if (page === rule[0]) {
                for (let i = 0; i < pageIdx; i++) {
                    if (orderedUpdate[i] !== rule[1]) continue

                    orderedUpdate[pageIdx] = orderedUpdate[i]
                    orderedUpdate[i] = page
                    forceBreak = true
                }
            } 
            
            if (forceBreak) {
                pageIdx--
                break
            }
            
            // After
            if (page === rule[1]) {
                for (let i = pageIdx + 1; i < update.length; i++) {
                    if (orderedUpdate[i] !== rule[0]) continue
                    
                    orderedUpdate[pageIdx] = orderedUpdate[i]
                    orderedUpdate[i] = page
                    forceBreak = true
                }
            } 
            if (forceBreak) {
                pageIdx--
                break
            }
        }
    }
    return orderedUpdate
}