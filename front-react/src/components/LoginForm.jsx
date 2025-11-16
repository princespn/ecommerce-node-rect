import React, { useState } from "react";
import { login } from "../api/auth"; 
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login(formData);
      alert("Login Successful!");
      console.log("✅ User Data:", res);

      // Example: store token if backend returns one
      if (res.token) {
        localStorage.setItem("token", res.token);
      }

      navigate("/"); // redirect to home after login success
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <h3 className="text-xl font-bold text-center mb-2">Login</h3>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />

      {error && <div className="text-red-600 text-center">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
