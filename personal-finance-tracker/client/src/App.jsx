import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import Goals from "./pages/Goals";
import { useAuth } from './contexts/AuthContext';


function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <AppLayout>
              <Dashboard />
            </AppLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/income"
        element={
          isAuthenticated ? (
            <AppLayout>
              <Income />
            </AppLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/expenses"
        element={
          isAuthenticated ? (
            <AppLayout>
              <Expenses />
            </AppLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/goals"
        element={
          isAuthenticated ? (
            <AppLayout>
              <Goals />
            </AppLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/profile"
        element={
          isAuthenticated ? (
            <AppLayout>
              <Profile />
            </AppLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/analytics"
        element={
          isAuthenticated ? (
            <AppLayout>
              <Analytics />
            </AppLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
