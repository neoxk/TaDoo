import { useContext } from "preact/hooks";
import { Sidebar } from "./components/sidebar/Sidebar.tsx";
import { TaskBoard } from "./components/tasks/TaskBoard.tsx";
import { TaskStateContext } from "./state/tasks/TaskStateProvider.tsx";

export function App() {
  return (
    <div class="h-screen flex">
        <Sidebar />
        <TaskBoard title="Personal" />
    </div>
  );
}
