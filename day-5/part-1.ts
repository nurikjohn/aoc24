import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8")

function sum_middle_page_numbers(input: string) {
    const [rules, updates] = input.split("\n\n").map((item) => item.trim().split("\n"))

    let total = 0

    for (let update of updates) {
        const pages = update.split(",")
        let is_correct = true

        for (let i = 0; i < pages.length; i++) {
            for (let j = 0; j < pages.length; j++) {
                if (i == j) continue

                let pair = ""

                if (j < i) {
                    pair = pages[j] + "|" + pages[i]
                } else {
                    pair = pages[i] + "|" + pages[j]
                }

                if (!rules.includes(pair)) {
                    is_correct = false
                }
            }
        }

        if (is_correct) {
            total += parseInt(pages[Math.floor(pages.length / 2)])
        }
    }

    return total
}

const result = sum_middle_page_numbers(input)
console.log(result)
