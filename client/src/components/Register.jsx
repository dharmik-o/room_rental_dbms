import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css"
export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    dob: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", formData);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
      <select name="gender" onChange={handleChange}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input type="date" name="dob" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <select name="role" onChange={handleChange}>
        <option value="user">User</option>
        <option value="owner">Owner</option>
      </select>
      { formData.role === "owner" &&(
      <>
      <input type="number" name="owner_contact" placeholder="Contact" onChange={handleChange} required />
      <input type="email" name="email" placeholder="E-mail" onChange={handleChange} required />
      </>
    )}
      <button type="submit">Register</button>
    </form>
  );
}