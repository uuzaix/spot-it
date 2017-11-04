
declare type Image = number
declare type Card = Image[]
declare type Deck = Card[]
declare type CardIndex = number


function ordinaryPoints(n: number) {
    const result = []
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            result.push([i, j])
        }
    }
    return result
}

function pointsAtInfinity(n: number): any[] {
    return Array.from(Array(n).keys()).concat([1000])
}

function ordinaryLine(m: number, b: number, n: number): any[] {
    const result = []
    for (let i = 0; i < n; i++) {
        result.push([i, (m * i + b) % n])
    }
    return result.concat([m])
}

function verticalLine(x: number, n: number): any[] {
    const result = []
    for (let i = 0; i < n; i++) {
        result.push([x, i])
    }
    return result.concat([1000])
}

function lineAtInfinity(n: number) {
    return pointsAtInfinity(n)
}

function allPoints(n: number): any[] {
    return ordinaryPoints(n).concat(pointsAtInfinity(n))
}

function allLines(n: number): any[] {
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
