import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8").trim()

const button_regex = RegExp(/Button [AB]: X\+(\d+), Y\+(\d+)/)
const price_regex = RegExp(/Prize: X=(\d+), Y=(\d+)/)

function create_claw_machine_options(input: string) {
    const claw_machine_options = input.split("\n\n").map((item) => {
        const [button_a, button_b, target] = item.split("\n")

        let button_a_config = { x: 0, y: 0 }
        const match_a = button_a.match(button_regex)

        if (match_a) {
            button_a_config.x = + match_a[1]
            button_a_config.y = + match_a[2]
        }

        let button_b_config = { x: 0, y: 0 }
        const match_b = button_b.match(button_regex)

        if (match_b) {
            button_b_config.x = + match_b[1]
            button_b_config.y = + match_b[2]
        }

        let prise_config = { x: 0, y: 0 }
        const match_price = target.match(price_regex)

        if (match_price) {
            prise_config.x = 10000000000000 + +match_price[1]
            prise_config.y = 10000000000000 + +match_price[2]
        }

        return {
            button_a: button_a_config,
            button_b: button_b_config,
            price: prise_config
        }
    })

    return claw_machine_options
}

function calculate_tokens(input: string) {
    const claw_machine_options = create_claw_machine_options(input)

    let total_tokens = 0

    for (let { button_a, button_b, price } of claw_machine_options) {
        const button_a_press = (price.x * button_b.y - price.y * button_b.x) / (button_a.x * button_b.y - button_a.y * button_b.x)

        if (button_a_press != Math.round(button_a_press)) {
            continue
        }

        const button_b_press = (price.x - button_a_press * button_a.x) / button_b.x

        if (button_b_press != Math.round(button_b_press)) {
            continue
        }

        total_tokens += button_a_press * 3 + button_b_press
    }

    return total_tokens
}

const result = calculate_tokens(input)
console.log(result)
