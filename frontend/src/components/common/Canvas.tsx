import { TaskBoard } from "../tasks/TaskBoard.tsx";
import { Board } from "../../models/Board.ts";

interface CanvasProps {
  shownBoard: Board;
  handleBoardRename: (newName: string) => void;
}

export const Canvas = ({ shownBoard, handleBoardRename }: CanvasProps) => {
  return <TaskBoard board={shownBoard} handleBoardRename={handleBoardRename} />;
};
