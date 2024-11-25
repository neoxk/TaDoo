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

  public static fromJson(json: any): Tasklist {
    if (!json.tasks) json.tasks = [];
    return new Tasklist(json.tasklistId, json.name, json.tasks.map((task: any) => Task.fromJson(task)));
  }


  
}