"use client"

type Setting = {
	FEN: string
	setFEN: (fen: string) => void
	depth: number
	setDepth: (depth: number) => void
}

import { createContext, useState } from "react"

type SettingsContextProps = {
	settings: Setting[]
	setSettings: React.Dispatch<React.SetStateAction<Setting[]>>
}

export const SettingsContext = createContext<SettingsContextProps | null>(null)

export default function SettingsProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [settings, setSettings] = useState<Setting[]>([])

	return (
		<SettingsContext.Provider
			value={{
				settings,
				setSettings,
			}}
		>
			{children}
		</SettingsContext.Provider>
	)
}
