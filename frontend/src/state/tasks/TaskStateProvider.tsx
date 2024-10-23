import { useReducer } from "preact/hooks";
import { taskReducer } from "./taskReducer";
import { createContext } from "preact";
import { TaskState } from "./TaskState";


export const TaskStateContext = createContext<[TaskState , any]>([
  {
    boards: [],
    tasklists: [],
    tasks: [],
  },
  () => {},
]);

export const TaskStateProvider = ({children}: {children: any}) => {
  const initialState: TaskState = {
    boards: [],
    tasklists: [],
    tasks: [],
  }

  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskStateContext.Provider value={[ state, dispatch ]}>
      {children}
    </TaskStateContext.Provider>
  );
}