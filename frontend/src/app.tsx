import {Sidebar} from './components/Sidebar.tsx'
import { Tasks } from './components/Tasks.tsx'

export function App() {

  return (
  <div class="h-screen flex">
     <Sidebar/>
     <Tasks /> 
  </div>

  )
}
