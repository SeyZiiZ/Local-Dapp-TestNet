import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import WhitelistPage from './pages/WhiteList';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path='/whitelist'
        element={
          <ProtectedRoute> 
            <WhitelistPage />
          </ProtectedRoute>
        }
        />
      <Route path='/home'
        element={
          <ProtectedRoute> 
            <Home />
          </ProtectedRoute>
        }
        />
        <Route path='adminDashboard'
          element={
            <ProtectedRoute>
              <AdminDashboard  success={undefined} errorProp={undefined}/>
            </ProtectedRoute>
          }
        />
    </Routes>
  );
}

export default App;