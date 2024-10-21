import { Color, Icon } from "../../types/types";

interface ButtonProps {
  text?: string;
  iconUrl?: string;
  onClick: () => void;
  color?: Color;
  iconName?: Icon;
  size: "small" | "medium" | "large";
}

export const Button = ({
  text,
  iconUrl,
  onClick,
  color,
  iconName,
  size,
}: ButtonProps) => {
  let colorClasses: string = "text-black";
  if (color) {
    colorClasses = `bg-${color}-300 hover:bg-${color}-700 text-black hover:text-white`;
  }

  let sizeClass: string = "";
  let width: number = 20;
  if (size === "small") {
    width = 20;
  }
  if (size === "medium") {
    width = 30;
  }
  if (size === "large") {
    width = 40;
  }

  if (iconName && iconName === "trash") iconUrl = "/src/assets/icon_trash.svg";
  if (iconName && iconName === "send") iconUrl = "/src/assets/icon_send.svg";
  if (iconName && iconName === "add") iconUrl = "/src/assets/icon_add.svg";

  return (
    <button onClick={onClick} className={`${colorClasses} rounded`}>
      {iconUrl && <img src={iconUrl} alt="icon" width={width} />}
      {text}
    </button>
  );
};
