import { Color } from "../../types/types";

interface TagViewProps {
  name: string;
  color: Color;
}

export const TagView = ({ name, color }: TagViewProps) => {
  return (
    <span
      class={`rounded-full mx-2 px-2 py-1 text-white text-xs bg-${color}-500 p-1`}
    >
      {name}
    </span>
  );
};
