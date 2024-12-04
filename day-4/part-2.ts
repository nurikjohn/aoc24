import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8")

function count_word(input: string) {
    const lines = input.split("\n")

    let total = 0

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            const diagonal_forward = lines[i - 1]?.[j + 1] + lines[i]?.[j] + lines[i + 1]?.[j - 1]
            const diagonal_backward = lines[i - 1]?.[j - 1] + lines[i]?.[j] + lines[i + 1]?.[j + 1]

            if ((diagonal_backward == "MAS" || diagonal_backward == "SAM") && (diagonal_forward == "MAS" || diagonal_forward == "SAM")) {
                total++
            }
        }
    }


    return total
}

const result = count_word(input)
console.log(result)
