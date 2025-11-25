import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await API.post("/auth/register", form);
      if (res.data.user) {
        setMessage("Registered successfully. Redirecting to login...");
        navigate("/login");
      } else {
        setMessage(res.data.message || "Registration failed");
      }
    } catch (error) {
      setMessage("Error registering user");
    }
  };

  // Embedded styles (same style system as Login)
  const containerStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
    fontFamily: "Arial, sans-serif",
  };

  const cardStyle = {
    background: "#ffffff",
    padding: "32px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: "400px",
  };

  const titleStyle = {
    marginBottom: "8px",
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
  };

  const subtitleStyle = {
    marginBottom: "24px",
    fontSize: "14px",
    color: "#666",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "none",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    background: "#16a34a",
    color: "#ffffff",
    marginTop: "4px",
  };

  const footerTextStyle = {
    marginTop: "14px",
    fontSize: "13px",
    textAlign: "center",
  };

  const linkStyle = {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "500",
  };

  const messageStyle = {
    marginTop: "10px",
    fontSize: "13px",
    textAlign: "center",
    color: "#b91c1c",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Register</h1>
        <p style={subtitleStyle}>Create an account for URL Shortener</p>

        <form onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            style={inputStyle}
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            style={inputStyle}
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" style={buttonStyle}>
            Register
          </button>
        </form>

        {message && <div style={messageStyle}>{message}</div>}

        <div style={footerTextStyle}>
          Already have an account?{" "}
          <Link to="/login" style={linkStyle}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
