"use client"

import { initialPosition } from "@/lib/initial-position"
import { useState } from "react"

export default function ChessBoard() {
	const [highlightedSquares, setHighlightedSquares] = useState<boolean[]>(new Array(64).fill(false))

	/**
	 * Uppercase letter represents white piece,
	 * Lowercase letter represents black piece.
	 *
	 * R/r = rook
	 * N/n = knight
	 * B/b = bishop
	 * Q/q = queen
	 * K/k = king
	 * P/p = pawn
	 */

	const imagesBasePath = "/images/pieces/lolz"

	return (
		<div className="grid grid-cols-8 grid-rows-8 w-fit mx-auto my-6 select-none">
			{initialPosition.map(({piece, color}, i) => {
				let imagePath

				switch (piece) {
					case "r":
						imagePath = "/br.png"
						break
					case "n":
						imagePath = "/bn.png"
						break
					case "b":
						imagePath = "/bb.png"
						break
					case "q":
						imagePath = "/bq.png"
						break
					case "k":
						imagePath = "/bk.png"
						break
					case "p":
						imagePath = "/bp.png"
						break
					case "R":
						imagePath = "/wr.png"
						break
					case "N":
						imagePath = "/wn.png"
						break
					case "B":
						imagePath = "/wb.png"
						break
					case "Q":
						imagePath = "/wq.png"
						break
					case "K":
						imagePath = "/wk.png"
						break
					case "P":
						imagePath = "/wp.png"
						break
					default:
						imagePath = null
				}

				return (
					<div
						key={`piece-${i}`}
						className="grid place-content-center relative"
						style={{
							backgroundColor: color == "b" ? "#6f914a" : "#ebecd0",
						}}
						onContextMenu={(e) => {
							e.preventDefault()

							const newHighlightedSquares = [...highlightedSquares]
							newHighlightedSquares[i] = !newHighlightedSquares[i]

							setHighlightedSquares(newHighlightedSquares)
						}}
					>
						{imagePath ? (
							<img
								draggable={false}
								src={imagesBasePath + imagePath}
								alt=""
								className="size-16 cursor-grab active:cursor-grabbing relative z-10"
							/>
						) : (
							<span></span>
						)}

						<span className={`absolute transition-colors duration-75 w-full h-full
							${highlightedSquares[i] ? "bg-[#f55640d0]" : ""}`}></span>
					</div>
				)
			})}
		</div>
	)
}
