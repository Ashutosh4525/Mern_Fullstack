import Header from "./component/Global/Header"
import { Routes,Route } from "react-router-dom"
import Features from "./component/Pages/Features/Features"
import LifeCycle from "./component/Pages/LifeCycle/LifeCycle"

function App() {
  

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Header/>}/>
      <Route path="/features" element={<Features/>}/>
      <Route path="/life-cycle" element={<LifeCycle/>}/>
    </Routes>
    </>
  )
}

export default App
