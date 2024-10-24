import { Tag } from "./Tag";

export class Task {
  private _task_id: number;
  public name: string;
  public done: boolean;
  public tags: Tag[];

  constructor(task_id: number, name: string, done: boolean, tags: Tag[]) {
    this._task_id = task_id;
    this.name = name;
    this.done = done;
    this.tags = tags;
  }

  get id(): number {
    return this._task_id;
  }

}