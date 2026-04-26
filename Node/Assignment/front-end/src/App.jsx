import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AdminBooks from "./components/AdminBooks";
import AppShell from "./components/AppShell";
import AuthorBooks from "./components/AuthorBooks";
import EditBook from "./components/EditBook";
import Forgetpasword from "./components/Forgetpasword";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPassword from "./components/ResetPassword";
import SignUp from "./components/Signup";
import SingleBook from "./components/SingleBook";
import UserList from "./components/UserList";
import UserUpdate from "./components/UserUpdate";
import UserView from "./components/UserView";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-pass" element={<Forgetpasword />} />
        <Route path="/reset-pass" element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            <Route path="/dashboard/:id" element={<UserView />} />
            <Route path="/update-profile/:id" element={<UserUpdate />} />
            <Route path="/books/:id" element={<SingleBook />} />
            <Route path="/authors/:id" element={<AuthorBooks />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute adminOnly />}>
          <Route element={<AppShell />}>
            <Route path="/admin/books" element={<AdminBooks />} />
            <Route path="/admin/edit-book/:id" element={<EditBook />} />
            <Route path="/admin/manage-user/:id" element={<UserUpdate />} />
            <Route path="/admin/users" element={<UserList />} />
          </Route>
        </Route>

        <Route path="*" element={<div className="page-message">404: Page Not Found</div>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
