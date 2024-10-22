import { useEffect, useState } from "preact/hooks";
import { BoardService } from "../../services/BoardService";
import { Board } from "../../models/Board";
import { Button } from "../common/Button";
import { Color, Icon } from "../../types/types";

export const TaskNavigation = () => {
  const [boards, setBoards] = useState<Board[]>([]);

  const service = new BoardService("http://localhost:8080/board");

  useEffect(() => {
    service.getBoards().then((data) => {
      setBoards(data);
    }); 
  }, [])

  const handleCreateBoard = () => {
    setBoards(boards => [...boards, new Board("New")])
  }


  return (
    <>
      <p class="font-bold">Boards</p>
      <div class="ml-4 w-full">
        {boards.map((board) => (
        <div className="cursor-pointer p-1 hover:bg-slate-200 flex justify-between">
          <p >{board.name}</p>
          <Button iconName={Icon.trash} size="xsmall" onClick={() => {}}/>
        </div>))}

        <Button onClick={handleCreateBoard} iconName={Icon.add} size="small"/>
      </div>
    </>
  );
};
