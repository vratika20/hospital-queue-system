import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Patient from "./pages/Patient";
import Admin from "./pages/Admin";

function App() {
  const [user, setUser] = useState(null);

  // logout handler
  const logout = () => {
    setUser(null);
  };

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Login setUser={setUser} />} />
      <Route path="/register" element={<Register />} />

      {/* PATIENT ROUTE */}
      <Route
        path="/patient"
        element={
          user && user.role === "PATIENT" ? (
            <Patient user={user} onLogout={logout} />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* ADMIN ROUTE */}
      <Route
        path="/admin"
        element={
          user && user.role === "ADMIN" ? (
            <Admin user={user} onLogout={logout} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}

export default App;
