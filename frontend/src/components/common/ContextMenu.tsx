import {useEffect} from "preact/hooks";
import {useRef} from "react";
import {Color} from "../../types/types.ts";


interface ContextMenuProps {
    onClose: () => void;
    onChangeColor?: (color: Color) => void;
}

export const ContextMenu = ({ onClose, onChangeColor }: ContextMenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null);

    const handleColorChange = (newColor: Color) => {
        onChangeColor!(newColor);
        onClose();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);


    return (
        <div
            ref={menuRef}
            class="absolute bg-gray-800 border border-gray-300 rounded shadow-md p-2 w-24 z-50"
        >
            <ul class="list-none p-0 m-0">
                <li>
                    <button
                        className="w-full text-left p-2 hover:bg-red-500"
                        onClick={() => handleColorChange(Color.red)}
                    >
                        Red
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left p-2 hover:bg-yellow-500"
                        onClick={() => handleColorChange(Color.yellow)}
                    >
                        Yellow
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left p-2 hover:bg-blue-500"
                        onClick={() => handleColorChange(Color.blue)}
                    >
                        Blue
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left p-2 hover:bg-green-500"
                        onClick={() => handleColorChange(Color.green)}
                    >
                        Green
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left p-2 hover:bg-orange-500"
                        onClick={() => handleColorChange(Color.orange)}
                    >
                        Orange
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left p-2 hover:bg-indigo-500"
                        onClick={() => handleColorChange(Color.indigo)}
                    >
                        Indigo
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left p-2 hover:bg-purple-500"
                        onClick={() => handleColorChange(Color.purple)}
                    >
                        Purple
                    </button>
                </li>
                <li>
                    <button
                        className="w-full text-left p-2 hover:bg-pink-500"
                        onClick={() => handleColorChange(Color.pink)}
                    >
                        Pink
                    </button>
                </li>
            </ul>
        </div>
    );
};