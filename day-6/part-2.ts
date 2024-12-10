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

    let [x, y] = find_initial_position(map)

    if (!x || !y) return 0

    let direction = "up"
    let possible_obstructions_count = 0
    const visited_obstructions = new Map()

    let i = x, j = y

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
            visited_obstructions.set(`${new_i}${new_j}`, true)
        } else {
            i = new_i
            j = new_j

            if (!(i == x && j == y)) {
                if (direction == "up") {
                    map[i][j] = "|"
                } else if (direction == "right") {
                    map[i][j] = "-"
                } else if (direction == "down") {
                    map[i][j] = "|"
                } else if (direction == "left") {
                    map[i][j] = "-"
                }
            }


            // @ts-ignore
            let possible_direction = directions_map[direction]

            if (possible_direction == "up") {
                for (let k = i - 1; k >= 0; k--) {
                    if (visited_obstructions.get(`${k}${j + 1}`)) {
                        console.log("UP", k, j + 1, i, j)

                        map[i][j] = "×"
                    }
                }
            } else if (possible_direction == "right") {
                for (let k = j + 1; k < map[0].length; k++) {
                    if (visited_obstructions.get(`${i + 1}${k}`)) {
                        console.log("RIGHT", i + 1, k, i, j)

                        map[i][j] = "×"
                    }
                }
            } else if (possible_direction == "down") {
                for (let k = i + 1; k < map.length; k++) {
                    if (visited_obstructions.get(`${k}${j - 1}`)) {
                        console.log("DOWN", k, j - 1, i, j)

                        map[i][j] = "×"
                    }
                }
            } else if (possible_direction == "left") {
                for (let k = j - 1; k >= 0; k--) {
                    if (visited_obstructions.get(`${i - 1}${k}`)) {
                        console.log("LEFT", i - 1, k, i, j)

                        map[i][j] = "×"
                    }
                }
            }
        }

        console.log(map.map(item => item.join("")).join("\n"))

        console.log("\n", i, j)

    }

    return map.reduce((acc, item) => acc + item.filter(item => item == "×").length, 0)
}

const result = count_visit_points(input)
console.log(result)
