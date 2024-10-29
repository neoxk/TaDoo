import { Board } from "../models/Board";
import { Service } from "./Service";

export class BoardService extends Service {
  public async getBoards(): Promise<Board[]> {
    // const response = super.newRequest('/boards')
    // return response.json();

    const board = new Board(1, "Personal")
    const board2 = new Board(2, "Projects")

    const boards = [board, board2] 

    return Promise.resolve(boards)
  }

}