import {
	convertFENToBoard,
	coordinateToSquareName,
	squareNameToCoordinates,
} from "@/lib/utils"

export default function isLegalMove(
	FEN: string,
	fromSquare: string,
	toSquare: string
): boolean {
	const [position, turn, , enPassentSquare, , ,] = FEN.split(" ")
	const board = convertFENToBoard(position)
	const [startX, startY] = squareNameToCoordinates(fromSquare)
	const [endX, endY] = squareNameToCoordinates(toSquare)

	const pieceMoved = board[startY][startX]
	const pieceOnDestination = board[endY][endX]

	// wrong person moved
	if (turn != pieceColor(pieceMoved)) {
		return false
	}

	// already a piece on destination square
	if (
		pieceOnDestination != "" &&
		pieceColor(pieceMoved) == pieceColor(pieceOnDestination)
	) {
		return false
	}

	let isLegalMove = false

	const pieceName = pieceMoved.toLowerCase()
	switch (pieceName) {
		case "p":
			isLegalMove = isLegalPawnMove({
				turn,
				fromSquare,
				toSquare,
				pieceOnDestination,
				enPassentSquare,
			})
			break
		case "r":
			isLegalMove = isLegalRookMove({
				fromSquare,
				toSquare,
				board,
			})
			break
		case "b":
			isLegalMove = isLegalBishopMove({
				fromSquare,
				toSquare,
				board,
			})
			break
		case "n":
			isLegalMove = isLegalKnightMove({
				fromSquare,
				toSquare,
			})
			break
		case "q":
			isLegalMove =
				isLegalRookMove({
					fromSquare,
					toSquare,
					board,
				}) ||
				isLegalBishopMove({
					fromSquare,
					toSquare,
					board,
				})
		default:
			isLegalMove = true
			break
	}

	return isLegalMove
}

function pieceColor(pieceName: string) {
	return pieceName.charCodeAt(0) > 96 ? "b" : "w"
}

function isLegalPawnMove({
	turn,
	fromSquare,
	toSquare,
	pieceOnDestination,
	enPassentSquare,
}: {
	turn: string
	fromSquare: string
	toSquare: string
	pieceOnDestination: string
	enPassentSquare: string
}) {
	const [startX, startY] = squareNameToCoordinates(fromSquare)
	const [endX, endY] = squareNameToCoordinates(toSquare)

	const direction = startY > endY ? 1 : -1
	const squaresTravelled = Math.abs(startY - endY)
	const captureSqaures = pawnCapturePossibleOnSquares({
		turn,
		fromSquare,
		pieceOnDestination,
	})

	if ((turn == "w" && direction == -1) || (turn == "b" && direction == 1)) {
		return false
	}

	if (startX == endX && pieceOnDestination == "") {
		if (squaresTravelled == 2) {
			if ((turn == "w" && startY != 6) || (turn == "b" && startY != 1)) {
				return false
			}
		} else if (squaresTravelled != 1) {
			return false
		}
	} else if (![...captureSqaures, enPassentSquare].includes(toSquare)) {
		return false
	}

	return true
}

function pawnCapturePossibleOnSquares({
	turn,
	fromSquare,
	pieceOnDestination,
}: {
	turn: string
	fromSquare: string
	pieceOnDestination: string
}) {
	const captureSqaures = []
	const [startX, startY] = squareNameToCoordinates(fromSquare)

	if (pieceOnDestination != "") {
		if (turn == "w") {
			captureSqaures.push(coordinateToSquareName(startX - 1, startY - 1))
			captureSqaures.push(coordinateToSquareName(startX + 1, startY - 1))
		} else {
			captureSqaures.push(coordinateToSquareName(startX - 1, startY + 1))
			captureSqaures.push(coordinateToSquareName(startX + 1, startY + 1))
		}
	}

	return captureSqaures
}

function isLegalRookMove({
	fromSquare,
	toSquare,
	board,
}: {
	fromSquare: string
	toSquare: string
	board: string[][]
}): boolean {
	const [startX, startY] = squareNameToCoordinates(fromSquare)
	const [endX, endY] = squareNameToCoordinates(toSquare)

	// Ensure move is either horizontal or vertical
	if (startX !== endX && startY !== endY) {
		return false
	}

	// Determine direction of movement and validate the path
	const deltaX = Math.sign(endX - startX) // Horizontal step (+1, 0, -1)
	const deltaY = Math.sign(endY - startY) // Vertical step (+1, 0, -1)
	let x = startX + deltaX
	let y = startY + deltaY

	while (x !== endX || y !== endY) {
		if (board[y][x] !== "") {
			return false // Path blocked
		}
		x += deltaX
		y += deltaY
	}

	return true
}

function isLegalBishopMove({
	fromSquare,
	toSquare,
	board,
}: {
	fromSquare: string
	toSquare: string
	board: string[][]
}): boolean {
	const [startX, startY] = squareNameToCoordinates(fromSquare)
	const [endX, endY] = squareNameToCoordinates(toSquare)

	// Bishop moves diagonally, so the absolute difference between x and y must match
	if (Math.abs(startX - endX) !== Math.abs(startY - endY)) {
		return false
	}

	// Determine the direction of movement
	const deltaX = Math.sign(endX - startX) // +1 for right, -1 for left
	const deltaY = Math.sign(endY - startY) // +1 for down, -1 for up

	let x = startX + deltaX
	let y = startY + deltaY

	// Check all squares along the diagonal path
	while (x !== endX && y !== endY) {
		if (board[y][x] !== "") {
			return false // Path is blocked
		}
		x += deltaX
		y += deltaY
	}

	return true
}

function isLegalKnightMove({
	fromSquare,
	toSquare,
}: {
	fromSquare: string
	toSquare: string
}): boolean {
	const [startX, startY] = squareNameToCoordinates(fromSquare)
	const [endX, endY] = squareNameToCoordinates(toSquare)

	const dx = Math.abs(startX - endX)
	const dy = Math.abs(startY - endY)

	return (dx === 2 && dy === 1) || (dx === 1 && dy === 2)
}
