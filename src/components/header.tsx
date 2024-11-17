import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Logo from "./logo"

export default function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-zinc-900 backdrop-blur">
			<nav>
				<div className="container flex flex-wrap items-center justify-between py-4">
					<Link href="/" className="flex items-center">
						<Logo />
					</Link>

					<div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
						<ul className="flex flex-row gap-2">
							<li className="flex gap-3">
								<Button variant="secondary">Buy me 🍺</Button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	)
}