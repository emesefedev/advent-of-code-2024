import { readFile } from "../utilities/file-manager.js"
import { compareArrays, distancesBetweenElements } from "../utilities/array-functions.js";

export async function day2A() {

    const reports = await day2Input()
    const safeReports = []

    reports.forEach((report) => {
        const sorted = report.toSorted();
        
        const levelDifferences = distancesBetweenElements(report)
        
        const isAscending = levelDifferences.every(element => element < 0)
        const isDescending = levelDifferences.every(element => element > 0)
        
        const differencesInLimits = levelDifferences.every(element =>
            isBetweenLimits(Math.abs(element)))

        const isSafe = (isAscending || isDescending) && differencesInLimits
        safeReports.push(isSafe)
    })

    const totalSafeReports = safeReports.filter(isSafe => isSafe).length
    console.log(`There are ${totalSafeReports} safe reports`)
}

export async function day2B() {

    
}


async function day2Input() {
    const lines = await readFile({filePath: "day02/day2-input.txt"})

    const reports = []

    lines.forEach(line => {
        const report = line.trim().split(/\s+/).map(Number)
        reports.push(report)
    })
    
    return reports
}

function isBetweenLimits(element) {
    return element >= 1 && element <= 3
}