"use client"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { bots } from "@/lib/bots"
import { upperCaseWords } from "@/lib/utils"
import { redirect } from "next/navigation"
import { useState } from "react"
import { makeMove } from "@/lib/make-move"
import { startPosFEN } from "@/lib/config"
import isLegalMove from "@/lib/legal-moves"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import ChessBoard from "@/components/chess-board"

export default function PlayBot({
	params,
}: {
	params: {
		bot: string
	}
}) {
	const [showBoard, setShowBoard] = useState(false)
	const [FEN, setFEN] = useState(startPosFEN)
	const [highlightedSquares, setHighlightedSquares] = useState<
		(string | boolean)[]
	>(new Array(64).fill(false))
	const bot = bots.find((bot) => bot.name === params.bot)

	if (!bot) {
		redirect("/play/bots")
	}

	const [gameConfig, setGameConfig] = useState({
		playAs: "white",
		timeControl: 0,
	})

	function startGame() {
		if (gameConfig.playAs === "random") {
			setGameConfig((prev) => ({
				...prev,
				playAs: Math.random() > 0.5 ? "white" : "black",
			}))
		}

		setShowBoard(true)
	}

	async function handleMoves(fromSquare: string, toSquare: string) {
		if (fromSquare === toSquare) return
		if (!isLegalMove(FEN, fromSquare, toSquare)) return

		let newFEN = makeMove({
			fromSquare,
			toSquare,
			FEN,
			setFEN,
			setHighlightedSquares,
		})

		const req = await fetch("/api/best-move", {
			method: "post",
			body: JSON.stringify({
				FEN: newFEN,
				elo: bot?.elo,
				depth: 12
			}),
		})

		if (!req.ok) {
			return alert("Something went wrong on server, please try again later.")
		}

		const res = await req.json()
		const computerMove = res.bestMove as string

		newFEN = makeMove({
			fromSquare: computerMove.substring(0, 2),
			toSquare: computerMove.substring(2, 4),
			FEN: newFEN,
			setFEN,
			setHighlightedSquares,
		})
	}

	return showBoard ? (
		<ChessBoard
			FEN={FEN}
			handleMoves={handleMoves}
			highlightedSquares={highlightedSquares}
			flipped={gameConfig.playAs === "black"}
			setHighlightedSquares={setHighlightedSquares}
		/>
	) : (
		<div className="mx-auto max-w-sm p-4 space-y-5">
			<div className="flex justify-between items-center">
				<h3 className="text-xl text-center font-bold">
					Play against {upperCaseWords(bot.name)}
				</h3>

				<img
					src={`/images/bots/${bot.imagePath}.png`}
					alt=""
					className="w-20"
					// drop-shadow-[3px_0_2px_#ffffff60]
				/>
			</div>

			<div className="flex justify-between items-center">
				<Label htmlFor="piece-color">I'll play as</Label>

				<Select
					defaultValue="white"
					onValueChange={(value) => {
						setGameConfig((prev) => ({ ...prev, playAs: value }))
					}}
				>
					<SelectTrigger className="w-[180px]" id="piece-color">
						<SelectValue placeholder="Select pieces" />
					</SelectTrigger>

					<SelectContent defaultValue="white">
						<SelectItem value="white">
							<div className="flex items-center gap-2.5">
								<span className="inline-block size-5 rounded bg-white border border-zinc-600"></span>
								<p>White</p>
							</div>
						</SelectItem>

						<SelectItem value="black">
							<div className="flex items-center gap-2.5">
								<span className="inline-block size-5 rounded bg-black border"></span>
								<p>Black</p>
							</div>
						</SelectItem>

						<SelectItem value="random">
							<div className="flex items-center gap-2.5">
								<div className="flex">
									<span className="inline-block w-2.5 h-5 rounded rounded-r-none bg-white border border-zinc-600"></span>
									<span className="inline-block w-2.5 h-5 rounded rounded-l-none bg-black border"></span>
								</div>

								<p>Random</p>
							</div>
						</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="flex justify-between">
				<Label htmlFor="time-control">Time control</Label>
				<Switch id="time-control" />
			</div>

			<Button className="w-full" onClick={startGame}>
				Play
			</Button>
		</div>
	)
}
