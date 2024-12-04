import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8")

function sum_of_multiplications(input: string) {
    let total = 0

    const commands = input.match(/(mul\((?<number_1>\d+),(?<number_2>\d+)\))|(don't\(\))|(do\(\))/gm)

    if (!commands) return total

    let enabled = true

    for (let command of commands) {
        if (command == "do()") {
            enabled = true
        } else if (command == "don't()") {
            enabled = false
        } else if (enabled) {
            const match = command.match(/mul\((?<number_1>\d+),(?<number_2>\d+)\)/)

            if (match && match.groups) {
                const number_1 = +match.groups.number_1 || 0
                const number_2 = +match.groups.number_2 || 0

                total += number_1 * number_2
            }
        }
    }

    return total
}

const result = sum_of_multiplications(input)
console.log(result)