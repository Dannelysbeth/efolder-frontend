import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./RegisterPage.css";
import { connect } from "react-redux";
import { extendedSignup } from "../../Actions/auth";
import { checkAuthenticated } from "../../Actions/auth";
import PeopleList from "./PeopleList";
import {
  MDBInput,
  MDBBtn,
  MDBCheckbox,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

const RegisterPage = ({
  extendedSignup,
  isAuthenticated,
  errors,
  accountCreated,
  anotherUser,
}) => {
  accountCreated = false;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hrAdmins, setHrAdmins] = useState([]);
  const [teams, setTeams] = useState([]);

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
      return <Navigate to="/" />;
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
  const getHRUsers = () => {
    return fetch(`${process.env.REACT_APP_REMOTE_URL}/api/user/employee/all`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setHrAdmins(responseJson);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  };
  // useEffect(() => {
  //   getHRUsers();
  // }, []);

  const getTeams = () => {
    return fetch(`${process.env.REACT_APP_REMOTE_URL}/api/team/all`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setTeams(responseJson);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  };
  useEffect(() => {
    getHRUsers();
    getTeams();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="form-signin top-space">
        <MDBRow className="g-3" tag="form" onSubmit={(e) => onSubmit(e)}>
          <h1 className="h3 mb-3 fw-normal text-center">Utwórz konto</h1>

          <MDBCol md="4">
            <MDBInput
              type="text"
              className="form-control"
              id="floatingInput"
              name="firstName"
              value={firstName}
              onChange={(e) => onChange(e)}
              placeholder="Imię"
              label="Imię"
              required
            />
          </MDBCol>
          <MDBCol md="4">
            <MDBInput
              type="text"
              className="form-control"
              id="floatingInput"
              name="lastName"
              value={lastName}
              onChange={(e) => onChange(e)}
              placeholder="Nazwisko"
              required
            />
          </MDBCol>
          <MDBCol md="4" className="form-floating form-myBox">
            <MDBInput
              type="text"
              className="form-control"
              id="floatingInput"
              name="username"
              value={username}
              onChange={(e) => onChange(e)}
              placeholder="Nazwa użytkownika"
            />
          </MDBCol>
          <MDBCol md="4">
            <MDBInput
              type="email"
              className="form-control"
              id="floatingInput"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              placeholder="nazwa@przyklad.com"
            />
          </MDBCol>
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
          <MDBCol md="4">
            {teams.length === 0 ? (
              <select
                className="form-select"
                id="teamName"
                name="teamName"
                value={teamName}
                onChange={(e) => onChange(e)}
                placeholder="Zespół"
              >
                <option value="" disabled selected>
                  Brak zespołów HR w systemie
                </option>
              </select>
            ) : (
              <select
                className="form-select"
                id="teamName"
                name="teamName"
                value={teamName}
                onChange={(e) => onChange(e)}
                placeholder="Zespół"
                required
              >
                <option selected disabled value="">
                  Wybierz dział
                </option>
                {!loading &&
                  !error &&
                  teams.map((team) => (
                    <option value={team["name"]}>
                      {team["description"]} ({team["name"]})
                    </option>
                  ))}
              </select>
            )}
          </MDBCol>
          <MDBCol md="4">
            {hrAdmins.length === 0 ? (
              <select
                className="form-select"
                id="hrManager"
                name="hrManager"
                value={hrManager}
                onChange={(e) => onChange(e)}
                aria-label="Administartor HR"
              >
                <option value="" disabled selected>
                  Brak managerów HR w systemie
                </option>
              </select>
            ) : (
              <select
                className="form-select"
                id="hrManager"
                name="hrManager"
                value={hrManager}
                onChange={(e) => onChange(e)}
                placeholder="Administartor HR"
                required
              >
                <option selected disabled value="">
                  Wybierz administratora HR
                </option>
                {!loading &&
                  !error &&
                  hrAdmins.map((hrAdmin) => (
                    <option value={hrAdmin["username"]}>
                      {hrAdmin["firstname"]} {hrAdmin["lastname"]}
                    </option>
                  ))}
              </select>
            )}
          </MDBCol>
          <MDBCol md="4" className="form-floating form-myBox">
            <MDBInput
              type="text"
              className="form-control"
              id="positionName"
              name="positionName"
              value={positionName}
              onChange={(e) => onChange(e)}
              placeholder="Stanowisko"
              label="Stanowisko"
            />
          </MDBCol>
          <MDBCol md="4" className="form-floating form-myBox">
            <MDBInput
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={city}
              onChange={(e) => onChange(e)}
              placeholder="Miasto"
              label="Miasto"
            />
          </MDBCol>
          <MDBCol md="4" className="form-floating form-myBox">
            <MDBInput
              type="text"
              className="form-control"
              id="country"
              name="country"
              value={country}
              onChange={(e) => onChange(e)}
              placeholder="Kraj"
              label="Kraj"
            />
          </MDBCol>

          <MDBBtn className="w-100 btn btn-lg button-blue" type="submit">
            Stwórz konto
          </MDBBtn>
          {errors !== null ? (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <strong>{errors.message}</strong>
            </div>
          ) : null}
          <p className="mt-3 text-center">Masz już konto?</p>
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

export default connect(mapStateToProps, { extendedSignup })(RegisterPage);
