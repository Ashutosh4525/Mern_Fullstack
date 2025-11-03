
import { Routes, Route } from "react-router-dom"
import Header from "./components/global/Header"
import Introduction from "./components/pages/Introduction"
import Features from "./components/pages/Features"
import NotFound from "./components/pages/NotFound"
import Lifecycle from "./components/pages/Lifecycle"
import ProductList from "./components/pages/ProductList"
import SingleProduct from "./components/pages/SingleProduct"
import Login from "./components/pages/Login"

function App() {

  return (
    <>
    <Header/>
    <Routes>
      
      <Route index element={<Introduction/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<Introduction/>}/>
      <Route path="/features" element={<Features/>}/>
      <Route path="/lifecycle" element={<Lifecycle/>}/>
      <Route path="/product-list" element={<ProductList/>}/>
      {/* Dynamic Routing */}
      <Route path="/product/:id" element={<SingleProduct />}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>

    </>
  )
}

export default App
