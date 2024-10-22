import { Board } from "../models/Board";
import { User } from "../models/User";

export class BoardService {
  private user: User;
  private path: string;

  constructor(path: string, user: User = new User(1, "m", "m", "s") ) {
    this.user = user;
    this.path = path;
  }
  
  public async getBoards(): Promise<Board[] | []> {
    try {
      const response = await fetch(`${this.path}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user.token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async createBoard(name: string): Promise<Board | null> {
    try {
      const response = await fetch(`${this.path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user.token}`,
        },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  }

  public async deleteBoard(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.path}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user.token}`,
        },
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  public async updateBoard(id: number, name: string): Promise<Board | null> {
    try {
      const response = await fetch(`${this.path}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user.token}`,
        },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  }
}