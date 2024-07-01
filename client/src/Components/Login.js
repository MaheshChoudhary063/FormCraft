import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authRoute from "../Routes/authRoute";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    authRoute.login({ email, name }).then(
      (response) => {
        navigate("/");
      },
      (error) => {
        setError("Failed to login. Please check your credentials.");
      }
    );
  };

  function loginClick() {
    navigate("/login");
  }

    function homeClick() {
      navigate("/");
    }

  return (
    <div className="landing-page d-flex flex-column min-vh-100">
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#003366" }}
      >
        <div className="container">
          <div className="navbar-brand d-flex align-items-center">
            <span className="me-2 fs-3">📄</span>
            <h4 className="mb-0" onClick={homeClick}>
              FormCraft
            </h4>
          </div>
          <div className="ms-auto">
            <button className="btn btn-light" onClick={loginClick}>
              Login
            </button>
            <button className="btn btn-light ms-2" onClick={loginClick}>
              Register
            </button>
          </div>
        </div>
      </nav>

      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
