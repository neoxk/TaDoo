import { Tag } from "../models/Tag";
import { Task } from "../models/Task";
import { Tasklist } from "../models/Tasklist";
import { Color } from "../types/types";
import { Service } from "./Service";

export class TaskService extends Service {

  public async getTasklists(board_id: number): Promise<Tasklist[]> {
    const tasks1: Task[] = [
      new Task(1, "Ocisti sobo", false, [{ name: "nujno", color: Color.red }]),
      new Task(2, "Opravi domaco nalogo", false, [
        { name: "easy", color: Color.green },
      ]),
    new Task(3, "Pojdi na sprehod", false, [
      { name: "jutri", color: Color.yellow },
    ]),
  ];

  const tasks2: Task[] = [
    new Task(2, "Opravi domaco nalogo", false, [{ name: "easy", color: Color.green }]),
    new Task(3, "Pojdi na trening", false, [{ name: "jutri", color: Color.blue }]),
  ];

  const tasks3: Task[] = [
    new Task(4, "Naredi nalogo", false, [{ name: "nujno", color: Color.purple }]),
  ];

  const initialTasklists: Tasklist[] = [
    new Tasklist(1, "Tasks1", tasks1),
    new Tasklist(2, "Tasks2", tasks2),
    new Tasklist(3, "Tasks3", tasks3),
  ];

  return Promise.resolve(initialTasklists);
  }


  public async createTasklist(board_id: number, name: string): Promise<Tasklist> {
    const tasklist = new Tasklist(Math.random()*100000, name, []);
    return Promise.resolve(tasklist);

  }

  public async deleteTasklist(tasklist_id: number): Promise<void> {
    return Promise.resolve();
  }

  public async createTask(tasklist_id: number, name: string): Promise<Task> {
    const task = new Task(1, name, false, [new Tag("Dodaj tag", Color.red)]);
    return Promise.resolve(task);
  }

  public async deleteTask(task_id: number): Promise<void> {
    return Promise.resolve();
  }

  public async updateTask(task: Task): Promise<Task> {
    return Promise.resolve(task);
  }

  public async updateTasklist(tasklist: Tasklist): Promise<Tasklist> {
    return Promise.resolve(tasklist);
  }



}