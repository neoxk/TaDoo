import { Task } from "../../models/Task.ts";
import { Color, Icon } from "../../types/types.ts";
import { EditableText } from "../common/EditableText.tsx";
import { TasksContainer } from "./TasksContainer.tsx";
import { Board } from "../../models/Board.ts";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import { Button } from "../common/Button.tsx";
import { TaskService } from "../../services/TaskService.ts";
import { Tasklist } from "../../models/Tasklist.ts";
import { BoardService } from "../../services/BoardService.ts";
// import {Tasklist} from "../../models/Tasklist.ts";

interface TaskBoardProps {
  board: Board;
  handleBoardRename: (newName: string) => void;
}

export const TaskBoard = ({ board, handleBoardRename }: TaskBoardProps) => {
  const [tasklists, setTasklists] = useState<Tasklist[]>([]); // useState<Tasklist[]> - switch
  const taskService = new TaskService();

  useEffect(() => {
    taskService.getTasklists(board.board_id).then((_tasklists) => {
      setTasklists(_tasklists);
    });
  }, []);

  const handleDeleteTaskList = (tasklist_id: number) => {
    taskService.deleteTasklist(tasklist_id).then((_) => {
      const updatedTasklists = tasklists.filter(
        (tasklist) => tasklist._tasklist_id !== tasklist_id
      );
      setTasklists(updatedTasklists);
    });
  };

  const handleCreateTaskList = () => {
    taskService
      .createTasklist(board.board_id, "New Tasklist")
      .then((tasklist) => {
        setTasklists([...tasklists, tasklist]);
      });
  };

  const handleTasklistChange = (updatedTasklist: Tasklist) => {
    taskService.updateTasklist(updatedTasklist).then((tasklist) => {
      const updatedTasklists = tasklists.map((_tasklist) =>
        _tasklist._tasklist_id === tasklist._tasklist_id ? tasklist : _tasklist
      );
      setTasklists(updatedTasklists);
    });
  };

  return (
    <div className="w-full p-3 md:p-10">
      <div className="flex items-center justify-between w-full">
        <EditableText
          text={board.name}
          handleChange={(text) => handleBoardRename(text)}
          props={{ className: "font-bold text-2xl mb-4" }}
        />

        <Button
          onClick={handleCreateTaskList}
          size="small"
          iconName={Icon.add}
        />
      </div>

      <div className={`grid md:grid-cols-1 xl:grid-cols-2`}>
        {tasklists.map((taskList) => (
          <TasksContainer
            key={taskList._tasklist_id}
            title={taskList.name}
            tasks={taskList.tasks}
            tasklist_id={taskList._tasklist_id}
            onDelete={handleDeleteTaskList}
            handleTasklistChange={(newTasklist: Tasklist) =>
              handleTasklistChange(newTasklist)
            }
          />
        ))}
      </div>
    </div>
  );
};
