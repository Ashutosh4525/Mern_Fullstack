import Login from "./components/Login"
import {Routes, Route } from "react-router-dom"
import SignUp from "./components/Signup"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import UserView from "./components/userView";
import EditBook from "./components/EditBook"
import UserUpdate from "./components/UserUpdate"
import AdminBooks from "./components/AdminBooks"
import SingleBook from "./components/SingleBook"
import UserList from "./components/UserList"
import Forgetpasword from "./components/Forgetpasword"
import ResetPassword from "./components/ResetPassword"

function App() {
  

  return (
    <>
    <AuthProvider>
      {/* <Login/> */}
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>

        <Route path="/forgot-pass" element={<Forgetpasword/>}/>
          <Route path="/reset-pass" element={<ResetPassword/>}/>

        <Route element={<ProtectedRoute/>}>
          <Route path="/dashboard/:id" element={<UserView/>}/>
          <Route path="/update-profile/:id" element={<UserUpdate />} />
          <Route path="/books" element={<h1>User View: All Books</h1>} />
          <Route path="/books/:id" element={<SingleBook/>}/>
        </Route>
        <Route element={<ProtectedRoute adminOnly={true}/>}>
        <Route path="/dashboard/:id" element={<UserView/>}/>
          <Route path="/admin/books" element={<AdminBooks />} />
          <Route path="/admin/edit-book/:id" element={<EditBook />} />
          <Route path="/admin/manage-user/:id" element={<UserUpdate />} />
          <Route path="/admin/users" element={<UserList/>}/>
        </Route>
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
      </AuthProvider>
    </>
  )
}

export default App
