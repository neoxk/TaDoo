import { useContext } from "preact/hooks";
import { BoardStateContext } from "./BoardStateProvider";

export const useBoards = () => {
  const [state, dispatch] = useContext(BoardStateContext);
  return [state, dispatch];
}




