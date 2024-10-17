import { useState } from "preact/hooks";

interface EditableTextProps {
  text: string;
  handleChange: (text: string | null) => void;
  size?: number;
}

export const EditableText = ({
  text,
  handleChange,
  size,
}: EditableTextProps) => {
  const [textVal, setTextVal] = useState(text);

  const handleInputChange = (val: string) => {
    setTextVal(val);
    handleChange(val);
  };

  const inputWidth = `${Math.max(size || 0, textVal.length) + 1}ch`;

  return (
    <input
      className="w-auto outline-none"
      type="text"
      value={textVal}
      onChange={(e) => handleInputChange((e.target as HTMLInputElement).value)}
      style={{ width: inputWidth }}
    />
  );
};
