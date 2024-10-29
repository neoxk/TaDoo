import { createContext } from "preact";
import { BoardState } from "./BoardState";
import { useReducer } from "preact/hooks";
import { boardReducer } from "./boardReducer";

export const BoardStateContext = createContext<[BoardState , any]>([] as unknown as [BoardState, any]);

export const BoardStateProvider = ({children}: {children: any}) => {
  const initialState: BoardState = [] 

  const [state, dispatch] = useReducer(boardReducer, initialState);

  return (
    <BoardStateContext.Provider value={[ state, dispatch ]}>
      {children}
    </BoardStateContext.Provider>
  );
}