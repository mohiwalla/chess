type coordinate = {
	x: number
	y: number
}

type GetMovesProps = {
	piece: string
	currentPosition: coordinate
}

export default function getMoves({ piece, currentPosition }: GetMovesProps) {
	let moves: coordinate[] = []

	switch (piece) {
		case "r":
            moves = getRookMoves(currentPosition)
			break
		case "R":
            moves = getRookMoves(currentPosition)
			break
		case "n":
			break
		case "b":
			break
		case "q":
			break
		case "k":
			break
		case "p":
			break
		case "N":
			break
		case "B":
			break
		case "Q":
			break
		case "K":
			break
		case "P":
			break
	}

	return moves
}

function getRookMoves({ x, y }: { x: number; y: number }) {
	const moves = []

	for (let i = 1; i < 8; i++) {
		if (i === x) continue
		moves.push({
			x: i,
			y: y,
		})
	}

	for (let i = 1; i < 8; i++) {
		if (i === y) continue
		moves.push({
			x: x,
			y: i,
		})
	}

    return moves
}
