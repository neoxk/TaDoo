import { Button } from "../common/Button";
import { Icon } from "../../types/types";
import { Board } from "../../models/Board.ts";
import { useState, useEffect } from "preact/hooks";
import { BoardService } from "../../services/BoardService.ts";

interface TaskNavigationProps {
  myBoards: Board[];
  onSelectBoard: (board: Board) => void;
}

export const TaskNavigation = ({
  myBoards,
  onSelectBoard,
}: TaskNavigationProps) => {
  const [boards, setBoards] = useState<Board[]>(myBoards);

  const boardService = new BoardService();

  useEffect(() => {
    setBoards(myBoards);
  }, [myBoards]);

  const addBoard = () => {
    boardService.createBoard().then((board) => {
      setBoards([...boards, board]);
    });
  };

  const removeBoard = (id: number) => {
    boardService.deleteBoard(id).then(() => {
      setBoards(boards.filter((board, i) => board.board_id !== id));
    });
  };

  return (
    <>
      <p class="font-bold">Boards</p>
      <div class="ml-4 w-full">
        {boards.map((item: Board, index: number) => (
          <div
            key={item.board_id}
            className="cursor-pointer p-1 hover:bg-slate-200 flex justify-between"
            onClick={() => onSelectBoard(item)}
          >
            <p>{item.name}</p>
            <Button
              iconName={Icon.trash}
              size="xsmall"
              onClick={(e: { stopPropagation: () => void }) => {
                console.log(item);
                e.stopPropagation(); // to prevent clicking on the board and opening it when deleting it (clicking on the trash icon)
                removeBoard(item.board_id);
              }}
            />
          </div>
        ))}
        <Button onClick={addBoard} iconName={Icon.add} size="small" />
      </div>
    </>
  );
};
