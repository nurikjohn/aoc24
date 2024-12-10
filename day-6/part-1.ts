import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8")

const directions_map = {
    up: "right",
    right: "down",
    down: "left",
    left: "up"
}

function find_initial_position(map: string[][]) {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] == "^") {
                return [i, j]
            }
        }
    }

    return [null, null]
}

function count_visit_points(input: string) {
    const map = input.split("\n").map((item) => item.trim().split("")).filter(item => item.length)

    let [i, j] = find_initial_position(map)

    if (!i || !j) return 0

    let direction = "up"

    map[i][j] = "0"

    while (true) {
        // @ts-ignore
        let new_i = i, new_j = j

        if (direction == "up") {
            new_i--
        } else if (direction == "right") {
            new_j++
        } else if (direction == "down") {
            new_i++
        } else if (direction == "left") {
            new_j--
        }

        if (new_i < 0 || new_j < 0 || new_i >= map.length || new_j >= map[new_i].length) {
            break
        }

        const point = map[new_i][new_j]

        if (point == "#") {
            // @ts-ignore
            direction = directions_map[direction]
        } else {
            i = new_i
            j = new_j

            // @ts-ignore
            map[i][j] = "X"
        }
    }

    return map.reduce((acc, item) => acc + item.filter(item => item == "X").length, 0)
}

const result = count_visit_points(input)
console.log(result)
