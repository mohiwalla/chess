import { Permanent_Marker } from "next/font/google"
import { cn } from "@/lib/utils"
import { name } from "@/lib/config"

const logoFont = Permanent_Marker({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
})

export default function Logo({
	className = "text-2xl",
}: {
	className?: string
}) {
	return (
		<span
			className={cn(
				logoFont.className,
				"select-none",
				"text-primary",
				className
			)}
		>
			{name}
		</span>
	)
}
