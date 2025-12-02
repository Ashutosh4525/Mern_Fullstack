import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './components/redux/store.js'
import ScrollTop from './components/Scrolltop/ScrollTop.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <Router>
      <ScrollTop/>
      <App />
    </Router>
    </Provider>
  </StrictMode>,
)
