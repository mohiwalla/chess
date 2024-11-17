import { coordinateToSquareName, coordinatesToIndex } from "@/lib/utils"
import DraggablePiece from "./draggable-piece"

type SquareProps = {
	x: number
	y: number
	flipped: boolean
	imagePath: string | null
	highlightedSquares: (string | boolean)[]
	setHighlightedSquares: (highlightedSquares: (string | boolean)[]) => void
	handleMoves: (fromSquare: string, toSquare: string) => void
}

export function DroppableSquare({
	x,
	y,
	flipped,
	imagePath,
	handleMoves,
	highlightedSquares,
	setHighlightedSquares,
}: SquareProps) {
	const index = coordinatesToIndex(x, y)
	const squareName = coordinateToSquareName(x, y)

	return (
		<div
			className="grid place-content-center relative"
			id={"square-" + squareName}
			style={{
				backgroundColor: (x + y) % 2 ? "#6f914a" : "#ebecd0",
				// outline: isOver ? "3px solid #a9a9a9" : "",
				outlineOffset: "-3px",
			}}
			onContextMenu={(e) => {
				e.preventDefault()

				const newHighlightedSquares = [...highlightedSquares]
				newHighlightedSquares[index] = newHighlightedSquares[index] ? false : "#f04337cc"

				setHighlightedSquares(newHighlightedSquares)
			}}
		>
			{imagePath && (
				<DraggablePiece squareName={squareName} src={imagePath} handleMoves={handleMoves} flipped={flipped} />
			)}

			<span
				className="absolute w-full h-full"
				style={{
					backgroundColor: String(highlightedSquares[index] || "transparent"),
				}}
			></span>
		</div>
	)
}
