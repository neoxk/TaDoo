import {Task} from "../models/Task";
import {Tasklist} from "../models/Tasklist";
import {Service} from "./Service";

export class TaskService extends Service {

  public async getTasklists(board_id: number): Promise<Tasklist[]> {
    return super.newRequest("/tasklist?board_id=" + board_id).get()
  }

  public async createTasklist(board_id: number): Promise<Tasklist> {
    return super.newRequest("/tasklist?boardId=" + board_id).post()
  }

  public async deleteTasklist(tasklist_id: number): Promise<void> {
    return super.newRequest("/tasklist/" + tasklist_id).delete();
  }

  public async createTask(tasklist_id: number, dwm: string): Promise<Task> {
    const response = await super.newRequest('/task?tasklist_id=' + tasklist_id + "&dwm=" + dwm).post()
    return Task.fromJson(response);
  }

  public async deleteTask(task_id: number): Promise<void> {
    return await super.newRequest("/task/" + task_id).delete();
  }

  public async updateTask(task: Task): Promise<Task> {
    const response = await super.newRequest("/task/" + task._task_id).put(task)
    return Task.fromJson(response);
  }

  public async updateTasklist(tasklist: Tasklist): Promise<Tasklist> {
    return super.newRequest("/tasklist/" + tasklist._tasklist_id).put(tasklist).then(json => Tasklist.fromJson(json))
  }

  public async getTaskById(task_id: number): Promise<Task> {
    const response = await super.newRequest("/task/" + task_id).get()
    return Task.fromJson(response); 
  }

  public async getQRCode(task_id: number): Promise<string> {
    return await super.newRequest("/task/" + task_id + "/qr").get();
  }

  public async markAsDone(task_id: number): Promise<void> {
    return await super.newRequest("/task/" + task_id + "/done").patch();
  }



}