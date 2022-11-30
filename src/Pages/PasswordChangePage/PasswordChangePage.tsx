import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
// import "./RegisterPage.css";
import { connect } from "react-redux";
import { extendedSignup } from "../../Actions/auth";
import { changePassword } from "../../Actions/auth";
import { MDBBtn, MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { Console } from "console";

const PasswordChangePage = ({ user, changePassword }) => {
  const [formData, setFormData] = useState({
    password: "",
    repeatPassword: "",
  });
  const { password, repeatPassword } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      changePassword(password, repeatPassword, user.username);

      //TODO
      return <Navigate to="/" />;
    } else {
      console.log("Pass dont match");
    }
  };

  // const changePassword = async () => {
  //   const response = await fetch(
  //     `${process.env.REACT_APP_REMOTE_URL}/api/user/changePassword/${user.username}`,
  //     {
  //       method: "PUT",
  //       mode: "cors",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("access")}`,
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //       body: JSON.stringify(formData),
  //     }
  //   );
  //   const url = await response.text();
  //   console.log("Password changed successfully");

  // };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="form-signin top-space">
        <MDBRow className="g-3" tag="form" onSubmit={(e) => onSubmit(e)}>
          <h1 className="h3 mb-3 fw-normal text-center">Utwórz konto</h1>

          <MDBInput
            type="password"
            className="form-control"
            id="floatingPassword"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            placeholder="Hasło"
          />

          <MDBInput
            type="password"
            className="form-control"
            id="floatingPassword"
            name="repeatPassword"
            value={repeatPassword}
            onChange={(e) => onChange(e)}
            placeholder="Powtórz hasło"
          />
          <MDBBtn className="w-100 btn btn-lg button-blue" type="submit">
            Zmień hasło
          </MDBBtn>
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
});

export default connect(mapStateToProps, { changePassword })(PasswordChangePage);
