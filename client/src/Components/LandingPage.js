import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "../assests/image.jpg";
import Excel from "../assests/Excel-35.jpg";

export default function LandingPage() {
  let navigate = useNavigate();

  function loginClick() {
    navigate("/login");
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
            <h4 className="mb-0">FormCraft</h4>
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

      <main className="flex-grow-1">
        <div className="container text-center my-5">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <img src={Image} alt="FormCraft" className="img-fluid" />
            </div>
            <div className="col-md-6">
              <h1>FormCraft</h1>
              <p className="lead">
                Collect better data and make better decisions.
              </p>
              <button
                className="btn btn-primary me-3"
                onClick={() => navigate("/login")}
              >
                Try for Free
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={loginClick}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

        <div className="container text-center my-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2>Enhanced Data Collection</h2>
              <p>
                With FormCraft, streamline your data collection process, and
                gain insights like never before. Our tools are designed to help
                you collect, analyze, and act on data quickly and efficiently.
              </p>
              <button
                className="btn btn-primary"
                
              >
                Explore Features
              </button>
            </div>
            <div className="col-md-6">
              <img src={Excel} alt="Excel Data" className="img-fluid" />
            </div>
          </div>
        </div>

        <div
          className="container text-center my-5"
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>Learn more about FormCraft</h2>
          <div className="row">
            <div className="col-md-4">
              <div
                className="p-3"
                style={{ backgroundColor: "#e9ecef", borderRadius: "10px" }}
              >
                <h3>Business</h3>
                <p>Learn more</p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="p-3"
                style={{ backgroundColor: "#e9ecef", borderRadius: "10px" }}
              >
                <h3>Home</h3>
                <p>Learn more</p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="p-3"
                style={{ backgroundColor: "#e9ecef", borderRadius: "10px" }}
              >
                <h3>Education</h3>
                <p>Learn more</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="container text-center my-5"
          style={{
            backgroundColor: "#d1ecf1",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>Get started with Forms</h2>
          <button className="btn btn-primary me-3" onClick={loginClick}>
            Sign in
          </button>
          <button className="btn btn-outline-secondary" onClick={loginClick}>
            Try it now
          </button>
        </div>
      </main>

      <footer className="bg-dark text-white py-4 mt-auto">
        <div className="container text-center">
          <h6>
            FormCraft <small>(clone of Google Forms)</small>
          </h6>
          <p>
            This project is{" "}
            <a
              href="https://github.com/maheshchoudhary063"
              className="text-white"
            >
              Github link
            </a>
            . Feel free to use anything that you find helpful, give credit if
            you want.
          </p>
          <div className="text-center py-3">
            <a href="https://port-folio-liard-eight.vercel.app/">
              maheshchoudhary063
            </a>{" "}
            ©<a href="https://github.com/maheshchoudhary063"> GitHub</a>{" "}
            {new Date().getFullYear()}.
          </div>
        </div>
      </footer>
    </div>
  );
}
