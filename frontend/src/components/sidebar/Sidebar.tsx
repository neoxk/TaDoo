import { Logo } from "../common/Logo";
import { Profile } from "./Profile";
import { TaskNavigation } from "./TaskNavigation";
import {Board} from "../../models/Board.ts";
// import {useEffect, useState} from "preact/hooks";

interface SidebarProps {
  boards: Board[];
  onSelectBoard: (board: Board) => void;
}

export function Sidebar({ boards, onSelectBoard }: SidebarProps) {
  // const [getBoards, setBoards] = useState<Board[]>(boards);

  // useEffect(() => {
  //   setBoards(boards);
  // }, [boards]);

  return (
    <>
      <div class="w-64 bg-slate-100 h-full flex flex-col p-4 justify-between hidden md:block">
        <Logo />

        <div class="my-10 flex flex-col">
          <TaskNavigation myBoards={boards} onSelectBoard={onSelectBoard} />
          {/*<Navigation linkTo="kjk" text="Delegated" />*/}
          {/*<Navigation linkTo="kjk" text="Calendar" />*/}
        </div>

        <Profile
          name="Neo Kirbis"
          imageUrl="https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg"
        />
      </div>
    </>
  );
}
