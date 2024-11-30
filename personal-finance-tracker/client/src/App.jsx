import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Profile from "./pages/Profile";

function App() {
  const isAuthenticated = true;

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
        path="/profile"
        element={
          isAuthenticated ? (
            <AppLayout>
              <Profile />
            </AppLayout>
          ) : (
            <Navigate to="/profile" />
          )
        }
      />
      <Route
        path="/analytics"
        element={
          isAuthenticated ? <AppLayout></AppLayout> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}

export default App;
