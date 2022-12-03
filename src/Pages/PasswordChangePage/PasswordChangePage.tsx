import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
// import "./RegisterPage.css";
import { connect } from "react-redux";
import { extendedSignup } from "../../Actions/auth";
import { changePassword } from "../../Actions/auth";
import { MDBBtn, MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { Console } from "console";

const PasswordChangePage = ({ user, errors, changePassword, message }) => {
  const { username } = useParams();
  const [infoMessage, setInfoMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    repeatPassword: "",
  });
  const { password, repeatPassword } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function submitNewPasswd() {
    setInfoMessage("");
    setErrMsg("");
    if (password == null || password == "") {
      setErrMsg("Pole 'Hasło' nie może byc puste ");
    } else if (password != repeatPassword) {
      setErrMsg("Wprowadzone hasła nie są identyczne");
    } else {
      changePassword(password, repeatPassword, username);
      setInfoMessage("Hasło zostało poprawnie zmienione");
      setFormData({ ...formData, password: "", repeatPassword: "" });
    }
  }

  useEffect(() => {
    setInfoMessage;
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="form-signin top-space">
        <MDBRow
          className="g-3"
          // tag="form"
          // onSubmit={(e) => submitNewPasswd()}
        >
          <h1 className="h3 mb-3 fw-normal text-center">Zmien haslo</h1>

          <MDBInput
            type="password"
            className="form-control"
            id="floatingPassword"
            name="password"
            value={formData.password}
            onChange={(e) => onChange(e)}
            placeholder="Hasło"
          />

          <MDBInput
            type="password"
            className="form-control"
            id="floatingRepeatPassword"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={(e) => onChange(e)}
            placeholder="Powtórz hasło"
          />
          <MDBBtn
            className="w-100 btn btn-lg button-blue"
            type="submit"
            onClick={(e) => submitNewPasswd()}
          >
            Zmień hasło
          </MDBBtn>
          {infoMessage != null && infoMessage != "" ? (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <strong>{infoMessage}</strong>
            </div>
          ) : null}
          {errMsg != null && errMsg != "" ? (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <strong>{errMsg}</strong>
            </div>
          ) : null}
        </MDBRow>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  accountCreated: state.auth.accountCreated,
  errors: state.auth.errors,
  anotherUser: state.auth.anotherUser,
  user: state.auth.user,
  message: state.auth.message,
});

export default connect(mapStateToProps, { changePassword })(PasswordChangePage);
