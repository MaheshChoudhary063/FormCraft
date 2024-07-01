import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import formService from "../../Routes/formRoute";
import auth from "../../Routes/authRoute";
import QuestionsTab from "./QuestionTab";
import ResponseTab from "../Response/ResponseTab";
import "bootstrap/dist/css/bootstrap.min.css";

function EditForm() {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [formDetails, setFormDetails] = useState({});
  const [openOfAlert, setOpenOfAlert] = useState(false);
  const navigate = useNavigate();

  const { formId } = useParams();

  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);

  useEffect(() => {
    if (formId) {
      formService.getForm(formId).then(
        (data) => {
          setFormDetails(data);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(resMessage);
        }
      );
    }
  }, [formId]);

  const clipToClipboard = () => {
    navigator.clipboard.writeText(
      window.location.origin + "/s/" + formDetails._id
    );
    handleClickOfAlert();
    handleClose();
  };

  const handleClickOfAlert = () => {
    setOpenOfAlert(true);
  };

  const handleCloseOfAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenOfAlert(false);
  };

  const sendForm = () => {
    handleClickOpen();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="landing-page d-flex flex-column min-vh-100">
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#003366", marginBottom: "20px" }}
      >
        <div className="container-fluid">
          <h2
            className="navbar-brand btn btn-outline-secondary me-3"
            onClick={() => navigate("/")}
          >
            FormCraft
          </h2>
          {/* <h1 className="flex-grow-1 mb-0">{formDetails.name}</h1> */}
          <button className="btn btn-primary me-3" onClick={sendForm}>
            Send
          </button>
        </div>
      </nav>

      {formDetails.createdBy === user.id ? (
        <div>
          <div className="d-flex justify-content-center mb-4">
            <button
              className={`btn btn-outline-primary me-2 ${
                value === 0 ? "active" : ""
              }`}
              onClick={(e) => handleChange(e, 0)}
            >
              Questions
            </button>
            <button
              className={`btn btn-outline-primary ${
                value === 1 ? "active" : ""
              }`}
              onClick={(e) => handleChange(e, 1)}
            >
              Responses
            </button>
          </div>

          <div>
            <Dialog open={open} onClose={handleClose}>
              <h2 className="mb-3">Copy and share link</h2>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>{window.location.origin + "/s/" + formDetails._id}</span>
                <button
                  className="btn btn-outline-secondary"
                  onClick={clipToClipboard}
                >
                  Copy
                </button>
              </div>
              <button className="btn btn-secondary" onClick={handleClose}>
                Cancel
              </button>
            </Dialog>

            {openOfAlert && (
              <div
                className="position-fixed bottom-0 start-0 bg-light p-2 mb-2"
                style={{ left: "16px", bottom: "16px", zIndex: 1000 }}
              >
                Copied to clipboard
                <button className="btn btn-link" onClick={handleCloseOfAlert}>
                  Close
                </button>
              </div>
            )}
          </div>

          <div>
            <TabPanel value={value} index={0}>
              <QuestionsTab formData={formDetails} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ResponseTab formData={formDetails} formId={formId} />
            </TabPanel>
          </div>
        </div>
      ) : (
        <p>You're not the owner of the form</p>
      )}
    </div>
  );
}

export default EditForm;

function Dialog({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1050,
      }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
