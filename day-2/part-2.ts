import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8")

function check_levels(levels: number[]) {
    let direction = 0

    for (let i = 1; i < levels.length; i++) {
        const level = levels[i],
            prev_level = levels[i - 1]

        if (level == prev_level) {
            return false
        }

        let diff = level - prev_level

        if (direction && Math.sign(direction) != Math.sign(diff)) {
            return false
        }

        if (!direction) {
            direction = Math.sign(diff)
        }

        if (Math.abs(diff) < 1 ||
            Math.abs(diff) > 3) {
            return false
        }
    }

    return true
}

function check_report(report: number[]) {
    if (check_levels(report)) return true

    for (let i = 0; i < report.length; i++) {
        const modified_levels = [...report.slice(0, i), ...report.slice(i + 1)]

        if (check_levels(modified_levels)) return true
    }

    return false
}

function find_number_of_safe_reports(input: string) {
    let safe_reports_count = 0

    const reports = input.trim().split("\n")

    for (let report of reports) {
        const levels = report.split(" ").map((value) => +value).filter((value) => !Number.isNaN(value))

        let is_safe = check_report(levels)

        if (is_safe) {
            safe_reports_count++
        }
    }

    return safe_reports_count
}

const result = find_number_of_safe_reports(input)
console.log(result)
