import { Tag } from "./Tag";
import { Tasklist } from "./Tasklist";

export class Task {
  private _task_id: number;
  public name: string;
  public done: boolean;
  public tags: Tag[];
  private _tasklist_id: number;

  constructor(task_id: number, name: string, done: boolean, tags: Tag[], tasklist_id: number) {
    this._task_id = task_id;
    this.name = name;
    this.done = done;
    this.tags = tags;
    this._tasklist_id = tasklist_id;
  }

  get id(): number {
    return this._task_id;
  }

}