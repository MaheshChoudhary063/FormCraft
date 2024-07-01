import React, { useState } from "react";

function ErrorRadios() {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleRadioChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
    setError(false);
  };

  const handleSubmit = () => {
    console.log(value);
  };

  return (
    <div>
      <div role="radiogroup" aria-label="quiz">
        {[0, 1, 2].map((j) => (
          <label key={j} style={{ display: "block", marginBottom: "10px" }}>
            <input
              type="radio"
              name="quiz"
              value={j.toString()}
              checked={value === j.toString()}
              onChange={handleRadioChange}
            />
            {"the worst " + j}
          </label>
        ))}
      </div>

      <button
        style={{
          margin: "8px 8px 0 0",
          padding: "8px",
          border: "1px solid #3f51b5",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={handleSubmit}
      >
        Check Answer
      </button>
    </div>
  );
}

export default ErrorRadios;
