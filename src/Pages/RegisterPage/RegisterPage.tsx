import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./RegisterPage.css";
import { connect } from "react-redux";
import { signup } from "../../Actions/auth";
import { checkAuthenticated } from "../../Actions/auth";

const RegisterPage = ({
  signup,
  isAuthenticated,
  errors,
  accountCreated,
  //   user,
}) => {
  accountCreated = false;
  //   const [info, setInfo] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    re_password: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  console.log(window.location.hostname);
  const { username, password, re_password, email, firstName, lastName } =
    formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === re_password) {
      signup(username, password, email, firstName, lastName);
      //   return <Navigate to="/" />;
    }
  };
  console.log(isAuthenticated);
  // if (isAuthenticated) {
  //     return <Navigate to='/' />
  // }
  if (accountCreated) {
    // window.open("https://" + window.location.hostname + "/login", "_parent");
  }
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="form-signin top-space">
        <form onSubmit={(e) => onSubmit(e)}>
          <h1 className="h3 mb-3 fw-normal text-center">Utwórz konto</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name="firstName"
              value={firstName}
              onChange={(e) => onChange(e)}
              placeholder="Jan"
            />
            <label>Imię</label>
          </div>
          <div className="form-floating form-myBox">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name="lastName"
              value={lastName}
              onChange={(e) => onChange(e)}
              placeholder="Nowak"
            />
            <label>Nazwisko</label>
          </div>
          <div className="form-floating form-myBox">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name="username"
              value={username}
              onChange={(e) => onChange(e)}
              placeholder="Nazwa"
            />
            <label>Nazwa użytkownika</label>
          </div>
          <div className="form-floating form-myBox">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              placeholder="name@example.com"
            />
            <label>Adres Email</label>
          </div>
          <div className="form-floating form-myBox">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              placeholder="Hasło"
            />
            <label>Hasło</label>
          </div>
          <div className="form-floating form-myBox">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              name="re_password"
              value={re_password}
              onChange={(e) => onChange(e)}
              placeholder="Hasło"
            />
            <label>Powtórz hasło</label>
          </div>
          <div className="checkbox mb-4 mt-3">
            <label>
              <input type="checkbox" value="remember-me" /> Zapamiętaj mnie!
            </label>
          </div>
          <button className="w-100 btn btn-lg button-blue" type="submit">
            Stwórz konto
          </button>
          <p className="mt-3 text-center">Masz już konto?</p>
          {/* <Link to="/login">
            <p className="text-center">Zaloguj się</p>
          </Link> */}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  accountCreated: state.auth.accountCreated,
  errors: state.auth.errors,
  //   user: state.auth.user,
});

export default connect(mapStateToProps, { signup })(RegisterPage);
