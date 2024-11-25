export class Board {
  public board_id: number;
  public name: string;
  
  constructor(board_id: number, name: string) {
    this.board_id = board_id;
    this.name = name;
  }

  public static fromJson(json: any): Board {
    return new Board(json.boardId, json.name);
  }

  

}