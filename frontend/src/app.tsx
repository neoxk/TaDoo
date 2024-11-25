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
      let boards = await boardService.getBoards();
      boards = boards.map((board) => Board.fromJson(board));
      setBoards(boards);
      if (boards.length > 0) setSelectedBoard(boards[0]); // default prikaz : prvi board
    };
    fetchBoards();
  }, []);

  const handleBoardSelect = (board: Board) => {
    setSelectedBoard(board);
  };

  const handleBoardRename = (newName: string) => {
    if (selectedBoard) {
      boardService
        .updateBoard({
          ...selectedBoard,
          name: newName,
        })
        .then((board) => {
          setBoards((prevBoards) =>
            prevBoards.map((prevBoard) =>
              prevBoard.board_id === board.board_id ? board : prevBoard
            )
          );
        });
    }
  };

  return (
    <div class="h-screen flex">
      <Sidebar boards={getBoards} onSelectBoard={handleBoardSelect} />
      {selectedBoard ? (
        <Canvas
          shownBoard={selectedBoard}
          handleBoardRename={(newName) => handleBoardRename(newName)}
        />
      ) : (
        <p>Select a Board!</p>
      )}
    </div>
  );
}
