import { Logo } from "../common/Logo";
import { Navigation } from "./Navigation";
import { Profile } from "./Profile";
import { TaskNavigation } from "./TaskNavigation";

export function Sidebar() {
  return (
    <>
      <div class="w-64 bg-slate-100 h-full flex flex-col p-4 justify-between hidden md:block">
        <Logo />

        <div class="my-10 flex flex-col">
          <TaskNavigation />
          <Navigation linkTo="kjk" text="Delegated" />
          <Navigation linkTo="kjk" text="Calendar" />
        </div>

        <Profile
          name="Neo Kirbis"
          imageUrl="https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg"
        />
      </div>
    </>
  );
}
