import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css"
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    dob: "",
    password: "",
    role: "user", // Default role is 'user'
    contact_number: "", // Additional field for owner
    email: "", // Additional field for owner
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);

      // Store user_id in localStorage
      localStorage.setItem("user_id", response.data.user_id);
      localStorage.setItem("role", formData.role);
      localStorage.setItem("username",formData.name)
      // Navigate to the appropriate dashboard
      if (formData.role === "owner") {
        navigate("/owner");
      } else {
        navigate("/user");
      }
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        required
      />
      <select name="gender" value={formData.gender} onChange={handleChange} required>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <select name="role" value={formData.role} onChange={handleChange} required>
        <option value="user">User</option>
        <option value="owner">Owner</option>
      </select>

      {/* Additional fields for owner */}
      {formData.role === "owner" && (
        <>
          <input
            type="text"
            name="contact_number"
            placeholder="Contact Number"
            value={formData.contact_number}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </>
      )}

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
