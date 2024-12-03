import { readFile } from "../utilities/file-manager.js"

export async function day2A() {

    const reports = await day2Input()

    
}

export async function day2B() {

    
}


async function day2Input() {
    const lines = await readFile({filePath: "test-input.txt"})

    const reports = []

    lines.forEach(line => {
        const report = line.trim().split(/\s+/).map(Number)
        reports.push(report)
    })

    console.log(reports)
    return reports
}