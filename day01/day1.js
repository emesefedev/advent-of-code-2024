import { readFile } from "../utilities/file-manager.js"
import { frequency } from "../utilities/array-functions.js"

export async function day1A() {

    const {leftList, rightList} = await day1Input()

    leftList.sort()
    rightList.sort()

    const distances = []

    if (leftList.length !== rightList.length) throw new Error("Lists don't have the same length")

    for (let i = 0; i < leftList.length; i++) {
        const distance = Math.abs(rightList[i] - leftList[i])
        distances.push(distance)
    }

    const totalDistance = distances.reduce((sum, current) => {
        return sum + current
    })

    console.log(totalDistance)
}

export async function day1B() {

    const {leftList, rightList} = await day1Input()

    const similarities = []

    if (leftList.length !== rightList.length) throw new Error("Lists don't have the same length")

    leftList.forEach(element => {
        const freq = frequency(rightList, element)
        const similarity = element * freq
        
        similarities.push(similarity)
    })

    const similarityScore = similarities.reduce((sum, current) => {
        return sum + current
    })

    console.log(similarityScore)
}


async function day1Input() {
    const lines = await readFile({filePath: "day01/day1-input.txt"})

    const leftList = []
    const rightList = []

    lines.forEach(line => {
        const [a, b] = line.trim().split(/\s+/).map(Number)
        leftList.push(a)
        rightList.push(b)
    })

    return {leftList, rightList}
}