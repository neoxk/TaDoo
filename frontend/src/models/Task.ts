import { Tag } from "./Tag";

export class Task {
  public _task_id: number;
  public name: string;
  public done: boolean;
  public tags: Tag[];
  public has_file: number;
  public file_path: string;
  public dwm: string;

  constructor(task_id: number, name: string, done: boolean, tags: Tag[], has_file: number, file_path: string, dwm: string) {
    this._task_id = task_id;
    this.name = name;
    this.done = done;
    this.tags = tags;
    this.has_file = has_file;
    this.file_path = file_path;
    this.dwm = dwm
  }

  public static fromJson(json: any): Task {
    if (!json.tags) json.tags = []
    return new Task(json.task_id, json.name, json.done, json.tags.map((tag: any) => Tag.fromJson(tag)), json.has_file, json.file_path, json.dwm);
  }
}