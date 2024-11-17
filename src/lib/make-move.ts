import {
	convertBoardToFEN,
	convertFENToBoard,
	getEnPassentSquare,
	pieceOnSquare,
	squareNameToCoordinates,
} from "./utils"

type MakeMoveProps = {
	fromSquare: string
	toSquare: string
	FEN: string
	setFEN: (fen: string) => void
	setHighlightedSquares: (highlightedSquares: (string | boolean)[]) => void
}

export function makeMove({
	fromSquare,
	toSquare,
	FEN,
	setFEN,
	setHighlightedSquares,
}: MakeMoveProps) {
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

	const startIndex = startY + startX * 8
	const endIndex = endY + endX * 8

	const piece = pieceOnSquare(board, fromSquare)
	const isEnPassentMove =
		piece.toLowerCase() == "p" && toSquare == enPassentSquare

	board[startY][startX] = ""
	board[endY][endX] = piece

	if (isEnPassentMove) {
		board[endY + (turn == "w" ? 1 : -1)][endX] = ""
	}

	let newCastlingRights = castlingRights

	if (
		turn == "w" &&
		piece == "K" &&
		newCastlingRights.includes("K") &&
		fromSquare + toSquare == "e1g1" &&
		FEN.split(" ")[0].split("/").pop()?.endsWith("K2R")
	) {
		const h1Coords = squareNameToCoordinates("h1")
		const f1Coords = squareNameToCoordinates("f1")

		board[h1Coords[1]][h1Coords[0]] = ""
		board[f1Coords[1]][f1Coords[0]] = "R"
	} else if (
		turn == "w" &&
		piece == "K" &&
		newCastlingRights.includes("Q") &&
		fromSquare + toSquare == "e1c1" &&
		FEN.split(" ")[0].split("/").pop()?.startsWith("R3K")
	) {
		const a1Coords = squareNameToCoordinates("a1")
		const d1Coords = squareNameToCoordinates("d1")

		board[a1Coords[1]][a1Coords[0]] = ""
		board[d1Coords[1]][d1Coords[0]] = "R"
	} else if (
		turn == "b" &&
		piece == "k" &&
		newCastlingRights.includes("k") &&
		fromSquare + toSquare == "e8g8" &&
		FEN.split(" ")[0].split("/")[0].endsWith("k2r")
	) {
		const h8Coords = squareNameToCoordinates("h8")
		const f8Coords = squareNameToCoordinates("f8")

		board[h8Coords[1]][h8Coords[0]] = ""
		board[f8Coords[1]][f8Coords[0]] = "r"
	} else if (
		turn == "b" &&
		piece == "k" &&
		newCastlingRights.includes("k") &&
		fromSquare + toSquare == "e8c8" &&
		FEN.split(" ")[0].split("/")[0].startsWith("r3k")
	) {
		const a8Coords = squareNameToCoordinates("a8")
		const d8Coords = squareNameToCoordinates("d8")

		board[a8Coords[1]][a8Coords[0]] = ""
		board[d8Coords[1]][d8Coords[0]] = "r"
	}

	const isCapture = pieceOnSquare(board, toSquare) != "" || isEnPassentMove
	const newPosition = convertBoardToFEN(board)

	const nextTurn = turn == "w" ? "b" : "w"
	const newEnPassentSquare = getEnPassentSquare({
		fromSquare,
		toSquare,
	})

	if (fromSquare == "h1" && piece == "R") {
		newCastlingRights = castlingRights.replace("K", "")
	} else if (fromSquare == "a1" && piece == "R") {
		newCastlingRights = castlingRights.replace("Q", "")
	} else if (fromSquare == "h8" && piece == "r") {
		newCastlingRights = castlingRights.replace("k", "")
	} else if (fromSquare == "a8" && piece == "r") {
		newCastlingRights = castlingRights.replace("q", "")
	} else if (piece == "K") {
		newCastlingRights = castlingRights.replace(/[KQ]/g, "")
	} else if (piece == "k") {
		newCastlingRights = castlingRights.replace(/[kq]/g, "")
	}

	if (newCastlingRights == "") {
		newCastlingRights = "-"
	}

	const newHalfMoveClock =
		isCapture || piece.toLowerCase() == "p" ? 0 : +halfMoveClock + 1
	const newFullMoveNumber =
		nextTurn == "w" ? +fullMoveNumber + 1 : fullMoveNumber

	const newFEN = `${newPosition} ${nextTurn} ${newCastlingRights} ${newEnPassentSquare} ${newHalfMoveClock} ${newFullMoveNumber}`
	const highlightedSquares = new Array(64).fill(false)

	highlightedSquares[startIndex] = "#f0d137cc"
	highlightedSquares[endIndex] = "#f0d137cc"

	setFEN(newFEN)
	setHighlightedSquares(highlightedSquares)

	return newFEN
}
