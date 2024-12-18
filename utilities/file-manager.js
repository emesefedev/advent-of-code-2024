import fs from 'fs'

export async function readFile({
    filePath = ""
}) {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8')
        const lines = data.split('\n')//.filter(line => line.trim() !== '')
        
        return lines
    } 
    catch (error) {
        console.error('Error reading file: ', error)
        throw error
    }
}