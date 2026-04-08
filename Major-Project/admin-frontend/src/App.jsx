import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import SignUpPage from './pages/SignUpPage';
import ForgetPassPage from './pages/ForgetPassPage';
import ResetPassPage from './pages/ResetPassPage';
import Dashboard from './pages/Dashboard';
import ContentManagement from './pages/ContentManagement';
import CastManagement from './pages/CastManagement';
import CategoryManagement from './pages/CategoryManagement';
import UserManagement from './pages/UserManagement';
import MovieManagement from './pages/MovieManagement';
import EpisodeManagement from './pages/EpisodeManagement';
import TVShowManagement from './pages/TVShowManagement';
import PurchaseManagement from './pages/PurchaseManagement';
import EditContent from './pages/EditContent';
import EditMovie from './pages/EditMovie';
import EditEpisode from './pages/EditEpisode';
import EditTVShow from './pages/EditTVShow';
import EditCategory from './pages/EditCategory';
import EditCast from './pages/EditCast';
import EditUser from './pages/EditUser';
import PurchaseDetail from './pages/PurchaseDetail';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgetPassPage />} />
        <Route path="/reset-password" element={<ResetPassPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/content" element={<ContentManagement />} />
            <Route path="/content/:id" element={<EditContent />} />
            <Route path="/cast" element={<CastManagement />} />
            <Route path="/cast/:id" element={<EditCast />} />
            <Route path="/categories" element={<CategoryManagement />} />
            <Route path="/categories/:id" element={<EditCategory />} />
            <Route path="/users" element={<UserManagement />} />
            {/* <Route path="/users/:id" element={<EditUser />} /> */}
            <Route path="/movies" element={<MovieManagement />} />
            <Route path="/movies/:id" element={<EditMovie />} />
            <Route path="/tvshows" element={<TVShowManagement />} />
            <Route path="/tvshows/:id" element={<EditTVShow />} />
            <Route path="/episodes" element={<EpisodeManagement />} />
            <Route path="/episodes/:id" element={<EditEpisode />} />
            <Route path="/purchases" element={<PurchaseManagement />} />
            <Route path="/purchases/:id" element={<PurchaseDetail />} />
          </Route>
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
