import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [originalUrl, setOriginalUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch URLs on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    fetchUrls();
  }, [navigate]);

  const fetchUrls = async () => {
    try {
      const res = await API.get("/url/all");
      setUrls(res.data);
    } catch (err) {
      console.log("Fetch error:", err.response ? err.response.data : err);
    }
  };

  // Shorten URL
  const handleShorten = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await API.post("/url/shorten", { originalUrl });
      setMessage("URL shortened successfully");
      setOriginalUrl("");
      fetchUrls();
    } catch (error) {
      setMessage("Failed to shorten URL");
    }
  };

  // Delete URL
  const handleDelete = async (id) => {
    try {
      await API.delete(`/url/${id}`);
      fetchUrls();   // refresh list
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h2>Dashboard</h2>

      {/* Shorten Form */}
      <form
        onSubmit={handleShorten}
        style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
      >
        <input
          type="text"
          placeholder="Enter long URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
          required
        />
        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Shorten
        </button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}

      {/* URL List */}
      <div style={{ marginTop: "20px" }}>
        <h3>Your URLs</h3>

        {urls.length === 0 ? (
          <p>No URLs created yet.</p>
        ) : (
          urls.map((item) => (
            <div
              key={item._id}
              style={{
                padding: "15px",
                borderBottom: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p>
                  <strong>Original:</strong> {item.originalUrl}
                </p>

                <p>
                  <strong>Short:</strong>{" "}
                  <a
                    href={`http://localhost:5000/${item.shortId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    http://localhost:5000/{item.shortId}
                  </a>
                </p>

                <p>Clicks: {item.clicks}</p>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(item._id)}
                style={{
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  height: "40px",
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
