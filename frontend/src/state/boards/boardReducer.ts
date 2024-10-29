import { BoardState } from "./BoardState";

interface boardAction {
  type: boardActionType,
  payload: any
}

export enum boardActionType {
  SET_BOARDS = "SET_BOARDS"
}

export const boardReducer = (state: BoardState, action: boardAction) => {
    const payload = action.payload;

    switch (action.type) {

      // payload:: {boards: Board[]}
      case (boardActionType.SET_BOARDS):
        return [...payload.boards]
    
      default:
        return state

    }
}