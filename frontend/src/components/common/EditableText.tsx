import { useState } from "preact/hooks";

interface EditableTextProps {
  text: string;
  handleChange: (text: string | null) => void;
  size?: number;
  props?: object;
}

export const EditableText = ({
  text,
  handleChange,
  size,
  props
}: EditableTextProps) => {
  const [textVal, setTextVal] = useState(text);

  const handleInputChange = (val: string) => {
    setTextVal(val);
    handleChange(val);
  };

  const inputWidth = `${Math.max(size || 0, textVal.length) + 1}ch`;

  let className = 'w-auto outline-none ';
  if (props && "className" in props) (props.className as string).split(" ").forEach(clas => className += ` ${clas}`);

  return (
    <input
      className={className}
      type="text"
      value={textVal}
      onChange={(e) => handleInputChange((e.target as HTMLInputElement).value)}
      style={{ width: inputWidth }}
    />
  );
};
