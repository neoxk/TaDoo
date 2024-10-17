import { Color } from "../types/color";

export class Tag {
  constructor(public name: string, public color: Color) {
    this.name = name;
    this.color = color;
  }
}