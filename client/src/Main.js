import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import EditForm from "./Components/Form/EditForm";
import Login from "./Components/Login";
import PrivateRoute from "./Components/Util/PrivateRoute";
import UserView from "./Components/Responding/UserView";
import RadioCheck from "./Components/Responding/RadioCheck";

function Main() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/form/:formId"
            element={<PrivateRoute element={<EditForm />} />}
          />
          <Route path="/s/:formId" element={<UserView />} />
          <Route path="/radio" element={<RadioCheck />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Main;
