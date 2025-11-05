
import Sidenav from './Components/Sidenav/Sidenav'
import { Routes,Route, Navigate } from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard'
import CategoryAdd from './Components/Category/Category1'
import CategoryList from './Components/Category/Category2'
import PageNotFound from './Components/NotFound/PageNotFound'
import Login from './Components/Login/Login'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'

function App() {
  

  return (
    <>
      {/* <Sidenav/> */}
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route element={<PrivateRoute/>}>
        <Route  path='/' element={<Sidenav/>}>
        <Route index element={<Navigate to="home"/>}/>
        <Route path='/home' element={<Dashboard/>}/>
        <Route path='/category-List' element={<CategoryList/>}/>
        <Route path='/add-category' element={<CategoryAdd/>}/>
        </Route>
        </Route>
        <Route path='*' element={<PageNotFound/>}/>
        
      </Routes>
    </>
  )
}

export default App
