import { useState } from "react";
import API from "../services/api";

const Admin = ({ user, onLogout }) => {
  const [department, setDepartment] = useState("");
  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState(null);
  const [error, setError] = useState("");

  const loadQueue = async () => {
    console.log("LOAD QUEUE CLICKED:", department);

    try {
      const res = await API.get(`/admin/queue/${department}`);
      console.log("ADMIN RESPONSE:", res.data);
      setQueue(res.data.queue);
    } catch (err) {
      console.error("FRONTEND ERROR:", err);
    }
  };


  const callNext = async () => {
    if (!department) {
      setError("Please select a department");
      return;
    }

    try {
      const res = await API.get(`/admin/call-next/${department}`);
      setCurrent(res.data.token);
      loadQueue();
      setError("");
    } catch {
      setError("No waiting patients");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>

        <select
          className="w-full border p-2 rounded mb-3"
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
            setQueue([]);
            setCurrent(null);
            setError("");
          }}
        >
          <option value="">Select Department</option>
          <option value="General">General</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Orthopedics">Orthopedics</option>
        </select>

        <div className="flex gap-3 mb-4">
          <button
            onClick={loadQueue}
            disabled={!department}
            className={`w-1/2 p-2 rounded text-white ${
              department ? "bg-blue-600" : "bg-gray-400"
            }`}
          >
            Load Queue
          </button>

          <button
            onClick={callNext}
            disabled={!department}
            className={`w-1/2 p-2 rounded text-white ${
              department ? "bg-green-600" : "bg-gray-400"
            }`}
          >
            Call Next
          </button>
        </div>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        {current && (
          <div className="border p-3 rounded mb-4 bg-green-50">
            <b>Now Calling:</b> Token {current.tokenNumber} —{" "}
            {current.patient.name}
          </div>
        )}

        <ul>
          {queue.map((q) => (
            <li key={q._id} className="flex justify-between border-b py-2">
              <span>
                Token {q.tokenNumber} — {q.patient.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
