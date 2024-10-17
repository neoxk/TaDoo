import { TaskCard, TaskCardProps } from "./TaskCard";
import type { Task } from "../../models/Task";
import { EditableText } from "../common/EditableText";

interface TasksContainerProps {
  title: string;
  tasks: TaskCardProps[];
}

export function TasksContainer({ title, tasks }: TasksContainerProps) {
  return (
    <div className="w-full max-w-[600px] p-4">
      <EditableText text={title} handleChange={() => {}} />
      <hr />
      {tasks.map((task) => (
        <TaskCard name={task.name} tags={task.tags} />
      ))}
    </div>
  );
}
