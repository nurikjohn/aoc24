import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8").trim()

const ELAPSED_TIME = 100
const bathroom_width = 101
const bathroom_height = 103

type Robot = { x: number, y: number, vel_x: number, vel_y: number }

function move_robots(robots: Robot[], elapsed_time: number) {
    const new_robots: Robot[] = []

    for (let robot of robots) {
        let future_x = (robot.x + robot.vel_x * elapsed_time) % bathroom_width
        let future_y = (robot.y + robot.vel_y * elapsed_time) % bathroom_height

        if (future_x < 0) {
            future_x += bathroom_width
        }

        if (future_y < 0) {
            future_y += bathroom_height
        }

        new_robots.push({
            x: future_x,
            y: future_y,
            vel_x: robot.vel_x,
            vel_y: robot.vel_y
        })
    }

    return new_robots
}

function calculate_quadrant_sums(robots: Robot[]) {
    let q1 = 0, q2 = 0, q3 = 0, q4 = 0

    for (let robot of robots) {
        if (robot.x < bathroom_width / 2) {
            if (robot.y < bathroom_height / 2) {
                q1++
            } else {
                q3++
            }
        } else {
            if (robot.y < bathroom_height / 2) {
                q2++
            } else {
                q4++
            }
        }
    }

    return (q1 || 1) * (q2 || 1) * (q3 || 1) * (q4 || 1)
}

function seperate_quadrants(robots: Robot[]) {
    const new_robots: Robot[] = []

    for (let robot of robots) {
        if (robot.x == Math.floor(bathroom_width / 2)) {
        } else if (robot.y == Math.floor(bathroom_height / 2)) {
        } else {
            new_robots.push(robot)
        }
    }

    return new_robots
}

function calculate_safety_factor(input: string) {
    const robots = input.split("\n").map((item) => {
        const match = item.match(/p=(.+),(.+) v=(.+),(.+)/)

        let x = 0, y = 0
        let vel_x = 0, vel_y = 0

        if (match) {
            x = +match[1]
            y = +match[2]

            vel_x = +match[3]
            vel_y = +match[4]
        }

        return {
            x, y, vel_x, vel_y
        }
    })

    let tree_elapsed_time = 0
    let min_result = Infinity

    for (let i = 0; i < bathroom_width * bathroom_height; i++) {
        const new_robots = move_robots(robots, i)
        const removed_cross = seperate_quadrants(new_robots)
        const sum = calculate_quadrant_sums(removed_cross)

        if (sum < min_result) {
            min_result = sum
            tree_elapsed_time = i
        }
    }

    return tree_elapsed_time
}

const result = calculate_safety_factor(input)
console.log(result)
