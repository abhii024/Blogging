import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/img.jpg"; // Adjust if needed

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("/signup", form)
      .then((res) => {
        alert("Signup Successful");
        navigate("/login");
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Signup failed");
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "98vh",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            color: "#333",
            textAlign: "center",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            width: "350px",
            display: "flex",
            flexDirection: "column",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <h1
            style={{
              fontSize: "2.5em",
              marginBottom: "30px",
              color: "#2c3e50",
            }}
          >
            Sign Up
          </h1>
          <form onSubmit={handleSubmit} style={{ padding: "0 20px" }}>
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="name"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  color: "#2c3e50",
                  textAlign: "left",
                }}
              >
                Name
              </label>
              <input
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  color: "#333",
                  backgroundColor: "#f9f9f9",
                  fontSize: "1em",
                  boxSizing: "border-box",
                }}
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  color: "#2c3e50",
                  textAlign: "left",
                }}
              >
                Email
              </label>
              <input
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  color: "#333",
                  backgroundColor: "#f9f9f9",
                  fontSize: "1em",
                  boxSizing: "border-box",
                }}
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: "30px" }}>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  color: "#2c3e50",
                  textAlign: "left",
                }}
              >
                Password
              </label>
              <input
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  color: "#333",
                  backgroundColor: "#f9f9f9",
                  fontSize: "1em",
                  boxSizing: "border-box",
                }}
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "12px 20px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontSize: "1em",
                transition: "background-color 0.3s ease",
                width: "100%",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
              Sign Up
            </button>
            <div style={{ marginTop: "20px" }}>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "#007bff",
                  fontWeight: "bold",
                  transition: "color 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.color = "#0056b3")}
                onMouseOut={(e) => (e.target.style.color = "#007bff")}
              >
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
