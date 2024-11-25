import { Tag } from "./Tag";

export class Task {
  public _task_id: number;
  public name: string;
  public done: boolean;
  public tags: Tag[];

  constructor(task_id: number, name: string, done: boolean, tags: Tag[]) {
    this._task_id = task_id;
    this.name = name;
    this.done = done;
    this.tags = tags;
  }

  public static fromJson(json: any): Task {
    if (!json.tags) json.tags = []
    return new Task(json.task_id, json.name, json.done, json.tags.map((tag: any) => Tag.fromJson(tag)));
  }

  
  

}