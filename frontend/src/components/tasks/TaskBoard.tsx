import { Task } from "../../models/Task.ts";
import { Color } from "../../types/types.ts";
import { EditableText } from "../common/EditableText.tsx";
import { TasksContainer } from "./TasksContainer.tsx";

interface TaskBoardProps {
  title: string;
}

export const TaskBoard = ({ title }: TaskBoardProps) => {
  const tasks1: Task[] = [
    new Task(1, "Ocisti sobo", false, [{ name: "nujno", color: Color.red }]),
    new Task(2, "Opravi domaco nalogo", false, [
      { name: "easy", color: Color.green },
    ]),
    new Task(3, "Pojdi na sprehod", false, [
      { name: "jutri", color: Color.yellow },
    ]),
  ];

  const taskList: { title: string; tasks: Task[] }[] = [
    { title: "Tasks2", tasks: tasks1 },
    { title: "Tasks2", tasks: tasks1 },
  ];

  return (
    <div className="w-full p-3 md:p-10">
      <EditableText 
        text={title} 
        handleChange={() => {}} 
        props={{className: "font-bold text-2xl mb-4"}} />

      <div className={`grid md:grid-cols-1 xl:grid-cols-2`}>
        {taskList.map((taskList) => (
          <TasksContainer title={taskList.title} tasks={taskList.tasks} />
        ))}
      </div>
    </div>
  );
};
