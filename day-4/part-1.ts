import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8")

function count_word(input: string) {
    const lines = input.split("\n")

    let total = 0

    for (let i = 0; i < lines.length; i++) {

        for (let j = 0; j < lines[i].length; j++) {
            const horizontal = lines[i][j] + lines[i][j + 1] + lines[i][j + 2] + lines[i][j + 3]

            if (horizontal == "XMAS" || horizontal == "SAMX") {
                total++
            }

            const vertical = lines[i]?.[j] + lines[i + 1]?.[j] + lines[i + 2]?.[j] + lines[i + 3]?.[j]

            if (vertical == "XMAS" || vertical == "SAMX") {
                total++
            }

            const diagonal_top = lines[i]?.[j] + lines[i - 1]?.[j + 1] + lines[i - 2]?.[j + 2] + lines[i - 3]?.[j + 3]

            if (diagonal_top == "XMAS" || diagonal_top == "SAMX") {
                total++
            }

            const diagonal_bottom = lines[i]?.[j] + lines[i + 1]?.[j + 1] + lines[i + 2]?.[j + 2] + lines[i + 3]?.[j + 3]

            if (diagonal_bottom == "XMAS" || diagonal_bottom == "SAMX") {
                total++
            }
        }
    }


    return total
}

const result = count_word(input)
console.log(result)
