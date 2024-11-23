import { TaskCard } from "./TaskCard";
import { Task } from "../../models/Task";
import { EditableText } from "../common/EditableText";
import { Button } from "../common/Button";
import { Color, Icon } from "../../types/types";
import { useState } from "preact/hooks";

interface TasksContainerProps {
  title: string;
  tasks: Task[];
  tasklist_id: number;
  onDelete: (tasklist_id: number) => void;
}

export function TasksContainer({ title, tasks, tasklist_id, onDelete }: TasksContainerProps) {
  const [currTasks, setCurrTasks] = useState(tasks);

    const addTask = () => {
      setCurrTasks([
          ...currTasks,
          new Task(currTasks.length + 1, "New Task", false, [{ name: "Set Tag", color: Color.red }], tasklist_id)
      ]);
    }

    const deleteTaskList = () => {
      onDelete(tasklist_id);
    }

    const removeTask = (index: number) => {
      const updatedTasks = [...currTasks];
      updatedTasks.splice(index, 1);
      setCurrTasks(updatedTasks);
    }

    const handleTagColorChange = (taskIndex: number, tagName: string, newColor: Color) => {
      // @ts-ignore
      setCurrTasks((prevTasks) => prevTasks.map((task, i) =>
        i === taskIndex ? {
          ...task,
          tags: task.tags.map((tag) =>
            tag.name === tagName ? { ...tag, color: newColor } : tag,
          ),
        } : task
      ));
    }

    return (
    <div className="w-full max-w-[600px] p-4">
      <div className="flex justify-between items-center">
        <EditableText text={title} handleChange={() => {}} />
        <div className="ml-auto flex space-x-2">
          <Button iconName={Icon.add} onClick={addTask} size="small"/>
          <Button iconName={Icon.trash} onClick={deleteTaskList} size="small"/>
        </div>
      </div>
      <hr/>
      {currTasks.map((task, index) => (
        <TaskCard key={index} task={task} tags={task.tags} onRemove={() => removeTask(currTasks.indexOf(task))} onTagColorChange={(tagName, newColor) => handleTagColorChange(index, tagName, newColor)}/>
      ))}
    </div>
  );
}
