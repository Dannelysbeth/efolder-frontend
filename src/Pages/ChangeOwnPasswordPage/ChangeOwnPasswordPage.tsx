import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { uploadFile, extendedSignup } from "../../Actions/auth";
import { loadUser, changeOwnPassword } from "../../Actions/auth";

import { connect } from "react-redux";
import documents from "../../Data/documentsA";
import { saveAs } from "file-saver";
import {
  MDBInput,
  MDBBtn,
  MDBCheckbox,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

const ChangeOwnPassword = ({ user, changeOwnPassword }) => {
  const [employee, setEmployee] = useState([]);
  //   const [info, setInfo] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(true);
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
      changeOwnPassword(password, repeatPassword);
      setInfoMessage("Hasło zostało poprawnie zmienione");
      setFormData({ ...formData, password: "", repeatPassword: "" });
    }
  }

  const passwordChangeTab = () => (
    <div className="d-flex flex-column min-vh-100">
      <div className="form-signin top-space">
        <MDBRow className="g-3">
          <h1 className="h3 mb-3 fw-normal text-center">Zmien haslo</h1>

          <MDBInput
            type="password"
            className="form-control"
            id="floatingPassword"
            name="password"
            // value={formData.password}
            onChange={(e) => onChange(e)}
            placeholder="Hasło"
          />

          <MDBInput
            type="password"
            className="form-control"
            id="floatingRepeatPassword"
            name="repeatPassword"
            // value={formData.repeatPassword}
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

  useEffect(() => {
    loadUser();
  }, []);

  function checkIfLogged(): boolean {
    loadUser();
    if (user !== null) return true;
    return false;
  }

  return (
    <div>
      {checkIfLogged() ? (
        <div className="backgd d-flex flex-column min-vh-100">
          {passwordChangeTab()}
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, { changeOwnPassword })(
  ChangeOwnPassword
);
