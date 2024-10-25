import { exec } from "child_process"
import path from "path"

const stockfishPath = path.join(process.cwd(), "stockfish.exe")

export async function POST(req: Request) {
	const data = await req.json()
	const { fen, depth } = data

	const stockfish = exec(stockfishPath)

	if (!stockfish) {
		return new Response(JSON.stringify({ error: "Stockfish not found." }), {
			status: 500,
		})
	}

	let result = ""

	stockfish.stdout?.on("data", (data) => {
		console.log(`stdout: ${data}`)
		result += data.toString()
	})

	stockfish.stdin?.write(`position ${fen ? `fen ${fen}` : "startpos"}\n`)
	stockfish.stdin?.write(`go depth ${depth || 12}\n`)
	stockfish.stdin?.end()

	const stockfishResult = await new Promise((resolve) => {
		stockfish.on("close", () => {
			// resolve(result.trim().split("\n").pop()?.split(" ").pop())
			resolve(result)
			console.log(resolve)
		})
	})

	return new Response(JSON.stringify({ bestMove: stockfishResult }))
}
