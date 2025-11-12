
import { Routes, Route } from "react-router-dom"
import Header from "./component/Global/Header"
import Introduction from "./component/Pages/Introduction/Introduction.jsx"
import Features from "./component/Pages/Features/Features"
import NotFound from "./component/Pages/NotFound"
import Lifecycle from "./component/Pages/LifeCycle/LifeCycle"
import ProductList from "./component/Pages/Product/ProductList.jsx"

function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route index element={<Introduction/>}/>
      <Route path="/home" element={<Introduction/>}/>
      <Route path="/features" element={<Features/>}/>
      <Route path="/product-list" element={<ProductList/>}/>
      <Route path="/lifecycle" element={<Lifecycle/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>

    </>
  )
}

export default App
