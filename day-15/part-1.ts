import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8").trim()

class Wall {
}

class Movable {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

class Robot extends Movable {

}

class Box extends Movable {

}

class Warehouse {
    width: number = 0
    height: number = 0
    map: Map<string, Wall | Robot | Box>
    robot: Robot = new Robot(0, 0)
    static directions = {
        right: ">",
        left: "<",
        up: "^",
        down: "v"
    }

    constructor(input: string) {
        this.map = new Map()
        this.create_map(input)
    }

    get_map_key(x: number, y: number) {
        return [x, y].join("_")
    }

    create_map(input: string) {
        const lines = input.split("\n")
        this.width = lines[0].length
        this.height = lines.length

        for (let i = 0; i < lines.length; i++) {
            for (let j = 0; j < lines[0].length; j++) {
                const tile = lines[i][j]
                const key = this.get_map_key(i, j)

                switch (tile) {
                    case "#": {
                        this.map.set(key, new Wall())
                        break
                    }
                    case "O": {
                        this.map.set(key, new Box(i, j))
                        break
                    }
                    case "@": {
                        const robot = new Robot(i, j)
                        this.map.set(key, robot)
                        this.robot = robot
                    }
                }
            }
        }
    }

    move_item(item: Movable, direction: string) {
        let new_x = item.x, new_y = item.y

        switch (direction) {
            case Warehouse.directions.right:
                new_y++
                break
            case Warehouse.directions.left:
                new_y--
                break
            case Warehouse.directions.up:
                new_x--
                break
            case Warehouse.directions.down:
                new_x++
        }

        let can_be_moved = false

        const existing_item = this.map.get(this.get_map_key(new_x, new_y))

        if (!existing_item) can_be_moved = true
        else if (existing_item instanceof Wall) return false
        else if (existing_item instanceof Box) {
            const moved = this.move_item(existing_item, direction)
            can_be_moved = moved
        }

        if (!can_be_moved) return false

        this.map.delete(this.get_map_key(item.x, item.y))
        this.map.set(this.get_map_key(new_x, new_y), item)

        item.x = new_x
        item.y = new_y

        return true
    }

    print() {
        for (let i = 0; i < this.height; i++) {
            let line = ""
            for (let j = 0; j < this.width; j++) {
                const item = this.map.get(this.get_map_key(i, j))
                if (item instanceof Wall) line += "#"
                else if (item instanceof Box) line += "O"
                else if (item instanceof Robot) line += "@"
                else line += "."
            }

            console.log(line)
        }
    }

    sum_gps_coordinates() {
        let sum = 0

        for (let [, item] of this.map.entries()) {
            if (item instanceof Box) {
                sum += (item.x * 100 + item.y)
            }
        }

        return sum
    }
}

function calculated_box_coordinates(input: string) {
    let [map, moves] = input.split("\n\n")
    moves = moves.split("\n").join("")

    const warehouse = new Warehouse(map)

    for (let move of moves) {
        warehouse.move_item(warehouse.robot, move)
    }

    return warehouse.sum_gps_coordinates()
}

const result = calculated_box_coordinates(input)
console.log(result)
