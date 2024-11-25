import { Color } from "../types/types";

export class Tag {
  constructor(public name: string, public color: Color) {
    this.name = name;
    this.color = color;
  }

  public static fromJson(json:any): Tag {
    return new Tag(json.name, json.color);
  }
}