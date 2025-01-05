import { useParams } from "react-router-dom";
import { TaskCard } from "./components/tasks/TaskCard";
import { useEffect, useState } from "preact/hooks";
import { Task } from "./models/Task";
import { TaskService } from "./services/TaskService";

export const SharedTaskView = () => {
  const params = useParams<{ task_id: string }>();
  const [task, setTask] = useState<Task | undefined>(undefined);
  const taskService = new TaskService();

  useEffect(() => {
    if (params.task_id) {
      taskService
        .getTaskById(parseInt(params.task_id))
        .then((task) => {
          setTask(task);
        });
    }
    console.log(params);
  }, []);

  return (
    <div className={"flex flex-row min-h-screen justify-center items-center"}>
      <div className={"w-[600px]"}>
        {task ? (
          <TaskCard
            task={task}
            tags={[]}
            onRemove={() => {}}
            onTagColorChange={() => {}}
            handleTaskChange={() => {}}
          />
        ) : (
          <p>Loading</p>
        )}
      </div>
    </div>
  );
};
