import { Tag } from "../../models/Tag";
import { Task } from "../../models/Task";
import { Color, Icon } from "../../types/types";
import { Button } from "../common/Button";
import { Checkbox } from "../common/Checkbox";
import { EditableText } from "../common/EditableText";
import { TagView } from "./TagView";
// import {useState} from "preact/hooks";

export interface TaskCardProps {
  id: number;
  name: string;
  tags: Tag[];
  onRemove: () => void;
  onTagColorChange: (tagName: string, newColor: Color) => void;
  handleTaskChange: (updatedTask: Task) => void;
}

export const TaskCard = ({
  id,
  name,
  tags,
  onRemove,
  onTagColorChange,
  handleTaskChange,
}: TaskCardProps) => {
  // const [taskTags, setTaskTags] = useState(tags);

  return (
    <div class="flex justify-between mt-4 align-center">
      <div>
        <div class="inline-flex items-center gap-2">
          <Checkbox checked={false} />
          <EditableText
            text={name}
            handleChange={(newText) =>
              handleTaskChange({
                _task_id: id,
                name: newText,
                done: false,
                tags,
              })
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
        <Button onClick={() => {}} size="small" iconName={Icon.send} />
      </div>
    </div>
  );
};
