import React from "react";

function ErrorPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <div>
        <h1>Error</h1>
        <p>Something went wrong. Please try again later.</p>
      </div>
    </div>
  );
}

export default ErrorPage;
