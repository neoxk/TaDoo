import { render } from 'preact'
import { App } from './app.tsx'
import './index.css'
import { BoardStateProvider } from './state/boards/BoardStateProvider.tsx'

render(<BoardStateProvider><App/></BoardStateProvider>, document.getElementById('app')!)
