import { Color } from "../types/types";

export class Tag {
  constructor(public name: string, public color: Color) {
    this.name = name;
    this.color = color;
  }
}