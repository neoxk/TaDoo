import { Button } from "../common/Button";
import { Icon } from "../../types/types";
import {Board} from "../../models/Board.ts";
import {useState, useEffect} from "preact/hooks";

interface TaskNavigationProps {
    myBoards: Board[];
    onSelectBoard: (board: Board) => void;
}

export const TaskNavigation = ({ myBoards, onSelectBoard }: TaskNavigationProps) => {

    const [boards, setBoards] = useState<Board[]>(myBoards);

    useEffect(() => {
        setBoards(myBoards);
    }, [myBoards]);

    const addBoard = () => {
        setBoards([
            ...boards,
            new Board(boards.length + 1, "New Board")
        ]);
    }

    const removeBoard = (index: number) => {
        setBoards(boards.filter((_, i) => i !== index));
    }

  return (
    <>
      <p class="font-bold">Boards</p>
      <div class="ml-4 w-full">
        {boards.map((item: Board, index: number) => (
            <div key={item.id} className="cursor-pointer p-1 hover:bg-slate-200 flex justify-between" onClick={() => onSelectBoard(item)}>
              <p>{item.name}</p>
              <Button iconName={Icon.trash} size="xsmall" onClick={(e: { stopPropagation: () => void; }) => {
                  e.stopPropagation();  // to prevent clicking on the board and opening it when deleting it (clicking on the trash icon)
                  removeBoard(index);
              }} />
            </div>
        ))}
        <Button onClick={addBoard} iconName={Icon.add} size="small"/>
      </div>
    </>
  );
};
