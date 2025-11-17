import React, { useState } from "react";
import { login } from "../api/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path (if coming from checkout)
  const redirectPath = location.state?.from || "/order";

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

      // Store auth data
      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
      }
      if (res.token) {
        localStorage.setItem("token", res.token);
      }

      // Redirect to previous or order page
      navigate(redirectPath, { replace: true });

    } catch (err) {
      setError(err.response?.data?.message || "Invalid Email or Password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow">

        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded focus:outline-blue-500"
              placeholder="Enter email"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-3 rounded focus:outline-blue-500"
              placeholder="Enter password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded text-white 
              ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center mt-4 text-gray-700">
          Don't have an account?{" "}
          <Link
            to="/register"
            state={{ from: redirectPath }}
            className="text-blue-600 font-semibold"
          >
            Register Now
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginForm;
