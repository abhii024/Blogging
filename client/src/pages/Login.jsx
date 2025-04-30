

import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/img.jpg"; // Adjust the path as necessary
function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post(`/login`, form)
      .then((res) => {
        alert("Login Successful");
        localStorage.setItem("token", res.data.token);
        // Optional redirect
        navigate("/home");
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Login failed");
      });
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "98vh",
          // backgroundImage: "url('../assets/image.jpg')", /* Adjust the path as necessary */
          backgroundImage: `url(${image})` /* Use the imported image */,
          backgroundSize: "cover" /* Cover the entire background */,
          fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.2)", // semi-transparent white
            backdropFilter: "blur(10px)", // blur effect
            WebkitBackdropFilter: "blur(10px)", // Safari support
            color: "#333",
            textAlign: "center",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            width: "350px",
            display: "flex",
            flexDirection: "column",
            border: "1px solid rgba(255, 255, 255, 0.3)", // subtle border
          }}
        >
          <h1
            style={{
              fontSize: "2.5em",
              marginBottom: "30px",
              color: "#2c3e50",
            }}
          >
            Login
          </h1>
          <form onSubmit={handleSubmit} style={{ padding: "0 20px" }}>
            <div style={{ marginBottom: "25px" }}>
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
              Log In
            </button>
            <div style={{ marginTop: "20px" }}>
              <Link
                to="/signup"
                style={{
                  textDecoration: "none",
                  color: "#007bff",
                  fontWeight: "bold",
                  transition: "color 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.color = "#0056b3")}
                onMouseOut={(e) => (e.target.style.color = "#007bff")}
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
// <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">