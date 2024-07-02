import React, { useEffect, useState } from "react";
import formService from "../../Routes/formRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import * as XLSX from "xlsx";

function ResponseTab(props) {
  const [formData, setFormData] = useState({});
  const [responseData, setResponseData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    if (props.formData) {
      setQuestions(props.formData.questions);
      setFormData(props.formData);
    }
    const formId = props.formId;
    if (formId !== undefined && formId !== "") {
      formService.getResponse(formId).then(
        (data) => {
          setResponseData(data);
          fetchUserNames(data.map(d => d.userId));
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
  }, [props.formId, props.formData]);

  const fetchUserNames = (userIds) => {
    const fetchedUserNames = userIds.reduce((acc, id) => {
      acc[id] = `User_${id}`; 
      return acc;
    }, {});
    setUserNames(fetchedUserNames);
  };

  function getUserName(userId) {
    return userNames[userId] || userId;
  }

  function getSelectedOption(qId, i, j) {
    const oneResData = responseData[j];
    if (oneResData && oneResData.response) {
      const selectedOp = oneResData.response.filter(
        (qss) => qss.questionId === qId
      );
      if (selectedOp.length > 0) {
        const finalOption = questions[i].options.find(
          (oo) => oo._id === selectedOp[0].optionId
        );
        return finalOption ? finalOption.optionText : "not attempted";
      }
    }
    return "not attempted";
  }

  function exportToExcel() {
    const exportData = responseData.map((rs, j) => {
      const row = { User: getUserName(rs.userId) };
      questions.forEach((ques, i) => {
        row[ques.questionText] = getSelectedOption(ques._id, i, j);
      });
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Responses");
    XLSX.writeFile(workbook, "responses.xlsx");
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Responses</h2>
      <button className="btn btn-success mb-3" onClick={exportToExcel}>
        Export to Excel
      </button>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-light">
            <tr>
              <th>User</th>
              {questions.map((ques, i) => (
                <th key={i} className="text-right">
                  {ques.questionText}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {responseData.map((rs, j) => (
              <tr key={j}>
                <td>{getUserName(rs.userId)}</td>
                {questions.map((ques, i) => (
                  <td key={i} className="text-right">
                    {getSelectedOption(ques._id, i, j)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResponseTab;
