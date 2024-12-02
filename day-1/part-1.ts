import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8")

function make_input_array(input: string) {
    const
        first_list: number[] = [],
        second_list: number[] = []

    const lines = input.split("\n")

    for (let line of lines) {
        const [first_id, second_id] = line.split("   ")

        if (first_id && second_id) {
            first_list.push(+first_id)
            second_list.push(+second_id)
        }
    }

    first_list.sort((a, b) => a - b)
    second_list.sort((a, b) => a - b)

    return [first_list, second_list]
}

function find_total_distance(input: string) {
    const [first_list, second_list] = make_input_array(input)
    let total_distance = 0

    for (let i = 0; i < first_list.length; i++) {
        total_distance += Math.abs(first_list[i] - second_list[i])
    }

    return total_distance
}

const result = find_total_distance(input)
console.log(result)
