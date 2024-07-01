import React, { useState, useEffect } from "react";
import auth from "../Routes/authRoute";
import Forms from "./Form/Forms";
import { useNavigate } from "react-router-dom";
import formService from "../Routes/formRoute";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    setUser(currentUser);
    console.log("Current User:", currentUser);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    const logoutConfirmation = window.confirm("Really want to logout?");
    if (logoutConfirmation) {
      auth.logout();
      navigate("/login");
    }
  };

  const cancelAddForm = () => {
    handleClose();
    setFormTitle("");
    setFormDescription("");
  };

  const createForm = () => {
    const data = {
      name: formTitle,
      description: formDescription,
      createdBy: user.id,
    };
    if (data.name !== "") {
      formService.createForm(data).then(
        (result) => {
          navigate("/form/" + result._id);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  return (
    <div className="dashboard">
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#003366" }}
      >
        <div className="container-fluid">
          <h1 className="navbar-brand mb-0">FormCraft</h1>
          <div className="d-flex ms-auto">
            <button className="btn btn-success me-2" onClick={handleClickOpen}>
              Create
            </button>
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search…" />
        </div>
        {open && (
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create Form</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleClose}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    Creating a new empty form, just add form name and
                    description if you want.
                  </p>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Form Name"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Form Description"
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={cancelAddForm}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={createForm}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="forms-container mt-4">
          <Forms userId={user.id} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
