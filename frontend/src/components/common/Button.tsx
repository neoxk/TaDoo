import { Color, Icon } from "../../types/types";

interface ButtonProps {
  text?: string;
  iconUrl?: string;
  onClick: (e: MouseEvent) => void;
  color?: Color;
  iconName?: Icon;
  size: "xsmall" | "small" | "medium" | "large";
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

  //let sizeClass: string = "";
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
  if (size === "xsmall") {
    width = 15;
  }

  if (iconName && iconName === "trash") iconUrl = "/public/icon_trash.svg";
  if (iconName && iconName === "send") iconUrl = "/public/icon_send.svg";
  if (iconName && iconName === "add") iconUrl = "/public/icon_add.svg";

  return (
    <button onClick={onClick} className={`${colorClasses} rounded`}>
      {iconUrl && <img src={iconUrl} alt="icon" width={width} />}
      {text}
    </button>
  );
};
