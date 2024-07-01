import React, { useState } from "react";

function QuestionsHeader() {
  const [questions, setQuestions] = useState([
    {
      questionText: "Question",
      options: [{ optionText: "option 1" }],
      open: false,
    },
  ]);

  function addMoreQuestionField() {
    expandCloseAll();
    setQuestions((questions) => [
      ...questions,
      {
        questionText: "Question",
        options: [{ optionText: "option 1" }],
        open: true,
      },
    ]);
  }

  function addOption(i) {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length < 5) {
      optionsOfQuestion[i].options.push({ optionText: "option gg" });
    } else {
      console.log("Max 5 options ");
    }
    setQuestions(optionsOfQuestion);
  }

  function removeOption(i, j) {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length > 1) {
      optionsOfQuestion[i].options.splice(j, 1);
      setQuestions(optionsOfQuestion);
      console.log(i + "__" + j);
    }
  }

  function expandCloseAll() {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      qs[j].open = false;
    }
    setQuestions(qs);
  }

  function handleExpand(i) {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      if (i === j) {
        qs[j].open = true;
      } else {
        qs[j].open = false;
      }
    }
    setQuestions(qs);
  }

  function questionsUI() {
    return questions.map((ques, i) => (
      <div key={i}>
        <div style={{ marginBottom: "9px" }}>
          <div style={{ width: "100%" }}>
            {ques.options.map((op, j) => (
              <div
                key={j}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "-13px",
                }}
              >
                <input type="radio" disabled />
                <input
                  type="text"
                  value={op.optionText}
                  style={{ marginTop: "5px" }}
                  onChange={(e) => handleOptionValue(e.target.value, i, j)}
                />
                <button onClick={() => removeOption(i, j)}>Delete</button>
              </div>
            ))}
          </div>

          <button onClick={() => addOption(i)}>Add Option</button>
        </div>
      </div>
    ));
  }

  return (
    <div>
      {questionsUI()}
      <div>
        <button onClick={addMoreQuestionField}>Add question</button>
      </div>
    </div>
  );
}

export default QuestionsHeader;
