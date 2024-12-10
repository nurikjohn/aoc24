import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8")

function find_antidote_antenas(input: string) {
    const map = input.trim().split("\n").map(line => line.split("")) || []
    const antenna_coordinates = new Map<string, [number, number][]>()

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0]?.length; j++) {
            const frequency = map[i][j]
            if (frequency != ".") {
                const coordinates = antenna_coordinates.get(frequency) ?? []
                antenna_coordinates.set(frequency, [...coordinates, [i, j]])
            }
        }
    }

    let total = 0
    const captured_antidote_coordinates = new Map<string, boolean>()

    for (let item of antenna_coordinates) {
        const [frequency, coordinates] = item

        for (let i = 0; i < coordinates.length; i++) {
            const coordinate = coordinates[i]
            for (let j = i + 1; j < coordinates.length; j++) {
                const pair = coordinates[j]

                const i_diff = coordinate[0] - pair[0]
                const j_diff = coordinate[1] - pair[1]

                const antidote_1 = [coordinate[0] + i_diff, coordinate[1] + j_diff]
                const antidote_2 = [pair[0] - i_diff, pair[1] - j_diff]

                if (antidote_1[0] >= 0 && antidote_1[0] < map.length && antidote_1[1] >= 0 && antidote_1[1] < map[0].length) {
                    const is_captured = captured_antidote_coordinates.get(`${antidote_1[0]}_${antidote_1[1]}`)
                    if (!is_captured) {
                        captured_antidote_coordinates.set(`${antidote_1[0]}_${antidote_1[1]}`, true)
                        total++
                    }
                }

                if (antidote_2[0] >= 0 && antidote_2[0] < map.length && antidote_2[1] >= 0 && antidote_2[1] < map[0].length) {
                    const is_captured = captured_antidote_coordinates.get(`${antidote_2[0]}_${antidote_2[1]}`)
                    if (!is_captured) {
                        captured_antidote_coordinates.set(`${antidote_2[0]}_${antidote_2[1]}`, true)
                        total++
                    }
                }
            }
        }
    }

    return total
}

const result = find_antidote_antenas(input)
console.log(result)
