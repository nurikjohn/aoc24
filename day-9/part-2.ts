import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8")

function find_free_space(file_block: string[][], target_length: number, index: number, pointer: number): [string[], number] {
    if (pointer >= index) {
        throw new Error("out of bound")
    }

    if (file_block[pointer][0] == "." && file_block[pointer].length >= target_length) return [
        file_block[pointer], pointer
    ]

    return find_free_space(file_block, target_length, index, pointer + 1)
}

function calculate_checksum(input: string) {
    let file_blocks: string[][] = []

    for (let i = 0; i < input.length - 1; i++) {
        if (i % 2 == 0) {
            // FILE
            const file_id = Math.floor(i / 2).toString()
            const blocks: string[] = new Array(+input[i]).fill(file_id)

            if (blocks.length) {
                file_blocks.push(blocks)
            }
        } else {
            // FREE SPACE 
            const spaces: string[] = new Array(+input[i]).fill(".")
            if (spaces.length) {
                file_blocks.push(spaces)
            }

        }
    }

    let rearranged = [...file_blocks]

    for (let i = rearranged.length - 1; i >= 0; i--) {
        const block = rearranged[i]

        if (block[0] != ".") {
            try {
                const [free_space, pointer] = find_free_space(rearranged, block.length, i, 0)

                rearranged[pointer] = block
                rearranged[i] = block.map(() => ".")

                if (free_space.length > block.length) {
                    rearranged.splice(pointer + block.length - 1, 0, new Array(free_space.length - block.length).fill("."))
                    i++
                }

            } catch (e) {
            }
        }
    }

    const numbers = rearranged.flatMap(item => item)

    let sum = 0

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] != "." && !isNaN(+numbers[i])) {
            const file_id = +numbers[i]
            sum += file_id * i
        }
    }

    return sum
}

const result = calculate_checksum(input)
console.log(result)
