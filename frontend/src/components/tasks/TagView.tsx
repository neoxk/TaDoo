import { Color } from "../../types/types";
import {useState} from "preact/hooks";
import {ContextMenu} from "../common/ContextMenu.tsx";
import {EditableText} from "../common/EditableText.tsx";

interface TagViewProps {
  name: string;
  color: Color;
  onChangeColor?: (color: Color) => void;
}

export const TagView = ({ name, color, onChangeColor }: TagViewProps) => {
  const [showContextMenu, setShowContextMenu] = useState(false); // for showing the menu (right-click on the tag)
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 }); // menu position

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault(); // to prevent the default menu from appearing
    setShowContextMenu(true);
    setMenuPosition({ x: e.clientX, y: e.clientY });
  }

  const handleCloseContextMenu = () => {
    setShowContextMenu(false);
  }

  return (
    <div class={`rounded-full mx-2 px-2 py-1 text-white text-xs bg-${color}-500 p-1 text-center`} onContextMenu={handleContextMenu}>

      <EditableText text={name} handleChange={() => {}} isTag={true}/>

      {showContextMenu &&
          (
          <div style={{position: "absolute", top: `${menuPosition.y}px`, left: `${menuPosition.x}px`, zIndex: 1000}}>
            <ContextMenu onClose={handleCloseContextMenu} onChangeColor={onChangeColor} />
          </div>
        )}
    </div>
  );
};
