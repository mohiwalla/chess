"use client"

import { useEffect } from "react"

export default function ClientConfig() {
	useEffect(() => {
		function preventTextDrag() {
			window?.getSelection()?.empty()
			window?.getSelection()?.removeAllRanges()
		}

		function preventDrags(e: DragEvent) {
			e.preventDefault()
			e.stopPropagation()
		}

		window.addEventListener("mousedown", preventTextDrag, { passive: true })
		window.addEventListener("dragstart", preventDrags)

		return () => {
			window.removeEventListener("mousedown", preventTextDrag)
			window.removeEventListener("dragstart", preventDrags)
		}
	}, [])

	return null
}
