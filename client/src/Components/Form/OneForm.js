import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function OneForm(props) {
  const [form, setForm] = useState({});

  useEffect(() => {
    setForm(props.formData);
  }, [props.formData]);

  return (
    <div className="card h-100">
      <Link to={`/form/${form._id}`} className="stretched-link"></Link>
      <div className="card-body">
        <h5 className="card-title">{form.name}</h5>
        <p className="card-text">{form.description}</p>
        <p className="card-text">
          Created: {new Date(form.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
