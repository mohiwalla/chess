import { DroppableSquare } from "./droppable-square"
import { AnimatePresence } from "framer-motion"

type ChessBoardProps = {
	FEN: string
	flipped?: boolean
	handleMoves: (fromSquare: string, toSquare: string) => void
	highlightedSquares: (string | boolean)[]
	setHighlightedSquares: (highlightedSquares: (string | boolean)[]) => void
}

const imagesBasePath = "/images/pieces/default"
// const imagesBasePath = "/images/pieces/lolz"

export default function ChessBoard({
	FEN,
	handleMoves,
	flipped = false,
	highlightedSquares,
	setHighlightedSquares,
}: ChessBoardProps) {
	let ranks

	if (flipped) {
		ranks = FEN.split(" ")[0].split("/").reverse()
	} else {
		ranks = FEN.split(" ")[0].split("/")
	}

	console.log(ranks)

	return (
		<div className="grid grid-cols-8 grid-rows-8 w-fit mx-auto my-6 select-none">
			{ranks.map((rank, y) => {
				const pieces = rank.split("")
				let x = -1

				return pieces.map((piece) => {
					let imagePath
					switch (piece) {
						case "r":
							imagePath = "br.png"
							break
						case "n":
							imagePath = "bn.png"
							break
						case "b":
							imagePath = "bb.png"
							break
						case "q":
							imagePath = "bq.png"
							break
						case "k":
							imagePath = "bk.png"
							break
						case "p":
							imagePath = "bp.png"
							break
						case "R":
							imagePath = "wr.png"
							break
						case "N":
							imagePath = "wn.png"
							break
						case "B":
							imagePath = "wb.png"
							break
						case "Q":
							imagePath = "wq.png"
							break
						case "K":
							imagePath = "wk.png"
							break
						case "P":
							imagePath = "wp.png"
							break
						default:
							return new Array(+piece).fill(null).map(() => {
								++x

								return (
									<DroppableSquare
										key={`square-${x * 8 + y}`}
										x={x}
										y={y}
										flipped={flipped}
										handleMoves={handleMoves}
										imagePath={null}
										highlightedSquares={highlightedSquares}
										setHighlightedSquares={setHighlightedSquares}
									/>
								)
							})
					}

					++x
					return (
						<DroppableSquare
							x={x}
							y={y}
							flipped={flipped}
							handleMoves={handleMoves}
							key={`square-${x * 8 + y}`}
							imagePath={`${imagesBasePath}/${imagePath}`}
							highlightedSquares={highlightedSquares}
							setHighlightedSquares={setHighlightedSquares}
						/>
					)
				})
			})}
		</div>
	)
}
