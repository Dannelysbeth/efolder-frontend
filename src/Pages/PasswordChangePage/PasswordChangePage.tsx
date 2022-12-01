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
  // message = null;
  const { username } = useParams();
  const [error, setError] = useState({
    password: "",
    repeatPassword: "",
  });
  const [formData, setFormData] = useState({
    password: "",
    repeatPassword: "",
  });
  const { password, repeatPassword } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validateInput(e);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    validateInput(e);
    if (password !== repeatPassword) {
      alert("Hasła nie są identyczne");

      //TODO
      return <Navigate to="/" />;
    } else {
      changePassword(password, repeatPassword, username);
      alert("Haslo zostało poprawnie zmienione");
      // error = "Hasła nie są identyczne!";
      // console.log("Pass dont match");
    }
  };

  // const changeUserPassword = async () => {
  //   return fetch(
  //     `${process.env.REACT_APP_REMOTE_URL}/api/user/changePassword/${user.username}`,
  //     {
  //       method: "POST",
  //       // mode: "cors",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("access")}`,
  //         "Content-Type": "application/json",
  //         Accept: "*/*",
  //       },
  //       body: JSON.stringify(formData),
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       successMsg = "Password changed successfully";
  //       error = null;
  //       console.log(successMsg);
  //     })
  //     .catch((error) => {
  //       console.log("Something is wrong");
  //       successMsg = null;
  //       error = error;
  //     });
  // };
  const validateInput = (e) => {
    let { name, value } = e.target;
    // setError({ ...errors, [e.target.name]: "" });
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "password":
          if (!value) {
            stateObj[name] = "Proszę wypełnij pole z hasłem";
          } else if (
            formData.repeatPassword &&
            value !== formData.repeatPassword
          ) {
            stateObj["repeatPassword"] = "Hasła nie są identyczne!";
          } else {
            stateObj["repeatPassword"] = formData.repeatPassword
              ? ""
              : error.repeatPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (formData.password && value !== formData.password) {
            stateObj[name] = "Proszę wypełnij pole 'Powtórz hasło'";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };
  useEffect(() => {}, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="form-signin top-space">
        <MDBRow className="g-3" tag="form" onSubmit={(e) => onSubmit(e)}>
          <h1 className="h3 mb-3 fw-normal text-center">Zmien haslo</h1>

          <MDBInput
            type="password"
            className="form-control"
            id="floatingPassword"
            name="password"
            value={formData.password}
            onChange={(e) => onChange(e)}
            placeholder="Hasło"
            onBlur={validateInput}
          />
          {error.password && <span className="err">{error.password}</span>}

          <MDBInput
            type="password"
            className="form-control"
            id="floatingPassword"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={(e) => onChange(e)}
            placeholder="Powtórz hasło"
            onBlur={validateInput}
          />
          {error.repeatPassword && (
            <span className="err">{error.repeatPassword}</span>
          )}
          <MDBBtn className="w-100 btn btn-lg button-blue" type="submit">
            Zmień hasło
          </MDBBtn>
          {errors !== null && message !== null ? (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <strong>{errors.message}</strong>
            </div>
          ) : null}
          {message !== null && error == null ? (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <strong>Password successfully saved </strong>
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
