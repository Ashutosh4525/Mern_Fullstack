import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import Reducer from './components/pages/reducer/Reducer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Reducer>
      <Router>
       <App />
      </Router>
    </Reducer>
  </StrictMode>,
)
