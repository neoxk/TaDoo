import { Button } from "../common/Button";
import { Icon } from "../../types/types";
import { useBoards,  } from "../../state/boards/useBoards";
import {  BoardService } from "../../services/BoardService";
import { boardActionType } from "../../state/boards/boardReducer";
import { useEffect } from "preact/hooks";

export const TaskNavigation = () => {
  const [boards, dispatch] = useBoards();
  

  useEffect(() => {
    const boardService = new BoardService();

    boardService.getBoards().then((boards) => {
        dispatch({type: boardActionType.SET_BOARDS , payload: {boards: boards}})
  })
  
}, [])

  return (
    <>
      <p class="font-bold">Boards</p>
      <div class="ml-4 w-full">
        {console.log(boards)}
        
        {boards.map((item) => (
        <div className="cursor-pointer p-1 hover:bg-slate-200 flex justify-between">
          <p >{item.name}</p>
          <Button iconName={Icon.trash} size="xsmall" onClick={() => {}}/>
        </div>))}

        <Button onClick={() => {}} iconName={Icon.add} size="small"/>
      </div>
    </>
  );
};
