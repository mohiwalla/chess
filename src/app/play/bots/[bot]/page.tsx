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
import { makeMove } from "@/logic/make-move"
import { startPosFEN } from "@/lib/config"
import isLegalMove from "@/logic/legal-moves"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import ChessBoard from "@/components/chess-board"
import { bot } from "@/types/bot"

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
	const bot = bots.find((bot) => bot.name === params.bot) as bot

	if (bot === undefined) {
		redirect("/play/bots")
	}

	const [gameConfig, setGameConfig] = useState({
		playAs: "white",
		timeControl: 0,
	})

	async function startGame() {
		if (gameConfig.playAs === "random") {
			setGameConfig((prev) => ({
				...prev,
				playAs: Math.random() > 0.5 ? "white" : "black",
			}))
		}

		setShowBoard(true)

		if (gameConfig.playAs === "black") {
			const bestMove = await getBestMove(FEN, bot.elo)
			if (!bestMove) return

			makeMove({
				FEN,
				setFEN,
				setHighlightedSquares,
				fromSquare: bestMove.substring(0, 2),
				toSquare: bestMove.substring(2, 4),
			})
		}
	}

	async function handleMoves(fromSquare: string, toSquare: string) {
		if (fromSquare === toSquare) return
		if (!isLegalMove(FEN, fromSquare, toSquare)) return

		let newFEN = makeMove({
			FEN,
			setFEN,
			fromSquare,
			toSquare,
			setHighlightedSquares,
		})

		const bestMove = await getBestMove(newFEN, bot.elo)
		if (!bestMove) return

		newFEN = makeMove({
			FEN: newFEN,
			setFEN,
			setHighlightedSquares,
			fromSquare: bestMove.substring(0, 2),
			toSquare: bestMove.substring(2, 4),
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

async function getBestMove(FEN: string, elo: number) {
	const req = await fetch("/api/best-move", {
		method: "post",
		body: JSON.stringify({
			FEN,
			elo,
			depth: 12,
		}),
	})

	if (!req.ok) {
		return alert("Something went wrong on server, please try again later.")
	}

	const res = await req.json()

	return res.bestMove
}
