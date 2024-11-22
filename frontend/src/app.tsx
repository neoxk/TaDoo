import { Sidebar } from "./components/sidebar/Sidebar.tsx";
import { useEffect, useState } from "preact/hooks";
import { Board } from "./models/Board.ts";
import { Canvas } from "./components/common/Canvas.tsx";
import { BoardService } from "./services/BoardService.ts";

export function App() {
    const [getBoards, setBoards] = useState<Board[]>([]);
    const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);

    const boardService = new BoardService();

    useEffect(() => {
        const fetchBoards = async () => {
            const boards = await boardService.getBoards();
            setBoards(boards);
            if (boards.length > 0) setSelectedBoard(boards[0]); // default prikaz : prvi board
        };
        fetchBoards();
    }, []);

    const handleBoardSelect = (board: Board) => {
        setSelectedBoard(board);
    };

  return (
    <div class="h-screen flex">

        <Sidebar boards={getBoards} onSelectBoard={handleBoardSelect} />
        {selectedBoard ? (
            <Canvas shownBoard={selectedBoard} />
        ) : (
            <p>Select a Board!</p>
            )
        }
    </div>
  );
}
