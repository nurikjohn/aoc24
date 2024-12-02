import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8")

function make_input_map(input: string) {
    const
        first_map: Map<number, number> = new Map(),
        second_map: Map<number, number> = new Map()

    const lines = input.split("\n")

    for (let line of lines) {
        let [first_id, second_id] = line.split("   ").map((value) => +value)

        if (first_id && second_id) {
            const first_existing_value = first_map.get(first_id) || 0
            const second_existing_value = second_map.get(second_id) || 0

            first_map.set(first_id, first_existing_value + 1)
            second_map.set(second_id, second_existing_value + 1)
        }
    }

    return [first_map, second_map]
}

function find_similarity_score(input: string) {
    const [first_map, second_map] = make_input_map(input)
    let similarity_score = 0

    for (let [key, value] of first_map) {
        similarity_score += key * (second_map.get(key) || 0) * value
    }

    return similarity_score
}

const result = find_similarity_score(input)
console.log(result)
