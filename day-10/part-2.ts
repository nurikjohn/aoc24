import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8").trim()

class Graph {
    number_of_veritices: number
    adjacency_list: Map<string, { value: number, edges: [number, number][] }>

    constructor(number_of_veritices: number) {
        this.number_of_veritices = number_of_veritices
        this.adjacency_list = new Map()
    }

    add_vertex(vertex: [number, number], value: number) {
        const _vertex = vertex.join("_")
        this.adjacency_list.set(_vertex, {
            value,
            edges: []
        })
    }

    add_edge(vertex: [number, number], edge: [number, number]) {
        const _vertex = vertex.join("_")
        let found_vertex = this.adjacency_list.get(_vertex)

        if (found_vertex) {
            found_vertex?.edges?.push(edge);
        }

    }

    get_vertex(vertex: [number, number]) {
        const _vertex = vertex.join("_")
        let edges = this.adjacency_list.get(_vertex)

        return edges
    }

    print(input: string[]) {
        var vertices = this.adjacency_list.keys();

        for (var i of vertices) {
            const [x, y] = i.split("_")
            var vertex = this.adjacency_list.get(i)
            var conc = "";

            if (!vertex?.edges) continue

            for (var j of vertex?.edges) {
                const [x, y] = j
                conc += input[+x][+y] + " ";
            }

            console.log(input[+x][+y] + " -> " + conc);
        }
    }
}

function create_graph(lines: string[]) {

    const graph = new Graph(lines.length * lines[0].length)

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines.length; j++) {
            const vertex = [i, j] as [number, number]

            graph.add_vertex(vertex, +lines[i][j])

            const left = lines[i][j - 1]
            if (left) {
                graph.add_edge(vertex, [i, j - 1])
            }

            const top = lines[i - 1]?.[j]
            if (top) {
                graph.add_edge(vertex, [i - 1, j])
            }

            const right = lines[i][j + 1]
            if (right) {
                graph.add_edge(vertex, [i, j + 1])
            }

            const bottom = lines[i + 1]?.[j]
            if (bottom) {
                graph.add_edge(vertex, [i + 1, j])
            }
        }
    }

    return graph
}

function find_neighboor(graph: Graph, vertex: [number, number]) {
    let score = 0

    const _vertex = graph.get_vertex(vertex)

    if (!_vertex) return score

    for (let edge of _vertex.edges) {
        const vertex = graph.get_vertex(edge)

        if (vertex && vertex.value - 1 == _vertex.value) {
            if (vertex.value == 9) {
                score++
            } else {
                score += find_neighboor(graph, edge)
            }

        }
    }

    return score
}

function calculate_tailhead_scores(input: string) {
    const lines = input.split("\n")
    const graph = create_graph(lines)

    let score_sum = 0

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines.length; j++) {
            if (lines[i][j] == ".") continue

            const vertex = [i, j] as [number, number]

            const _vertex = graph.get_vertex(vertex)

            if (_vertex?.value == 0) {
                const score = find_neighboor(graph, vertex)
                score_sum += score
            }
        }
    }

    return score_sum
}

const result = calculate_tailhead_scores(input)
console.log(result)
