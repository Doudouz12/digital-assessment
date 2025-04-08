import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    size: "",
    industry: "",
    budget: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sessionId = uuidv4();
    localStorage.setItem("profile", JSON.stringify(formData));
    localStorage.setItem("sessionId", sessionId);
    navigate("/assessment");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="text" name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="text" name="size" placeholder="Company Size" value={formData.size} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="text" name="industry" placeholder="Industry" value={formData.industry} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="text" name="budget" placeholder="IT Budget (optional)" value={formData.budget} onChange={handleChange} className="w-full p-2 border rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Start Assessment</button>
    </form>
  );
};

export default ProfileForm;
