"use client"

import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export default function Page() {
	const [visible, setVisible] = useState(true)

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					className="size-10 bg-blue-600 rounded-lg"
					key="modal"
					initial={{ translate: '100px' }}
					animate={{ translate: '0px' }}
					exit={{ translate: '100px' }}
				/>
			)}

			<Button onClick={() => setVisible(!visible)}>show/hide</Button>
		</AnimatePresence>
	)
}
