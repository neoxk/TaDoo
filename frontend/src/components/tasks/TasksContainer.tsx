import { TaskCard } from "./TaskCard";
import { Task } from "../../models/Task";
import { EditableText } from "../common/EditableText";
import { Button } from "../common/Button";
import { Color, Icon } from "../../types/types";
import { useEffect, useState } from "preact/hooks";
import { TaskService } from "../../services/TaskService";
import { Tasklist } from "../../models/Tasklist";
import { useRef } from "react";
import { TimeAnalysisMenu } from "../common/TimeAnalysisMenu.tsx";

interface TasksContainerProps {
  title: string;
  tasks: Task[];
  tasklist_id: number;
  tasklist: Tasklist;
  onDelete: (tasklist_id: number) => void;
  handleTasklistChange: (tasklist: Tasklist) => void;
}

export function TasksContainer({
  title,
  tasks,
  tasklist_id,
  tasklist,
  onDelete,
  handleTasklistChange,
}: TasksContainerProps) {

  const [allTasks, setAllTasks] = useState(tasks)
  const [currTasks, setCurrTasks] = useState<Task[]>([]);
  const service = new TaskService();

  const [dwm, setDwm] = useState("ALL") 

  useEffect(() => {
    setCurrTasks(allTasks.filter(task => dwm == "ALL" || task.dwm === dwm))
  }, [allTasks, dwm])

  const timeAnalysisMenuRef = useRef<HTMLDialogElement | null>(null);

  const handleTimeAnalysisClick = () => {
    if (timeAnalysisMenuRef.current) {
      timeAnalysisMenuRef.current.showModal();
    }
  };

  const addTask = () => {
    service.createTask(tasklist_id, "New Task", dwm).then((task) => {
      console.log(task)
      setAllTasks([...allTasks, task])
      return
    });
  };

  const deleteTaskList = () => {
    onDelete(tasklist_id);
  };

  const removeTask = (index: number) => {
    service.deleteTask(currTasks[index]._task_id).then(() => {
      const updatedTasks = [...currTasks];
      updatedTasks.splice(index, 1);
      setAllTasks(updatedTasks);
    });

  };

  const handleTagColorChange = (
    taskIndex: number,
    tagName: string,
    newColor: Color
  ) => {
    // @ts-ignore
    setAllTasks((prevTasks) =>
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
      setAllTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._task_id === updatedTask._task_id ? updatedTask : task
      )
    );
    });
  };

  const handleDWMChange = () => {
    setDwm(curr => {
      if (curr === "ALL") {
        return "DLY" }
      else if (curr === "DLY") {
        return "WLY"
      } else if (curr === "WLY") {
        return "MLY"
      } else {
        return "ALL"
      }  
  })
  }

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
          <Button text={dwm} onClick={handleDWMChange} size="small"/>
          <Button iconName={Icon.details} onClick={handleTimeAnalysisClick} size="small" />
        </div>
      </div>
      <hr />
      {currTasks.map((task, index) => (
        <TaskCard
          task={task}
          tags={task.tags}
          onRemove={() => removeTask(currTasks.indexOf(task))}
          onTagColorChange={(tagName, newColor) =>
            handleTagColorChange(index, tagName, newColor)
          }
          handleTaskChange={(newTask) => handleTaskChange(newTask)}
        />
      ))}
      <TimeAnalysisMenu ref={timeAnalysisMenuRef} tasklist={tasklist} />
    </div>
  );
}
