import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function upperCaseWords(words: string) {
	return words
		.split(" ")
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join(" ")
}

export function coordinateToSquareName(x: number, y: number) {
	return String.fromCharCode(97 + x) + (8 - y)
}

export function squareNameToCoordinates(square: string): [number, number] {
	const file = square.charCodeAt(0) - 97
	const rank = 8 - parseInt(square[1])
	return [file, rank]
}

export function coordinatesToIndex(x: number, y: number): number {
	return x * 8 + y
}

export function validationFEN(fen: string) {
	const fenRegExp = /^(?:(?:[PNBRQK]+|[1-8])\/){7}(?:[PNBRQK]+|[1-8])$/gim
	return fenRegExp.test(fen)
}

export function convertFENToBoard(fen: string): string[][] {
	const ranks = fen.split(" ")[0].split("/")

	return ranks.map((rank) => {
		const expandedRank: string[] = []

		for (const char of rank) {
			if (isNaN(parseInt(char))) {
				expandedRank.push(char)
			} else {
				expandedRank.push(...new Array(parseInt(char)).fill(""))
			}
		}

		return expandedRank
	})
}

export function convertBoardToFEN(board: string[][]): string {
	return board
		.map((rank) => {
			let emptyCount = 0

			return (
				rank.reduce((fen, square) => {
					if (square === "") {
						emptyCount++
					} else {
						if (emptyCount > 0) {
							fen += emptyCount
							emptyCount = 0
						}

						fen += square
					}

					return fen
				}, "") + (emptyCount > 0 ? emptyCount : "")
			)
		})
		.join("/")
}

export function getEnPassentSquare({
	fromSquare,
	toSquare,
}: {
	fromSquare: string
	toSquare: string
}) {
	const [, fromY] = squareNameToCoordinates(fromSquare)
	const [toX, toY] = squareNameToCoordinates(toSquare)

	if (Math.abs(fromY - toY) === 2) {
		return coordinateToSquareName(toX, (fromY + toY) / 2)
	}

	return "-"
}

export function pieceOnSquare(board: string[][], squareName: string) {
	const [x, y] = squareNameToCoordinates(squareName)
	return board[y][x]
}
