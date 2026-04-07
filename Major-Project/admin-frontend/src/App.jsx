import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './services/store';
import Layout from './components/Layout';
import Login from './pages/Login';
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

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/" element={<Login/>}/> */}
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/forgot-pass" element={<Forgetpasword/>}/>
          <Route path="/reset-pass" element={<ResetPassword/>}/>
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
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
    </Provider>
  );
}

export default App;
