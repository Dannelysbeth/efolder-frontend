import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
// import "./RegisterPage.css";
import { connect } from "react-redux";
import { extendedSignup } from "../../Actions/auth";
import { checkAuthenticated } from "../../Actions/auth";
import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";

const PasswordChangePage = ({ user }) => {
  const [formData, setFormData] = useState({
    password: "",
    re_password: "",
  });
  const { password, re_password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (password === re_password) {
      //TODO
      return <Navigate to="/" />;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="form-signin top-space">
        <MDBRow className="g-3" tag="form" onSubmit={(e) => onSubmit(e)}>
          <h1 className="h3 mb-3 fw-normal text-center">Utwórz konto</h1>

          <MDBCol md="4">
            <MDBInput
              type="password"
              className="form-control"
              id="floatingPassword"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              placeholder="Hasło"
            />
          </MDBCol>
          <MDBCol md="4">
            <MDBInput
              type="password"
              className="form-control"
              id="floatingPassword"
              name="re_password"
              value={re_password}
              onChange={(e) => onChange(e)}
              placeholder="Powtórz hasło"
            />
          </MDBCol>
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

export default connect(mapStateToProps)(PasswordChangePage);
