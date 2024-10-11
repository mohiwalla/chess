export default function ChessBoard() {
    /**
     * Uppercase letter represents white piece,
     * Lowercase letter represents black piece.
     * 
     * R/r = rook
     * N/n = knight
     * B/b = bishop
     * Q/q = queen
     * K/k = king
     * P/p = pawn
     */

    const imagesBasePath = "/images/pieces/default"
    const initialPosition = [
        "r", "n", "b", "q", "k", "b", "n", "r",
        "p", "p", "p", "p", "p", "p", "p", "p",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "P", "P", "P", "P", "P", "P", "P", "P",
        "R", "N", "B", "Q", "K", "B", "N", "R",
    ]
    const squareColors = [
        "b", "w", "b", "w", "b", "w", "b", "w",
        "w", "b", "w", "b", "w", "b", "w", "b",
        "b", "w", "b", "w", "b", "w", "b", "w",
        "w", "b", "w", "b", "w", "b", "w", "b",
        "b", "w", "b", "w", "b", "w", "b", "w",
        "w", "b", "w", "b", "w", "b", "w", "b",
        "b", "w", "b", "w", "b", "w", "b", "w",
        "w", "b", "w", "b", "w", "b", "w", "b",
    ]

    return <div className="grid grid-cols-8 grid-rows-8 w-fit mx-auto my-10">
        {
            initialPosition.map((piece, i) => {
                let imagePath

                switch (piece) {
                    case "r":
                        imagePath = "/black/rook.png"
                        break;
                    case "n":
                        imagePath = "/black/knight.png"
                        break;
                    case "b":
                        imagePath = "/black/bishop.png"
                        break;
                    case "q":
                        imagePath = "/black/queen.png"
                        break;
                    case "k":
                        imagePath = "/black/king.png"
                        break;
                    case "p":
                        imagePath = "/black/pawn.png"
                        break;
                    case "R":
                        imagePath = "/white/rook.png"
                        break;
                    case "N":
                        imagePath = "/white/knight.png"
                        break;
                    case "B":
                        imagePath = "/white/bishop.png"
                        break;
                    case "Q":
                        imagePath = "/white/queen.png"
                        break;
                    case "K":
                        imagePath = "/white/king.png"
                        break;
                    case "P":
                        imagePath = "/white/pawn.png"
                        break;
                    default:
                        imagePath = null
                }

                return <div className="size-14 grid place-content-center" style={{backgroundColor: squareColors[i] == "b" ? "#6f914a" : "#ebecd0"}}>
                    {imagePath ? <img src={imagesBasePath + imagePath} alt="" className="size-11 cursor-grab active:cursor-grabbing" /> : <span>&nbsp;</span>}
                </div>
            })
        }
    </div>
}