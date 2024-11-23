import { Board } from "../models/Board";
import { Service } from "./Service";

export class BoardService extends Service {
  public async getBoards(): Promise<Board[]> {
    // const response = super.newRequest('/boards')
    // return response.json();

    const board = new Board(1, "Personal")
    const board2 = new Board(2, "Projects")
    const board3 = new Board(3, "Testing")
    const board4 = new Board(3, "Random")

    const boards = [board, board2, board3, board4]

    return Promise.resolve(boards)
  }

  public async createBoard(): Promise<Board> {
    const board = new Board(1, "New Board")
    return Promise.resolve(board)
  }

  public async deleteBoard(board_id: number): Promise<void> {
    return Promise.resolve()
  }
  
  public async updateBoard(board: Board): Promise<Board> {
    return Promise.resolve(board)
  }

}