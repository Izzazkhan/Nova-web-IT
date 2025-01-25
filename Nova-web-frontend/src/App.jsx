import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import KYCForm from './pages/KYCForm';
import PrivateRoute from '../utils/PrivateRoute';
import PublicRoute from '../utils/publicRoute';
import Admin from './pages/AdminPage';
import Dashboard from './pages/DashboardPage';
import Unauthorized from './pages/UnauthorizedPage';

function App() {
  return (
      <div>
        <Routes>
          <Route
            path="/login"
            element={<PublicRoute><Login /></PublicRoute>}
          />
          <Route
            path="/signUp"
            element={<PublicRoute><SignUp /></PublicRoute>}
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route 
            path="/" 
            element={
              <HomePage />
            }
          />
          <Route 
            path="/dashboard" 
            element={
              <Dashboard />
            }
          />
          <Route
              path="/kyc"
              element={
              <PrivateRoute requiredRole="User">
                <KYCForm />
              </PrivateRoute>
              }
          />
          <Route
              path="/admin"
              element={
              <PrivateRoute requiredRole="Admin">
                <Admin />
              </PrivateRoute>
              }
          />
        </Routes>
      </div>
  )
}

export default App
