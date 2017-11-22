import {zipObj, range, chain, map} from 'ramda'
import {shuffle} from 'lodash'

class Point {
  id: number | number[]
}

export class Image {
  id: number
}

// export class Card {
//   images: Image[]
// }

export type Card = Image[]

export type Deck = Card[]

function ordinaryPoints(n: number): Point[] {
  const createPair = i => map(j => [i, j], range(0, n))
  return chain(createPair, range(0, n))
}

function pointsAtInfinity(n: number): Point[] {
  return range(0, n).concat([1000])
}

function ordinaryLine(m: number, b: number, n: number): Point[] {
  return map(i => [i, (m * i + b) % n], range(0, n)).concat([m])
}

function verticalLine(x: number, n: number): Point[] {
  return map(i => [x, i], range(0, n)).concat([1000])
}

function lineAtInfinity(n: number): Point[] {
  return pointsAtInfinity(n)
}

function allPoints(n: number): Point[] {
  return ordinaryPoints(n).concat(pointsAtInfinity(n))
}

function pointToString(point: Point): string {
  return point + ''
}

function allLines(n: number): Point[][] {
  const infLines = lineAtInfinity(n)
  const vertLines = map(i => verticalLine(i, n), range(0, n))
  const ordLines = chain(i => map(j => ordinaryLine(i, j, n), range(0, n)), range(0, n))
  return ordLines.concat(vertLines, [infLines])
}

function generatePics(n: number): Image[] {
  return range(0, n)
}

function mapPointsToPics(points: Point[], pics: Image[]): { [s: string]: Image } {
  const pointsAsString = map(pointToString, points)
  return zipObj(pointsAsString, pics)
}

export function createDeck(n: number): Deck {
  const points = allPoints(n)
  const lines = allLines(n)
  const pics = generatePics(points.length)
  const mappings = mapPointsToPics(points, pics)
  return map(line => map(point => mappings[pointToString(point)], line), lines)
}

export function shuffleCards(deck : Deck): Deck {
  return shuffle(deck.map(shuffle))
}
