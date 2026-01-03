import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");
    setMessage("");

    if (!name || !age || !phone) {
      setError("All fields are required");
      return;
    }

    try {
      await API.post("/users/register", {
        name,
        age,
        phone,
      });

      setMessage("Registration successful. Redirecting to login...");

      // ✅ redirect after success
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white flex rounded-xl shadow-lg overflow-hidden w-[750px]">
        {/* LEFT IMAGE */}
        <div className="w-1/2 hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
            alt="Hospital"
            className="h-full w-full object-cover"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-4">
            Patient Registration
          </h2>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {message && <p className="text-green-600 text-sm mb-2">{message}</p>}

          <input
            className="w-full border rounded p-2 mb-3"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            className="w-full border rounded p-2 mb-3"
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            className="w-full border rounded p-2 mb-4"
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            onClick={handleRegister}
            className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded"
          >
            Register
          </button>

          {/* ✅ FIXED */}
          <p
            className="text-sm text-center mt-4 text-blue-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Already registered? Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
