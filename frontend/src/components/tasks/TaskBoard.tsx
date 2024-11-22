import { Task } from "../../models/Task.ts";
import {Color, Icon} from "../../types/types.ts";
import { EditableText } from "../common/EditableText.tsx";
import { TasksContainer } from "./TasksContainer.tsx";
import { Board } from "../../models/Board.ts";
import { useState } from "preact/hooks";
import {Button} from "../common/Button.tsx";
// import {Tasklist} from "../../models/Tasklist.ts";

interface TaskBoardProps {
  board: Board;
}

export const TaskBoard = ({ board }: TaskBoardProps) => {

  const tasks1: Task[] = [
    new Task(1, "Ocisti sobo", false, [{ name: "nujno", color: Color.red }], 1),
    new Task(2, "Opravi domaco nalogo", false, [
      { name: "easy", color: Color.green },
    ], board.id),
    new Task(3, "Pojdi na sprehod", false, [
      { name: "jutri", color: Color.yellow },
    ], board.id),
  ];

  const tasks2: Task[] = [
    new Task(2, "Opravi domaco nalogo", false, [{ name: "easy", color: Color.green }], board.id),
    new Task(3, "Pojdi na trening", false, [{ name: "jutri", color: Color.blue }], board.id),
  ];

  const tasks3: Task[] = [
    new Task(4, "Naredi nalogo", false, [{ name: "nujno", color: Color.purple }], board.id),
  ];

  const initialTasklists: { id: number, title: string; tasks: Task[] }[] = [
    { id: 1, title: "Tasks1", tasks: tasks1 },
    { id: 2, title: "Tasks2", tasks: tasks2 },
    { id: 3, title: "Tasks3", tasks: tasks3 }
  ];

  const [tasklists, setTasklists] = useState(initialTasklists); // useState<Tasklist[]> - switch

  const handleDeleteTaskList = (tasklist_id: number) => {
    const updatedTasklists = tasklists.filter(tasklist => tasklist.id !== tasklist_id);
    // console.log(updatedTasklists);
    setTasklists(updatedTasklists);
  };

  const handleCreateTaskList = () => {
    const newTaskList = {
      id: tasklists.length + 1,
      title: "New Tasklist",
      tasks: []
    };

    setTasklists([...tasklists, newTaskList]);
  };

  return (
    <div className="w-full p-3 md:p-10">

      <div className="flex items-center justify-between w-full">
        <EditableText
            text={board.name}
            handleChange={() => {}}
            props={{className: "font-bold text-2xl mb-4"}} />

        <Button onClick={handleCreateTaskList} size="small" iconName={Icon.add} />
      </div>

      <div className={`grid md:grid-cols-1 xl:grid-cols-2`}>
        {tasklists.map((taskList) => (
          <TasksContainer key={taskList.id} title={taskList.title} tasks={taskList.tasks} tasklist_id={taskList.id} onDelete={handleDeleteTaskList}/>
        ))}
      </div>
    </div>
  );
};
