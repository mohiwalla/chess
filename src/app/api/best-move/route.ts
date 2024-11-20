import { spawn } from "child_process"
import path from "path"

const chessEnginesBasePath = path.join(
	__dirname,
	"..",
	"..",
	"..",
	"..",
	"..",
	"chess-engines"
)
const stockfishPath = path.join(chessEnginesBasePath, "stockfish.exe")
const dragonPath = path.join(chessEnginesBasePath, "dragon.exe")

export async function POST(req: Request) {
	const data = await req.json()
	const { FEN, depth = 12, elo } = data
	let bestMove

	if (elo >= 1300) {
		bestMove = await stockfish({ FEN, depth, elo })
	} else {
		bestMove = await dragon({ FEN, depth, elo })
	}

	return new Response(
		JSON.stringify({
			bestMove,
		})
	)
}

async function stockfish({
	FEN,
	depth,
	elo,
}: {
	FEN: string
	depth: number
	elo: number
}) {
	const engine = spawn(stockfishPath)
	elo = Math.max(1320, elo)

	let returnResponse = ""
	engine.stdin?.write(`setoption name UCI_LimitStrength value true\n`)
	engine.stdin?.write(`setoption name UCI_Elo value ${elo}\n`)
	engine.stdin?.write(`position fen ${FEN}\n`)
	engine.stdin?.write(`go depth ${depth}\n`)

	return new Promise((resolve) => {
		engine.stdout?.on("data", function (data) {
			returnResponse += data

			if (returnResponse.includes("bestmove")) {
				const allLines = returnResponse.replace(/\r/g, "").split("\n")
				const lastLine = allLines.find((line) => line.startsWith("bestmove"))
				const bestMove = lastLine?.match(/bestmove\s(\w+)/)?.[1]

				engine.stdout?.removeAllListeners("data")
				engine.stdin?.end()
				engine.stdout?.destroy()
				engine.kill()

				resolve(bestMove)
			}
		})
	})
}

async function dragon({
	FEN,
	depth,
	elo,
}: {
	FEN: string
	depth: number
	elo: number
}) {
	const engine = spawn(dragonPath)
	const skillLevel = Math.floor(elo / 100) + 2

	let returnResponse = ""
	engine.stdin?.write(`setoption name Skill value ${skillLevel}\n`)
	engine.stdin?.write(`position fen ${FEN}\n`)
	engine.stdin?.write(`go depth ${depth}\n`)

	return new Promise((resolve) => {
		engine.stdout?.on("data", function (data) {
			returnResponse += data

			if (returnResponse.includes("bestmove")) {
				setTimeout(() => {
					const allLines = returnResponse.replace(/\r/g, "").split("\n")
					const lastLine = allLines.find((line) => line.startsWith("bestmove"))
					const bestMove = lastLine?.match(/bestmove\s(\w+)/)?.[1]

					engine.stdout?.removeAllListeners("data")
					engine.stdin?.end()
					engine.stdout?.destroy()
					engine.kill()

					resolve(bestMove)
				}, 100)
			}
		})
	})
}
