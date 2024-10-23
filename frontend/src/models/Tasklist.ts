export class Tasklist {
  private _tasklist_id: number;
  public name: string;
  
  constructor(tasklist_id: number, name: string) {
    this._tasklist_id = tasklist_id;
    this.name = name;
  }

  get id(): number {
    return this._tasklist_id;
  }
}