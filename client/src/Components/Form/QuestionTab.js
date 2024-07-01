import React, { useState, useEffect } from "react";
import formService from "../../Routes/formRoute";
import "bootstrap/dist/css/bootstrap.min.css";

function QuestionsTab(props) {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({});
  const [loadingFormData, setLoadingFormData] = useState(true);

  useEffect(() => {
    console.log("useEffect - props.formData:", props.formData);
    if (props.formData.questions !== undefined) {
      if (props.formData.questions.length === 0) {
        setQuestions([
          {
            questionText: "Question",
            options: [{ optionText: "Option 1" }],
            open: false,
          },
        ]);
      } else {
        setQuestions(props.formData.questions);
      }
      setLoadingFormData(false);
    }
    setFormData(props.formData);
  }, [props.formData]);

  const saveQuestions = () => {
    const data = {
      formId: formData._id,
      name: formData.name,
      description: formData.description,
      questions: questions,
    };
    formService
      .autoSave(data)
      .then((result) => {
        setQuestions(result.questions);
        alert("Questions saved successfully!");
      })
      .catch((error) => console.log(error.message || error.toString()));
  };

  const addNewQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        questionText: "New Question",
        options: [{ optionText: "Option 1" }],
        open: false,
      },
    ]);
  };

  const addMoreOptionField = (i) => {
    const updatedQuestions = questions.map((question, index) => {
      if (index === i) {
        return {
          ...question,
          options: [
            ...question.options,
            { optionText: `Option ${question.options.length + 1}` },
          ],
        };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const copyQuestion = (i) => {
    const copiedQuestion = {
      questionText: questions[i].questionText,
      options: questions[i].options.map((op) => ({ ...op })), // Ensure deep copy of options
      open: true,
    };
    setQuestions((prevQuestions) => [...prevQuestions, copiedQuestion]);
  };

  const deleteQuestion = (i) => {
    if (questions.length > 1) {
      setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions.splice(i, 1);
        return updatedQuestions;
      });
    }
  };

  function handleOptionValue(text, i, j) {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].options[j].optionText = text;
    setQuestions(optionsOfQuestion);
  }

  function handleQuestionValue(text, i) {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].questionText = text;
    setQuestions(optionsOfQuestion);
  }

  const expandCloseAll = () => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions.forEach((q) => (q.open = false));
      return updatedQuestions;
    });
  };

  const handleExpand = (i) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, index) => ({
        ...q,
        open: i === index,
      }))
    );
  };

  const questionsUI = () => {
    return questions.map((ques, i) => (
      <div key={i} className="card mb-3">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>
            {i + 1}. {ques.questionText}
          </span>
          <div>
            <button
              className="btn btn-sm btn-outline-secondary me-2"
              onClick={() => handleExpand(i)}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-outline-danger me-2"
              onClick={() => deleteQuestion(i)}
            >
              Delete
            </button>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => copyQuestion(i)}
            >
              Copy
            </button>
          </div>
        </div>
        {ques.open && (
          <div className="card-body">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={ques.questionText}
                onChange={(e) => handleQuestionValue(e.target.value, i)}
              />
            </div>
            <div>
              {ques.options.map((op, j) => (
                <div key={j} className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    value={op.optionText}
                    onChange={(e) => handleOptionValue(e.target.value, i, j)}
                  />
                </div>
              ))}
            </div>
            <button
              className="btn btn-outline-secondary"
              onClick={() => addMoreOptionField(i)}
            >
              Add Option
            </button>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <h2>{formData.name}</h2>
        <p>{formData.description}</p>
      </div>
      {loadingFormData ? <div>Loading...</div> : <div>{questionsUI()}</div>}
      <div className="mt-4">
        <button className="btn btn-primary me-2" onClick={addNewQuestion}>
          Add New Question
        </button>
        <button className="btn btn-success" onClick={saveQuestions}>
          Save Questions
        </button>
      </div>
    </div>
  );
}

export default QuestionsTab;
