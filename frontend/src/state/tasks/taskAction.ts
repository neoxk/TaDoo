
export interface TaskAction {
  type: TaskActionType;
  payload: any;
}

export enum TaskActionType {
  ADD_TASK = "ADD_TASK",
  DELETE_TASK = "DELETE_TASK",
  TOGGLE_TASK = "TOGGLE_TASK",
  ADD_TAG = "ADD_TAG",
  DELETE_TAG = "DELETE_TAG"
}
