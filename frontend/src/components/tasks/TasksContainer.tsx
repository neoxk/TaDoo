import { TaskCard, TaskCardProps } from "./TaskCard";
import type { Task } from "../../models/Task";

interface TasksContainerProps {
  title: string;
  tasks: TaskCardProps[];
}

export function TasksContainer({ title, tasks }: TasksContainerProps) {
  return (
    <div className="w-full max-w-[600px] p-4">
      <p>{title}</p>
      <hr />
      {tasks.map((task) => (
        <TaskCard name={task.name} tags={task.tags} />
      ))}
    </div>
  );
}
