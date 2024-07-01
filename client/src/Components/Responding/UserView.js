import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import formService from "../../Routes/formRoute";
import auth from "../../Routes/authRoute";
import "bootstrap/dist/css/bootstrap.min.css";

function UserView(props) {
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({});
  const [responseData, setResponseData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  const { formId } = useParams();

  useEffect(() => {
    if (auth.isAuthenticated()) {
      const user = auth.getCurrentUser();
      setUserId(user.id);
    } else {
      const anonymousUserId =
        "anonymous" +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      setUserId(anonymousUserId);
    }
  }, []);

  const handleRadioChange = (j, i) => {
    const questionId = questions[i]._id;
    const optionId = questions[i].options[j]._id;

    const data = {
      questionId,
      optionId,
    };

    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [i]: j,
    }));

    const fakeRData = [...responseData];
    const indexOfResponse = fakeRData.findIndex(
      (x) => x.questionId === questionId
    );
    if (indexOfResponse === -1) {
      setResponseData((responseData) => [...responseData, data]);
    } else {
      fakeRData[indexOfResponse].optionId = optionId;
      setResponseData(fakeRData);
    }
  };

  useEffect(() => {
    formService
      .getForm(formId)
      .then((data) => {
        setFormData(data);
        setQuestions(data.questions);
      })
      .catch((error) => {
        console.log("Error fetching form:", error);
      });
  }, [formId]);

  function submitResponse() {
    const submissionData = {
      formId: formData._id,
      userId: userId,
      response: responseData,
    };

    formService
      .submitResponse(submissionData)
      .then((data2) => {
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.log("Error submitting response:", error);
      });
  }

  function reloadForAnotherResponse() {
    window.location.reload(true);
  }

  return (
    <div className=" min-vh-100">
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#003366" }}
      >
        <div className="container">
          <span className="navbar-brand mb-0 h1">FormCraft</span>
        </div>
      </nav>

      <div className="container my-4">
        <div className="border rounded p-4 bg-white shadow-sm mb-4">
          <h1 className="font-weight-bold">{formData.name}</h1>
          <p className="lead">{formData.description}</p>
        </div>

        {!isSubmitted ? (
          <div>
            {questions.map((ques, i) => (
              <div
                key={i}
                className="border rounded p-4 bg-white shadow-sm mb-4"
              >
                <h3 className="mb-3">
                  {i + 1}. {ques.questionText}
                </h3>
                {ques.questionImage && (
                  <img
                    src={ques.questionImage}
                    alt="Question"
                    className="img-fluid mb-3"
                  />
                )}
                <div>
                  {ques.options.map((op, j) => (
                    <div key={j} className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        id={`option-${i}-${j}`}
                        name={`question-${i}`}
                        value={j}
                        checked={selectedOptions[i] === j}
                        onChange={() => handleRadioChange(j, i)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`option-${i}-${j}`}
                      >
                        {op.optionText}
                        {op.optionImage && (
                          <img
                            src={op.optionImage}
                            alt="Option"
                            className="img-fluid ml-2"
                          />
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="text-center">
              <button onClick={submitResponse} className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center bg-white rounded p-4 shadow-sm">
            <p>Form submitted</p>
            <p>Thanks for submitting the form!</p>
            <button
              onClick={reloadForAnotherResponse}
              className="btn btn-primary mt-3"
            >
              Submit another response
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserView;
