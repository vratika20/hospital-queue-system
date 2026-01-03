import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login({ setUser }) {
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const res = await API.post("/auth/login", { phone });

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      if (res.data.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/patient");
      }
    } catch {
      setMsg("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[350px]">
        <h2 className="text-2xl font-bold text-center mb-6">Patient Login</h2>

        <input
          className="w-full border p-2 rounded mb-4"
          placeholder="Phone Number"
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={loginUser}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>

        {msg && <p className="text-red-500 text-center mt-3">{msg}</p>}

        <p
          className="text-sm text-center mt-4 text-blue-600 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          New patient? Register here
        </p>
      </div>
    </div>
  );
}

export default Login;
