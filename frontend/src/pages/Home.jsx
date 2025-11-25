import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [message, setMessage] = useState("");

  const shortenUrl = async (e) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please login to shorten URLs.");
      return;
    }

    try {
      const res = await API.post("/url/shorten", { originalUrl: url });

      if (res.data.shortUrl) {
        setShortUrl(res.data.shortUrl);
        setMessage("URL shortened successfully!");
        setUrl("");
      }
    } catch (err) {
      setMessage("Something went wrong.");
    }
  };

  const container = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#111",
    color: "white",
    flexDirection: "column",
    fontFamily: "Arial"
  };

  const card = {
    background: "#1f1f1f",
    padding: "32px",
    borderRadius: "12px",
    width: "420px",
    boxShadow: "0 0 20px rgba(255,255,255,0.1)"
  };

  const input = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #555",
    background: "#2b2b2b",
    color: "white",
    marginBottom: "16px"
  };

  const button = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    background: "#2563eb",
    color: "white",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer"
  };

  const link = {
    color: "#60a5fa",
    textDecoration: "none",
    marginTop: "12px",
    display: "inline-block"
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>URL Shortener</h2>
        <p>Shorten your long URLs instantly.</p>

        <form onSubmit={shortenUrl}>
          <input
            style={input}
            type="url"
            placeholder="Enter URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button style={button} type="submit">
            Shorten
          </button>
        </form>

        {message && <p style={{ marginTop: "12px" }}>{message}</p>}

        {shortUrl && (
          <p style={{ marginTop: "12px" }}>
            Short URL:{" "}
            <a href={shortUrl} target="_blank" style={{ color: "#4ade80" }}>
              {shortUrl}
            </a>
          </p>
        )}

        <div style={{ marginTop: "20px" }}>
          <Link to="/login" style={link}>Login</Link> |{" "}
          <Link to="/register" style={link}>Register</Link> |{" "}
          <Link to="/dashboard" style={link}>Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
