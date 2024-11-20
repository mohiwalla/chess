import { motion } from "framer-motion"
import { useEffect, useState } from "react"

type DraggablePieceProps = {
	src: string
	squareName: string
	handleMoves: (fromSquare: string, toSquare: string) => void
}

export default function DraggablePiece({
	src,
	squareName,
	handleMoves,
}: DraggablePieceProps) {
	const [fromSquare, setFromSquare] = useState<null | string>(null)
	const [cursor, setCursor] = useState("grab")

	useEffect(() => {
		window.addEventListener("mouseup", unsetCursor)

		function unsetCursor() {
			setCursor("grab")
		}

		return () => {
			window.removeEventListener("mouseup", unsetCursor)
		}
	}, [])

	return (
		<motion.img
			drag
			onMouseDown={(e) => {
				if (e.button === 0) {
					setCursor("grabbing")
				}
			}}
			onDragStart={() => setFromSquare(squareName)}
			onDragEnd={(e: MouseEvent) => {
				const { clientX: x, clientY: y } = e
				const element = document
					.elementsFromPoint(x, y)
					.find((el) => el.id.startsWith("square"))
				const toSquare = element?.id.split("-")[1]

				if (!toSquare || !fromSquare) return

				handleMoves(fromSquare, toSquare)
			}}
			dragSnapToOrigin={true}
			whileDrag={{
				scale: 1.2,
				zIndex: 100,
				transition: {
					duration: "100ms"
				}
			}}
			dragTransition={{
				bounceStiffness: 600,
				bounceDamping: 50,
			}}
			src={src}
			alt=""
			className="sm:max-w-16 aspect-square relative z-10"
			style={{
				cursor,
			}}
		/>
	)
}
