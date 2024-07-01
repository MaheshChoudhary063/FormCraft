import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../../Routes/authRoute";
import formService from "../../Routes/formRoute";
import OneForm from "../Form/OneForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Forms.css";

function Forms(props) {
  const [user, setUser] = useState({});
  const [forms, setForms] = useState([]);
  const [loadingForms, setLoadingForms] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    } else {
      setError("No user logged in");
    }
  }, []);

  useEffect(() => {
    if (props.userId) {
      formService.getForms(props.userId).then(
        (formsData) => {
          setForms(formsData);
          setLoadingForms(false);
        },
        (error) => {
          const errorMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setError(errorMessage);
        }
      );
    } else {
      setLoadingForms(false);
    }
  }, [props.userId]);

  const handleFormClick = (formData) => {
    if (!user.id) {
      setError("No user logged in");
      return;
    }

    if (formData.ownerId === user.id) {
      setError("");
      navigate(`/form/${formData.id}`);
    } else {
      setError("You're not the owner of the form");
    }
  };

  return (
    <div className="container mt-5">
      {loadingForms ? <div className="loader">Loading...</div> : ""}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {forms.map((form, i) => (
          <div className="col-lg-4 col-md-6 mb-4" key={i}>
            <div className="card h-100" onClick={() => handleFormClick(form)}>
              <OneForm formData={form} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forms;
