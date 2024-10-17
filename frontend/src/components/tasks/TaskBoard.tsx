import { Task } from "../../models/Task.ts";
import { Color } from "../../types/types.ts";
import { TasksContainer } from "./TasksContainer.tsx";

interface TaskBoardProps {
  taskListt: { title: string; tasks: Task[] }[];
  title: string;
}

export const TaskBoard = ({ title, taskListt }: TaskBoardProps) => {
  const tasks1: Task[] = [
    new Task("Ocisti sobo", false, [{ name: "nujno", color: Color.red }]),
    new Task("Opravi domaco nalogo", false, [
      { name: "easy", color: Color.green },
    ]),
    new Task("Pojdi na sprehod", false, [
      { name: "jutri", color: Color.yellow },
    ]),
  ];

  const taskList: { title: string; tasks: Task[] }[] = [
    { title: "Tasks2", tasks: tasks1 },
    { title: "Tasks2", tasks: tasks1 },
  ];

  return (
    <div className="w-full p-10">
      <p class="font-bold text-2xl mb-4">{title}</p>
      <div className={`grid md:grid-cols-1 xl:grid-cols-2`}>
        {taskList.map((taskList) => (
          <TasksContainer title={taskList.title} tasks={taskList.tasks} />
        ))}
      </div>
    </div>
  );
};
