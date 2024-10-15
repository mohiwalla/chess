"use client"

import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"

export default function Draggable() {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: "unique-id",
	})
	const style = {
		transform: CSS.Translate.toString(transform),
	}

	return (
		<button
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
		>test</button>
	)
}
