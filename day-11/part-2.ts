import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8").trim()

const memo = new Map<number, Map<number, number>>()

function memoize_stone_blinks(stone: number, blinks: number, result: number) {
    const memoized = memo.get(stone)

    if (memoized) {
        memoized.set(blinks, result)
    } else {
        const memoized = new Map<number, number>()

        memoized.set(blinks, result)
        memo.set(stone, memoized)
    }
}

function transform_stone(stone: number, blinks: number): number {
    if (blinks == 0) return 1

    const memoized = memo.get(stone)
    const memoized_blinks = memoized?.get(blinks)

    if (memoized_blinks) {
        return memoized_blinks
    }

    const digits = stone.toString()

    if (stone == 0) {
        const result = transform_stone(1, blinks - 1)

        memoize_stone_blinks(1, blinks - 1, result)

        return result
    } else if (digits.length % 2 == 0) {
        let first_half: number, second_half: number
        first_half = +digits.split("").slice(0, digits.length / 2).join("")
        second_half = +digits.split("").slice(digits.length / 2).join("")

        const result_1 = transform_stone(first_half, blinks - 1)
        const result_2 = transform_stone(second_half, blinks - 1)

        memoize_stone_blinks(first_half, blinks - 1, result_1)
        memoize_stone_blinks(second_half, blinks - 1, result_2)

        return result_1 + result_2
    } else {
        const new_stone = stone * 2024
        const result = transform_stone(new_stone, blinks - 1)

        memoize_stone_blinks(new_stone, blinks - 1, result)

        return result
    }
}

function calculate_number_of_stones(input: string, blinks: number) {
    let stones = input.split(" ").map(item => +item)

    let sum = 0

    for (let i = 0; i < stones.length; i++) {
        const stone = stones[i]
        const length = transform_stone(stone, blinks)

        memoize_stone_blinks(stone, blinks, length)

        sum += length
    }

    return sum
}

const result = calculate_number_of_stones(input, 75)
console.log(result)
