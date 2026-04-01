import React, { useState } from "react";
import "./Onboarding.css";

// Added { userEmail, onComplete } as props
function Onboarding({ userEmail, onComplete }) {
  const [formData, setFormData] = useState({
    email: userEmail, // Ensure email is part of the form data
    name: "",
    college: "",
    year: "",
    degree: "",
    skills: "",
    experience_level: "",
    domain: "",
    github: "",
    linkedin: "",
    projects: "",
    coding: 1,
    debugging: 1,
    problem_solving: 1,
    learning_style: "",
    daily_hours: "",
    goal: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      
      if (res.ok) {
        alert(data.message);
        // This is the trigger that tells App.js to switch to the Assessment page
        onComplete(); 
      } else {
        alert("Failed to save profile: " + data.message);
      }
    } catch (error) {
      console.error("Error during onboarding:", error);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="container">
      <h1>🚀 SkillFutureAI Onboarding</h1>
      <p style={{ textAlign: "center", color: "#eee" }}>Setting up profile for: {userEmail}</p>

      <div className="card">

        <h3>👤 Basic Info</h3>
        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <input name="college" placeholder="College" onChange={handleChange} />
        <input name="degree" placeholder="Degree (BTech, MCA...)" onChange={handleChange} />
        <input name="year" placeholder="Year (1st/2nd/3rd/Passout)" onChange={handleChange} />

        <h3>💻 Skills & Experience</h3>
        <input name="skills" placeholder="Skills (Python, JS...)" onChange={handleChange} />
        
        <select name="experience_level" onChange={handleChange}>
          <option value="">Select Experience Level</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <textarea name="projects" placeholder="Describe your projects..." onChange={handleChange} />

        <h3>🎯 Career Goal</h3>
        <select name="domain" onChange={handleChange}>
          <option value="">Select Domain</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Full Stack</option>
          <option>AI/ML</option>
        </select>

        <input name="goal" placeholder="Your goal (Job, Internship...)" onChange={handleChange} />

        <h3>🔗 Profiles</h3>
        <input name="github" placeholder="GitHub Link" onChange={handleChange} />
        <input name="linkedin" placeholder="LinkedIn Link" onChange={handleChange} />

        <h3>🧠 Self Rating</h3>
        <label>Coding (1-5)</label>
        <input type="number" name="coding" min="1" max="5" onChange={handleChange} />

        <label>Debugging (1-5)</label>
        <input type="number" name="debugging" min="1" max="5" onChange={handleChange} />

        <label>Problem Solving (1-5)</label>
        <input type="number" name="problem_solving" min="1" max="5" onChange={handleChange} />

        <h3>⚡ Learning Behavior</h3>
        <select name="learning_style" onChange={handleChange}>
          <option value="">Preferred Learning Style</option>
          <option>Video</option>
          <option>Practice</option>
          <option>Reading</option>
        </select>

        <select name="daily_hours" onChange={handleChange}>
          <option value="">Daily Study Time</option>
          <option>1-2 hours</option>
          <option>3-5 hours</option>
          <option>5+ hours</option>
        </select>

        <button onClick={handleSubmit}>Submit Profile</button>

      </div>
    </div>
  );
}

export default Onboarding;