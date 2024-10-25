import ChessBoard from "@/components/chess-board"

export default function Home() {
    return (
        <main className="py-4">
            <h1 className="text-3xl text-center font-bold">
                Play chess against computer
            </h1>

            <ChessBoard />
        </main>
    )
}
