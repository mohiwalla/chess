import { Button } from "@/components/ui/button"

export default function Home() {
    return (
        <main className="py-6 space-y-6">
            <h1 className="text-4xl text-center font-bold">
                Play c🐴ess
            </h1>

            <div className="flex flex-col gap-2 max-w-sm mx-auto">
                <Button variant="outline" asChild><a href="/play/bots">Play bots 🤖</a></Button>
                <Button variant="outline">Pass & Play ♟️</Button>
                <Button variant="outline" disabled>Play friends 🧑 (Coming soon..)</Button>
            </div>
        </main>
    )
}
