"use client"

import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

export default function MyApp() {
	return (
		<DndProvider backend={HTML5Backend}>
			<p>test</p>
		</DndProvider>
	)
}
