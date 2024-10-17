import { Tag } from "./Tag";

export class Task {
  constructor(public name: string, public done: boolean, public tags: Tag[]) {
    this.name = name;
    this.done = done;
    this.tags = tags;
  }
}