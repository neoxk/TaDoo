import { Board } from "./Board";
import { Task } from "./Task";

export class Tasklist {
  public _tasklist_id: number;
  public name: string;
  public tasks: Task[];
  
  constructor(tasklist_id: number, name: string, tasks: Task[]) {
    this._tasklist_id = tasklist_id;
    this.name = name;
    this.tasks = tasks;
  }


  
}