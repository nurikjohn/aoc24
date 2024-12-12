import fs from 'fs'
import path from 'path'

const input = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf8").trim()

class Graph {
    number_of_veritices: number
    adjacency_list: Map<string, { value: string, edges: [number, number][], visited: boolean }>

    constructor(number_of_veritices: number) {
        this.number_of_veritices = number_of_veritices
        this.adjacency_list = new Map()
    }

    add_vertex(vertex: [number, number], value: string) {
        const _vertex = vertex.join("_")
        this.adjacency_list.set(_vertex, {
            value,
            edges: [],
            visited: false
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

    mark_as_visited(vertex: [number, number]) {
        const _vertex = vertex.join("_")
        let found_vertex = this.adjacency_list.get(_vertex)

        if (found_vertex) {
            found_vertex.visited = true
        }
    }

    print(input: string[][]) {
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

function create_graph(lines: string[][]) {
    const graph = new Graph(lines.length * lines[0].length)

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines.length; j++) {
            const vertex = [i, j] as [number, number]

            graph.add_vertex(vertex, lines[i][j])

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

function get_area_and_perimeter(graph: Graph, vertex: [number, number]): [number, number] {
    let area = 1
    let perimeter = 0

    const _vertex = graph.get_vertex(vertex)

    if (!_vertex) return [area, perimeter]

    graph.mark_as_visited(vertex)

    perimeter = 4 - _vertex.edges.length

    for (let edge of _vertex.edges) {
        const vertex = graph.get_vertex(edge)

        if (vertex) {
            if (vertex.value == _vertex.value) {
                if (!vertex.visited) {
                    const [_area, _perimeter] = get_area_and_perimeter(graph, edge)

                    area += _area
                    perimeter += _perimeter
                }
            } else {
                perimeter++
            }
        }
    }

    return [area, perimeter]
}

function calculate_fencing_price(input: string) {
    const lines = input.split("\n").map(item => item.split(""))

    const graph = create_graph(lines)

    let sum = 0

    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[0].length; j++) {
            const vertex = [i, j] as [number, number]

            const _vertex = graph.get_vertex(vertex)

            if (_vertex) {
                if (!_vertex.visited) {
                    const [area, perimeter] = get_area_and_perimeter(graph, vertex)

                    sum += area * perimeter
                }
            }
        }
    }

    return sum
}

const result = calculate_fencing_price(input)
console.log(result)
