import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";

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
        path="/analytics"
        element={
          isAuthenticated ? <AppLayout></AppLayout> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}

export default App;
