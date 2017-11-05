// declare type Image = number
// declare type Card = Image[]
// declare type Deck = Card[]
// declare type CardIndex = number

type Point = number | number[]

function ordinaryPoints(n: number): number[] {
    const result = []
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            result.push([i, j])
        }
    }
    return result
}

function pointsAtInfinity(n: number): number[] {
    return Array.from(Array(n).keys()).concat([1000])
}

function ordinaryLine(m: number, b: number, n: number): Point[] {
    const result = []
    for (let i = 0; i < n; i++) {
        result.push([i, (m * i + b) % n])
    }
    return result.concat([m])
}

function verticalLine(x: number, n: number): Point[] {
    const result = []
    for (let i = 0; i < n; i++) {
        result.push([x, i])
    }
    return result.concat([1000])
}

function lineAtInfinity(n: number) {
    return pointsAtInfinity(n)
}

function allPoints(n: number): Point[] {
    return ordinaryPoints(n).concat(pointsAtInfinity(n))
}

function allLines(n: number): Point[][] {
    const infLines = lineAtInfinity(n)
    const vertLines = []
    for (let i = 0; i < n; i++) {
        vertLines.push(verticalLine(i, n))
    }
    const ordLines = []
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            ordLines.push(ordinaryLine(i, j, n))
        }
    }
    return ordLines.concat(vertLines, [infLines])
}

function generatePics(n: number): number[]{
    return Array.from(Array(n).keys())
}

function mapPointsToPics(points: Point[], pics: number[]): {[s: string]: number} {
    let mappings = {}
    points.forEach((point, i) => {
        mappings[point+ ''] = pics[i]
    })
    return mappings
}

export function createDeck(n: number): number[][] {
    const points = allPoints(n)
    const lines = allLines(n)
    const pics = generatePics(points.length)
    const mappings = mapPointsToPics(points, pics)
    return lines
        .map(line => line
            .map(point => mappings[point+ '']
        )
    )
}
