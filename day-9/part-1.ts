import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8")

function get_file_block(file_block: string[], pointer: number, min: number): [string, number] {
    if (pointer <= min) {
        throw new Error("out of bound")
    }

    if (file_block[pointer] != ".") return [
        file_block[pointer], pointer - 1
    ]

    return get_file_block(file_block, pointer - 1, min)
}

function calculate_checksum(input: string) {
    let file_blocks: string[] = []

    for (let i = 0; i < input.length - 1; i++) {
        if (i % 2 == 0) {
            // FILE
            const file_id = Math.floor(i / 2).toString()
            const blocks: string[] = new Array(+input[i]).fill(file_id)
            file_blocks.push(...blocks)
        } else {
            // FREE SPACE 
            const spaces: string[] = new Array(+input[i]).fill(".")
            file_blocks.push(...spaces)
        }
    }

    let rearranged: any[] = [...file_blocks]
    let end_pointer = rearranged.length - 1

    for (let i = 0; i < file_blocks.length; i++) {
        const block = rearranged[i]

        if (i > end_pointer) {
            rearranged[i] = "."
        } else if (block == ".") {
            try {
                const [file_block, new_pointer] = get_file_block(rearranged, end_pointer, i)
                rearranged[i] = file_block
                end_pointer = new_pointer
            } catch (e) {

            }
        }
    }

    rearranged = rearranged.map(item => Number(item)).filter(item => !isNaN(item))

    let sum = 0

    for (let i = 0; i < rearranged.length; i++) {
        if (rearranged[i] != ".") {
            const file_id = rearranged[i]
            sum += file_id * i
        }
    }

    return sum
}

const result = calculate_checksum(input)
console.log(result)
