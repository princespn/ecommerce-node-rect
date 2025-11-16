import React, { useState } from "react";
import { register } from "../api/auth"; // ✅ your function file
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    mobile: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await register(formData);
      alert("Registration Successful!");
      console.log(res);
      navigate("/login"); // redirect after register success
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <h3 className="text-xl font-bold text-center mb-2">Register</h3>

      <input
        type="text"
        name="fullname"
        placeholder="Full Name"
        value={formData.fullname}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        type="tel"
        name="mobile"
        placeholder="Mobile Number"
        value={formData.mobile}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        pattern="[0-9]{10}"
        title="Enter valid 10-digit number"
        required
      />

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

      <input
        type="password"
        name="confirm_password"
        placeholder="Confirm Password"
        value={formData.confirm_password}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <button
        type="submit"
        className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
