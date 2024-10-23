import { Board } from "../../models/Board";
import { Task } from "../../models/Task";
import { Tasklist } from "../../models/Tasklist";

export interface TaskState {
  boards: Board[];
  tasklists: Tasklist[];
  tasks: Task[];
}

