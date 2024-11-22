import { TaskBoard } from "../tasks/TaskBoard.tsx";
import { Board } from "../../models/Board.ts";

interface CanvasProps {
    shownBoard: Board;
}

export const Canvas = ({ shownBoard }: CanvasProps) => {

    return (
        <TaskBoard board={shownBoard} />
    );
}