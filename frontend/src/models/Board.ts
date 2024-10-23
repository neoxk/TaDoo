export class Board {
  private _board_id: number;
  public name: string;
  
  constructor(board_id: number, name: string) {
    this._board_id = board_id;
    this.name = name;
  }

  get id() {
    return this._board_id;
  }
}