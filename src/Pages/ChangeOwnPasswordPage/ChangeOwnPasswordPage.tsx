import React from "react";
import { useEffect, useState } from "react";
import { loadUser, changeOwnPassword } from "../../Actions/auth";

import { connect } from "react-redux";
import { MDBInput, MDBRow } from "mdb-react-ui-kit";

const ChangeOwnPassword = ({ user, changeOwnPassword }) => {
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
    <div className="d-flex flex-column  ">
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
      <div className="form-password-change ">
        <MDBRow className="g-3">
          <h4 className="center">Zmien haslo</h4>

          <MDBInput
            type="password"
            className="form-control"
            id="floatingPassword"
            name="password"
            onChange={(e) => onChange(e)}
            placeholder="Hasło"
          />

          <MDBInput
            type="password"
            className="form-control"
            id="floatingRepeatPassword"
            name="repeatPassword"
            onChange={(e) => onChange(e)}
            placeholder="Powtórz hasło"
          />
          <button
            className="w-100 btn btn-lg button-blue-2 top-space"
            type="submit"
            onClick={(e) => submitNewPasswd()}
          >
            Zmień hasło
          </button>
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
        <div className="backgd-2 d-flex flex-column min-vh-100 parent">
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
