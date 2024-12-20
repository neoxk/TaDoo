import { Tag } from "../../models/Tag";
import { Color, Icon } from "../../types/types";
import { Button } from "../common/Button";
import { Checkbox } from "../common/Checkbox";
import { EditableText } from "../common/EditableText";
import { TagView } from "./TagView";
import { ShareMenu } from "../common/ShareMenu.tsx";
import { useRef, useState } from "react";
import { Task } from "../../models/Task.ts";
import { TaskService } from "../../services/TaskService.ts";
import {DetailsMenu} from "../common/DetailsMenu.tsx";

export interface TaskCardProps {
  task: Task;
  tags: Tag[];
  onRemove: () => void;
  onTagColorChange: (tagName: string, newColor: Color) => void;
  handleTaskChange: (updatedTask: Task) => void;
}

export const TaskCard = ({
  task,
  tags,
  onRemove,
  onTagColorChange,
  handleTaskChange,
}: TaskCardProps) => {
  // const [taskTags, setTaskTags] = useState(tags);

  const shareMenuRef = useRef<HTMLDialogElement | null>(null);
  const detailsMenuRef = useRef<HTMLDialogElement | null>(null);
  const taskService = new TaskService();
  const [done, setDone] = useState(task.done);

  const handleSendClick = () => {
    if (shareMenuRef.current) {
      shareMenuRef.current.showModal();
    }
  };

  const handleDetailsClick = () => {
    if (detailsMenuRef.current) {
      detailsMenuRef.current.showModal();
    }
  };

  const handleCheckboxClick = () => {
    taskService.markAsDone(task._task_id).then(() => {
      setDone(true);
    });
  };

  return (
    <div class="flex justify-between mt-4 align-center">
      <div>
        <div class="inline-flex items-center gap-2">
          <Checkbox checked={done} handleCheck={handleCheckboxClick} />
          <EditableText
            text={task.name}
            handleChange={(newText) =>
              handleTaskChange({ ...task, name: newText })
            }
          />
          {tags.map((tag) => (
            <TagView
              key={tag.name}
              name={tag.name}
              color={tag.color}
              onChangeColor={(newColor) => onTagColorChange(tag.name, newColor)}
            />
          ))}
        </div>
      </div>
      <div class="flex gap-2 self-center">
        <Button onClick={onRemove} size="small" iconName={Icon.trash} />
        <Button onClick={handleSendClick} size="small" iconName={Icon.send} />
        <Button onClick={handleDetailsClick} size="small" iconName={Icon.details} />
      </div>
      <ShareMenu ref={shareMenuRef} task={task} />
      <DetailsMenu ref={detailsMenuRef} task={task} />
    </div>
  );
};
