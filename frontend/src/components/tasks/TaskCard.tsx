import { Tag } from "../../models/Tag";
import { Icon } from "../../types/types";
import { Button } from "../common/Button";
import { Checkbox } from "../common/Checkbox";
import { EditableText } from "../common/EditableText";
import { TagView } from "./TagView";

export interface TaskCardProps {
  name: string;
  tags: Tag[];
}

export const TaskCard = ({ name, tags }: TaskCardProps) => {
  return (
    <div class="flex justify-between mt-4 align-center">
      <div>
        <div class="inline-flex items-center gap-2">
          <Checkbox checked={false} />
          <EditableText text={name} handleChange={() => {}} />
          {tags.map((tag) => (
            <TagView name={tag.name} color={tag.color} />
          ))}
        </div>
      </div>
      <div class="flex gap-2 self-center">
        <Button onClick={() => {}} size="small" iconName={Icon.trash} />
        <Button onClick={() => {}} size="small" iconName={Icon.send} />
      </div>
    </div>
  );
};
