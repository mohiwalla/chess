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
	const [
		position,
		turn,
		castlingRights,
		enPassentSquare,
		halfMoveClock,
		fullMoveNumber,
	] = FEN.split(" ")
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
