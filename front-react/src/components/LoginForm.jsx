import React, { useState } from "react";
import { login } from "../api/auth";
import { useNavigate, useLocation } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // If user came from checkout page → return there after login
  const redirectPath = location.state?.from || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login(formData);

      // Save User + Token
      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
      }
      if (res.token) {
        localStorage.setItem("token", res.token);
      }

      alert("Login Successful!");

      // Redirect after login
      navigate(redirectPath);

    } catch (err) {
      setError(err.response?.data?.message || "Invalid Email or Password!");
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

      {/* Registration Link */}
      <p className="text-center text-sm mt-2">
        Don't have an account?{" "}
        <span
          onClick={() =>
            navigate("/register", { state: { from: redirectPath } })
          }
          className="text-blue-600 font-medium cursor-pointer hover:underline"
        >
          Register here
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
