import { TaskCard } from "./TaskCard";
import { Task } from "../../models/Task";
import { EditableText } from "../common/EditableText";
import { Button } from "../common/Button";
import { Color, Icon } from "../../types/types";
import { useState } from "preact/hooks";
import { TaskService } from "../../services/TaskService";
import { Tasklist } from "../../models/Tasklist";

interface TasksContainerProps {
  title: string;
  tasks: Task[];
  tasklist_id: number;
  onDelete: (tasklist_id: number) => void;
  handleTasklistChange: (tasklist: Tasklist) => void;
}

export function TasksContainer({
  title,
  tasks,
  tasklist_id,
  onDelete,
  handleTasklistChange,
}: TasksContainerProps) {
  const [currTasks, setCurrTasks] = useState(tasks);
  const service = new TaskService();

  const addTask = () => {
    service.createTask(tasklist_id, "New Task").then((task) => {
      setCurrTasks([...currTasks, task]);
    });
  };

  const deleteTaskList = () => {
    onDelete(tasklist_id);
  };

  const removeTask = (index: number) => {
    service.deleteTask(currTasks[index]._task_id).then(() => {
      const updatedTasks = [...currTasks];
      updatedTasks.splice(index, 1);
      setCurrTasks(updatedTasks);
    });
  };

  const handleTagColorChange = (
    taskIndex: number,
    tagName: string,
    newColor: Color
  ) => {
    // @ts-ignore
    setCurrTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === taskIndex
          ? {
              ...task,
              tags: task.tags.map((tag) =>
                tag.name === tagName ? { ...tag, color: newColor } : tag
              ),
            }
          : task
      )
    );
  };

  const handleTaskChange = (newTask: Task) => {
    service.updateTask(newTask).then((updatedTask) => {
      setCurrTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._task_id === updatedTask._task_id ? updatedTask : task
        )
      );
    });
  };

  return (
    <div className="w-full max-w-[600px] p-4">
      <div className="flex justify-between items-center">
        <EditableText
          text={title}
          handleChange={(newText) =>
            handleTasklistChange({
              name: newText,
              _tasklist_id: tasklist_id,
              tasks,
            })
          }
        />
        <div className="ml-auto flex space-x-2">
          <Button iconName={Icon.add} onClick={addTask} size="small" />
          <Button iconName={Icon.trash} onClick={deleteTaskList} size="small" />
        </div>
      </div>
      <hr />
      {currTasks.map((task, index) => (
        <TaskCard
          key={index}
          name={task.name}
          tags={task.tags}
          onRemove={() => removeTask(currTasks.indexOf(task))}
          onTagColorChange={(tagName, newColor) =>
            handleTagColorChange(index, tagName, newColor)
          }
          handleTaskChange={(newTask) => handleTaskChange(newTask)}
        />
      ))}
    </div>
  );
}
