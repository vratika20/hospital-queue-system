import { useState } from "react";
import API from "../services/api";

function Patient({ user, onLogout }) {
  const [department, setDepartment] = useState("");
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");

  const generateToken = async () => {
    if (!department) {
      setError("Please select a department");
      return;
    }

    try {
      const res = await API.post("/token/generate", {
        patientId: user._id,
        department,
      });
      setToken(res.data.token);
      setError("");
    } catch {
      setError("Token generation failed");
    }
  };

  return (
    /* 🔹 FULL SCREEN CENTER WRAPPER */
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* CARD */}
      <div className="bg-white w-[420px] p-6 rounded-xl shadow-lg">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Welcome {user.name}</h2>
          <button
            onClick={onLogout}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>

        {/* SELECT */}
        <select
          className="w-full border p-2 rounded mb-4"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          <option value="General">General</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Orthopedics">Orthopedics</option>
        </select>

        {/* BUTTON */}
        <button
          onClick={generateToken}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Generate Token
        </button>

        {/* ERROR */}
        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

        {/* TOKEN INFO */}
        {token && (
          <div className="mt-4 border p-3 rounded bg-gray-50">
            <p>
              <b>Department:</b> {token.department}
            </p>
            <p>
              <b>Token:</b> {token.tokenNumber}
            </p>
            <p>
              <b>Status:</b> {token.status}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Patient;
