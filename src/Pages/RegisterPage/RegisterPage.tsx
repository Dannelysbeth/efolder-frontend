import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./RegisterPage.css";
import { connect } from "react-redux";
import { signup, extendedSignup } from "../../Actions/auth";
import { checkAuthenticated } from "../../Actions/auth";

const RegisterPage = ({
  signup,
  extendedSignup,
  isAuthenticated,
  errors,
  accountCreated,
  anotherUser,
  //   user,
}) => {
  accountCreated = false;
  //   const [info, setInfo] = useState([]);
  //   const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  //   const [formData, setFormData] = useState({
  //     username: "",
  //     password: "",
  //     re_password: "",
  //     email: "",
  //     firstName: "",
  //     lastName: "",
  //   });
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    re_password: "",
    email: "",
    firstName: "",
    lastName: "",
    middleName: "",
    teamName: "",
    hrManager: "",
    positionName: "",
    positionDescription: "",
    country: "",
    city: "",
    zipcode: "",
    street: "",
    buildingNumber: "",
    flatNumber: "",
    county: "",
  });

  console.log(window.location.hostname);
  //   const { username, password, re_password, email, firstName, lastName } =
  //     formData;
  const {
    username,
    password,
    re_password,
    email,
    firstName,
    lastName,
    middleName,
    teamName,
    hrManager,
    positionName,
    positionDescription,
    country,
    city,
    zipcode,
    street,
    flatNumber,
    county,
  } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //   const onSubmit = (e) => {
  //     e.preventDefault();
  //     if (password === re_password) {
  //       signup(username, password, email, firstName, lastName);
  //       //   return <Navigate to="/" />;
  //     }
  //   };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password === re_password) {
      extendedSignup(
        username,
        password,
        email,
        firstName,
        lastName,
        middleName,
        teamName,
        hrManager,
        positionName,
        positionDescription,
        country,
        city,
        zipcode,
        street,
        flatNumber,
        county
      );
      //   return <Navigate to="/" />;
    }
  };
  console.log(isAuthenticated);
  console.log(`User created: ${accountCreated}`);
  // if (isAuthenticated) {
  //     return <Navigate to='/' />
  // }
  if (accountCreated) {
    return <Navigate to="/" />;
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
          <div className="form-floating form-myBox">
            <input
              type="text"
              className="form-control"
              id="hrManager"
              name="hrManager"
              value={hrManager}
              onChange={(e) => onChange(e)}
              placeholder="Administartor HR"
            />
            <label>Administartor HR</label>
          </div>
          <div className="form-floating form-myBox">
            <input
              type="text"
              className="form-control"
              id="teamName"
              name="teamName"
              value={teamName}
              onChange={(e) => onChange(e)}
              placeholder="Zespół"
            />
            <label>Zespół</label>
          </div>
          <div className="form-floating form-myBox">
            <input
              type="text"
              className="form-control"
              id="positionName"
              name="positionName"
              value={positionName}
              onChange={(e) => onChange(e)}
              placeholder="Stanowisko"
            />
            <label>Stanowisko</label>
          </div>
          <div className="form-floating form-myBox">
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={city}
              onChange={(e) => onChange(e)}
              placeholder="Miasto"
            />
            <label>Miasto</label>
          </div>
          <div className="form-floating form-myBox">
            <input
              type="text"
              className="form-control"
              id="country"
              name="country"
              value={country}
              onChange={(e) => onChange(e)}
              placeholder="Kraj"
            />
            <label>Kraj</label>
          </div>

          {/* <div className="checkbox mb-4 mt-3">
            <label>
              <input type="checkbox" value="remember-me" /> Zapamiętaj mnie!
            </label>
          </div> */}
          <button className="w-100 btn btn-lg button-blue" type="submit">
            Stwórz konto
          </button>
          {errors !== null ? (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <strong>{errors.message}</strong>
              {/* <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button> */}
            </div>
          ) : null}
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
  anotherUser: state.auth.anotherUser,
  //   user: state.auth.user,
});

export default connect(mapStateToProps, { signup, extendedSignup })(
  RegisterPage
);
