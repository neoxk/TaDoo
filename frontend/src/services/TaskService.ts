import { Tag } from "../models/Tag";
import { Task } from "../models/Task";
import { Tasklist } from "../models/Tasklist";
import { Color } from "../types/types";
import { Service } from "./Service";

export class TaskService extends Service {

  public async getTasklists(board_id: number): Promise<Tasklist[]> {
    const response = super.newRequest("/tasklist?board_id="+ board_id).get()
    return response
  //   const tasks1: Task[] = [
  //     new Task(1, "Ocisti sobo", false, [{ name: "nujno", color: Color.red }]),
  //     new Task(2, "Opravi domaco nalogo", false, [
  //       { name: "easy", color: Color.green },
  //     ]),
  //   new Task(3, "Pojdi na sprehod", false, [
  //     { name: "jutri", color: Color.yellow },
  //   ]),
  // ];

  // const tasks2: Task[] = [
  //   new Task(2, "Opravi domaco nalogo", false, [{ name: "easy", color: Color.green }]),
  //   new Task(3, "Pojdi na trening", false, [{ name: "jutri", color: Color.blue }]),
  // ];

  // const tasks3: Task[] = [
  //   new Task(4, "Naredi nalogo", false, [{ name: "nujno", color: Color.purple }]),
  // ];

  // const initialTasklists: Tasklist[] = [
  //   new Tasklist(1, "Tasks1", tasks1),
  //   new Tasklist(2, "Tasks2", tasks2),
  //   new Tasklist(3, "Tasks3", tasks3),
  // ];

  }


  public async createTasklist(board_id: number): Promise<Tasklist> {
    const response = super.newRequest("/tasklist?boardId=" + board_id).post()
    return response
  }

  public async deleteTasklist(tasklist_id: number): Promise<void> {
    const response = super.newRequest("/tasklist/" + tasklist_id).delete()
    return response;
  }

  public async createTask(tasklist_id: number, name: string): Promise<Task> {
    const response = await super.newRequest('/task?tasklist_id=' + tasklist_id).post()
    return Task.fromJson(response);
  }

  public async deleteTask(task_id: number): Promise<void> {
    const response = await super.newRequest("/task/" + task_id).delete()
    return response;
  }

  public async updateTask(task: Task): Promise<Task> {
    const response = await super.newRequest("/task/" + task._task_id).put(task)
    return Task.fromJson(response);
  }

  public async updateTasklist(tasklist: Tasklist): Promise<Tasklist> {
    return super.newRequest("/tasklist/" + tasklist._tasklist_id).put(tasklist).then(json => Tasklist.fromJson(json))
  }



}