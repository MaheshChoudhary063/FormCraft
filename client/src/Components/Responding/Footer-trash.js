import React from "react";

function Copyright() {
  return (
    <p style={{ fontSize: "0.875rem", color: "rgba(0, 0, 0, 0.54)" }}>
      {"Copyright © "}
      <a
        href="https://material-ui.com/"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        Your Website
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </p>
  );
}

function StickyFooter() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <footer
        style={{
          padding: "8px 16px",
          marginTop: "auto",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <p style={{ fontSize: "1rem", marginBottom: "8px" }}>
            My sticky footer can be found here.
          </p>
          <Copyright />
        </div>
      </footer>
    </div>
  );
}

export default StickyFooter;
