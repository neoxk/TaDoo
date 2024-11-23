import { useEffect, useState } from "preact/hooks";

export const EditableText = ({
  text,
  handleChange,
  size,
  props,
  isTag = false,
}: EditableTextProps) => {
  const [textVal, setTextVal] = useState(text);

  useEffect(() => {
    setTextVal(text);
  }, [text]);

  const handleInputChange = (val: string) => {
    setTextVal(val);
  };

  const inputWidth = `${Math.max(size || 0, textVal.length) + 1}ch`;

  let className = "w-auto outline-none bg-transparent";

  if (isTag) className += " text-center";

  if (props && "className" in props)
    (props.className as string)
      .split(" ")
      .forEach((clas) => (className += ` ${clas}`));

  return (
    <div>
      <input
        className={className}
        type="text"
        value={textVal}
        onChange={(e) =>
          handleInputChange((e.target as HTMLInputElement).value)
        }
        onBlur={() => handleChange(textVal)}
        style={{ width: inputWidth }}
      />
    </div>
  );
};

interface EditableTextProps {
  text: string;
  handleChange: (text: string) => void;
  size?: number;
  props?: object;
  isTag?: boolean;
}
