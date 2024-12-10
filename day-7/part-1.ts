import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8")

const operators = ["+", "*"]

const increment_indices = (
    indices: number[],
    current_index: number
): { done: boolean; indices: number[] } => {
    if (current_index < 0) return { done: true, indices };

    const current_value = indices[current_index];

    if (current_value + 1 >= operators.length) {
        indices[current_index] = 0;

        return increment_indices(indices, current_index - 1);
    }

    indices[current_index]++;
    return { done: false, indices };
};

function find_combination(target: number, values: number[]) {
    let indices = new Array(values.length - 1).fill(0);

    let is_valid = false

    while (true) {
        const combination = indices.map((el) => operators[el]);

        let sum = values[0]

        for (let i = 1; i < values.length; i++) {
            switch (combination[i - 1]) {
                case operators[0]: {
                    sum += values[i]
                    break
                }
                case operators[1]: {
                    sum *= values[i]
                    break
                }
            }
        }

        if (sum == target) {
            is_valid = true
            break
        }

        const { done, indices: newIndecies } = increment_indices(
            indices,
            indices.length - 1
        );
        indices = newIndecies;

        if (done) break;
    }

    return is_valid
}

function calculate_sum(input: string) {
    const lines = input.trim().split("\n").map(item => {
        const [target, values] = item.split(": ")

        return {
            target: +target,
            values: values.split(" ").map(item => +item)
        }
    })

    let total = 0

    for (let line of lines) {
        const is_valid_combination = find_combination(line.target, line.values)

        if (is_valid_combination) {
            total += line.target
        }
    }

    return total
}

const result = calculate_sum(input)
console.log(result)
