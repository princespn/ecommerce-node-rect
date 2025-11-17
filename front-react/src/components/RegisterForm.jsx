import React, { useState } from "react";
import { register } from "../api/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect path (if coming from checkout/order)
  const redirectPath = location.state?.from || "/order";

  const [formData, setFormData] = useState({
    fullname: "",
    mobile: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (formData.password !== formData.confirm_password) {
      setErrorMsg("Passwords do not match!");
      return;
    }

    if (formData.mobile.length !== 10) {
      setErrorMsg("Mobile number must be 10 digits.");
      return;
    }

    setLoading(true);

    try {
      await register(formData);

      // Redirect to login page and pass the return path
      navigate("/login", { state: { from: redirectPath } });

    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow">

        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        {/* Error Message */}
        {errorMsg && (
          <p className="bg-red-100 text-red-600 text-center p-2 rounded mb-4">
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full border px-3 py-3 rounded focus:outline-blue-500"
            required
          />

          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number (10 digits)"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full border px-3 py-3 rounded focus:outline-blue-500"
            maxLength={10}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-3 rounded focus:outline-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-3 rounded focus:outline-blue-500"
            required
          />

          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full border px-3 py-3 rounded focus:outline-blue-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded text-white font-medium 
              ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm mt-4 text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            state={{ from: redirectPath }}
            className="text-blue-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>

      </div>
    </section>
  );
};

export default RegisterForm;
