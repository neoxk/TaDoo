import { TaskState } from "./TaskState";
import { TaskAction, TaskActionType } from "./taskAction";

export const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {

    // Payload { task: Task }
    case TaskActionType.ADD_TASK:
      if (!action.payload.task) throw new Error("Payload must have task property : TaskActionType.ADD_TASK")

      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
      
      // Payload { id: string || task: Task } 
      case TaskActionType.DELETE_TASK:
        if (!action.payload.id && !action.payload.task) throw new Error("Payload must have either id or task property : TaskActionType.DELETE_TASK")

        return {
          ...state,
          tasks: state.tasks.filter((task) => {
            action.payload.id ? task.id !== action.payload.id : task.id !== action.payload.task.id
          }),
        };
      
      default:
        return state;
  }
}