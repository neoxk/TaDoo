import { render } from 'preact'
import { App } from './app.tsx'
import './index.css'
import { TaskStateProvider } from './state/tasks/TaskStateProvider.tsx'

render(<TaskStateProvider><App/></TaskStateProvider>, document.getElementById('app')!)
