import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8").trim()

class LinkNode {
    value: number
    next?: LinkNode

    constructor(value: number, next?: LinkNode) {
        this.value = value
        this.next = next
    }
}

function linked_list_to_array(head?: LinkNode): number[] {
    let node = head
    const array: number[] = []

    while (node) {
        array.push(node.value)

        node = node.next
    }

    return array
}

function array_to_linked_list(input: number[]) {
    if (!input.length) return

    const node = new LinkNode(input[0])

    node.next = array_to_linked_list(input.slice(1))

    return node
}

function transform_stones(stones?: LinkNode) {
    let stone = stones

    while (stone) {
        const digits = stone.value.toString().split("")

        if (stone.value == 0) {
            stone.value = 1

            stone = stone.next
        } else if (digits.length % 2 == 0) {
            const first_half = +digits.slice(0, digits.length / 2).join("")
            const second_half = +digits.slice(digits.length / 2).join("")

            stone.value = +first_half
            const temp = stone.next

            stone.next = new LinkNode(second_half, temp)
            stone = temp
        } else {
            stone.value = stone.value * 2024

            stone = stone.next
        }

    }

    return stones
}

function calculate_number_of_stones(input: string, blinks: number) {
    let stones = array_to_linked_list(input.split(" ").map(item => +item))

    for (let i = 0; i < blinks; i++) {
        stones = transform_stones(stones)
    }

    return linked_list_to_array(stones).length
}

const result = calculate_number_of_stones(input, 6)
console.log(result)
