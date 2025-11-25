import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await API.post("/auth/login", form);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setMessage("Login successful. Redirecting...");
        navigate("/dashboard");
      } else {
        setMessage(res.data.message || "Login failed");
      }
    } catch (error) {
      setMessage("Error logging in");
    }
  };

  // Embedded styles
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
    maxWidth: "380px",
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
    background: "#2563eb",
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
        <h1 style={titleStyle}>Login</h1>
        <p style={subtitleStyle}>Access your URL Shortener dashboard</p>

        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>

        {message && <div style={messageStyle}>{message}</div>}

        <div style={footerTextStyle}>
          Do not have an account?{" "}
          <Link to="/register" style={linkStyle}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
