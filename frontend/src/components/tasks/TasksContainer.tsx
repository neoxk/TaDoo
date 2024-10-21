import { TaskCard, TaskCardProps } from "./TaskCard";
import type { Task } from "../../models/Task";
import { EditableText } from "../common/EditableText";
import { Button } from "../common/Button";
import { Color, Icon } from "../../types/types";

interface TasksContainerProps {
  title: string;
  tasks: TaskCardProps[];
}

export function TasksContainer({ title, tasks }: TasksContainerProps) {
  return (
    <div className="w-full max-w-[600px] p-4">
      <div className="flex justify-between items-center">
        <EditableText text={title} handleChange={() => {}} />
        <Button iconName={Icon.add} onClick={() => {}} size="small" />
      </div>
      <hr />
      {tasks.map((task) => (
        <TaskCard name={task.name} tags={task.tags} />
      ))}
    </div>
  );
}
