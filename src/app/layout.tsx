import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/header"
import ClientConfig from "@/components/client-config"

export const metadata: Metadata = {
	title: "Chess - mohiwalla",
	description: "Play chess online",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" className="dark">
			<body>
				<ClientConfig />
				<Header />
				{children}
			</body>
		</html>
	)
}
