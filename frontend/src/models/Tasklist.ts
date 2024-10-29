import { Board } from "./Board";

export class Tasklist {
  private _tasklist_id: number;
  private _board_id: number;
  public name: string;
  
  constructor(board_id: number, tasklist_id: number, name: string) {
    this._tasklist_id = tasklist_id;
    this.name = name;
    this._board_id = board_id;
  }

  get id(): number {
    return this._tasklist_id;
  }

  
}