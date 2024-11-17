import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { bots } from "@/lib/bots"
import { upperCaseWords } from "@/lib/utils"
import Link from "next/link"

export default function PlayBots() {
	return (
		<main className="py-6 space-y-6">
			<div className="flex flex-col items-center gap-10">
				<section className="flex flex-col gap-4">
					<h4 className="font-bold text-lg text-center">Beginner</h4>

					<div className="flex gap-8">
						{bots
							.filter((bot) => bot.level === "beginner")
							.map((bot) => {
								return (
									<BotProfile key={bot.name} name={bot.name} elo={bot.elo} imagePath={bot.imagePath} />
								)
							})}
					</div>
				</section>

				<section className="flex flex-col gap-4">
					<h4 className="font-bold text-lg text-center">Intermediate</h4>

					<div className="flex gap-8">
						{bots
							.filter((bot) => bot.level === "intermediate")
							.map((bot) => {
								return (
									<BotProfile key={bot.name} name={bot.name} elo={bot.elo} imagePath={bot.imagePath} />
								)
							})}
					</div>
				</section>

				<section className="flex flex-col gap-4">
					<h4 className="font-bold text-lg text-center">Advanced</h4>

					<div className="flex gap-8">
						{bots
							.filter((bot) => bot.level === "advanced")
							.map((bot) => {
								return (
									<BotProfile key={bot.name} name={bot.name} elo={bot.elo} imagePath={bot.imagePath} />
								)
							})}
					</div>
				</section>

				<section className="flex flex-col gap-4">
					<h4 className="font-bold text-lg text-center">Master</h4>

					<div className="flex gap-8">
						{bots
							.filter((bot) => bot.level === "master")
							.map((bot) => {
								return (
									<BotProfile key={bot.name} name={bot.name} elo={bot.elo} imagePath={bot.imagePath} />
								)
							})}
					</div>
				</section>

				<section className="flex flex-col gap-4">
					<h4 className="font-bold text-lg text-center">Super GM</h4>

					<div className="flex gap-8">
						{bots
							.filter((bot) => bot.level === "super-gm")
							.map((bot) => {
								return (
									<BotProfile key={bot.name} name={bot.name} elo={bot.elo} imagePath={bot.imagePath} />
								)
							})}
					</div>
				</section>

				<section className="flex flex-col gap-4">
					<h4 className="font-bold text-lg text-center">Engine</h4>

					<div className="flex gap-8">
						{bots
							.filter((bot) => bot.level === "engine")
							.map((bot) => {
								return (
									<BotProfile key={bot.name} name={bot.name} elo={bot.elo} imagePath={bot.imagePath} />
								)
							})}
					</div>
				</section>
			</div>
		</main>
	)
}

function BotProfile({
	name,
	elo,
	imagePath = null,
}: {
	name: string
	elo: number
	imagePath?: string | null
}) {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger>
					<Link href={`/play/bots/${name}`}>
						<div className="flex flex-col gap-2 justify-center text-center transition-colors duration-150 hover:bg-accent rounded-lg py-1.5 px-2">
							<img
								alt=""
								src={`/images/bots/${imagePath || name}.png`}
								className="w-16"
							/>

							<p className="text-sm">{upperCaseWords(name)}</p>
						</div>
					</Link>
				</TooltipTrigger>

				<TooltipContent>
					<p>Rating {elo}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
