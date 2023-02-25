import React from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "../css/app.css";
import { connect } from "react-redux";
import { extendedSignup } from "../../Actions/auth";
import { MDBInput, MDBBtn, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { Alert } from "reactstrap";
import LoginPage from "../LoginPage/LoginPage";
import ForbiddenPage from "../ForbiddenPage/ForbiddenPage";

const RegisterPage = ({
  extendedSignup,
  user,
  isAuthenticated,
  errors,
  accountCreated,
}) => {
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
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
    // hrManager: "",
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
    // hrManager,
    positionName,
    positionDescription,
    country,
    city,
    zipcode,
    street,
    buildingNumber,
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
        // hrManager,
        positionName,
        positionDescription,
        country,
        city,
        zipcode,
        street,
        buildingNumber,
        flatNumber,
        county
      );
      if (errors == null) {
        <Alert>{errors}</Alert>;
      }
      return <Navigate to="/" />;
    } else {
      setErrMsg("Hasła są różne");
    }
  };
  console.log(isAuthenticated);
  console.log(`User created: ${accountCreated}`);

  if (accountCreated) {
    window.location.replace(`/user/${username}/daneOsobowe`);
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
        // setHrAdmins(responseJson);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

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
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };
  function checkIfAdmin(): boolean {
    if (user != null && user.roles != null)
      for (var i of user.roles) {
        if (i == "ROLE_HR_ADMIN" || i == "ROLE_SUPER_ADMIN") return true;
      }
    return false;
  }
  useEffect(() => {
    getHRUsers();
    getTeams();
  }, []);

  return (
    <div>
      <div className="backgd-3 d-flex flex-column min-vh-100">
        <div>
          <div>
            <div className="d-flex flex-column min-vh-100 parent-top ">
              {checkIfAdmin() ? (
                <div className="d-flex flex-column ">
                  {errors !== null ? (
                    <div
                      className="alert alert-danger alert-dismissible fade show"
                      role="alert"
                    >
                      <strong>{errors.message}</strong>
                    </div>
                  ) : null}
                  {errMsg != null && errMsg != "" ? (
                    <div
                      className="alert alert-danger alert-dismissible fade show"
                      role="alert"
                    >
                      <strong>{errMsg}</strong>{" "}
                    </div>
                  ) : null}
                  <div className="form-register top-space ">
                    <MDBRow
                      className="g-3 "
                      tag="form"
                      onSubmit={(e) => onSubmit(e)}
                    >
                      <h1 className="h3  fw-normal  text-center-dark">
                        Infomacje podstawowe
                      </h1>
                      <MDBCol md="4">
                        <MDBInput
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="firstName"
                          value={firstName}
                          onChange={(e) => onChange(e)}
                          placeholder="First name"
                          required
                        />
                      </MDBCol>
                      <MDBCol md="4">
                        <MDBInput
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="middleName"
                          value={middleName}
                          onChange={(e) => onChange(e)}
                          placeholder="Middle name"
                        />
                      </MDBCol>
                      <div className="row"></div>
                      <MDBCol md="5">
                        <MDBInput
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="lastName"
                          value={lastName}
                          onChange={(e) => onChange(e)}
                          placeholder="Last name"
                          required
                        />
                      </MDBCol>{" "}
                      <MDBCol md="5">
                        <MDBInput
                          type="email"
                          className="form-control"
                          id="floatingInput"
                          name="email"
                          value={email}
                          onChange={(e) => onChange(e)}
                          placeholder="name@example.com"
                          required
                        />
                      </MDBCol>
                      <div className="row"></div>
                      <MDBCol md="3">
                        <MDBInput
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="username"
                          value={username}
                          onChange={(e) => onChange(e)}
                          placeholder="Username"
                          required
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
                          placeholder="Password"
                          required
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
                          placeholder="Repeat password"
                          required
                        />
                      </MDBCol>
                      <div className="row"></div>
                      <h3 className="h3  fw-normal text-center-dark">
                        Address information
                      </h3>
                      <MDBCol md="4">
                        <MDBInput
                          type="text"
                          className="form-control"
                          id="country"
                          name="country"
                          value={country}
                          onChange={(e) => onChange(e)}
                          placeholder="Country"
                          required
                        />
                      </MDBCol>
                      <MDBCol md="5">
                        <MDBInput
                          type="text"
                          className="form-control"
                          id="country"
                          name="county"
                          value={county}
                          onChange={(e) => onChange(e)}
                          placeholder="State/Province"
                        />
                      </MDBCol>
                      <div className="row"></div>
                      <MDBCol md="5">
                        <MDBInput
                          type="text"
                          className="form-control"
                          id="street"
                          name="street"
                          value={street}
                          onChange={(e) => onChange(e)}
                          placeholder="Street"
                        />
                      </MDBCol>
                      <MDBCol md="2">
                        <MDBInput
                          type="text"
                          className="form-control"
                          id="buildingNumber"
                          name="buildingNumber"
                          value={buildingNumber}
                          onChange={(e) => onChange(e)}
                          placeholder="Building nr"
                          required
                        />
                      </MDBCol>
                      <MDBCol md="3">
                        <MDBInput
                          type="text"
                          className="form-control"
                          id="flatNumber"
                          name="flatNumber"
                          value={flatNumber}
                          onChange={(e) => onChange(e)}
                          placeholder="Apartment nr"
                        />
                      </MDBCol>
                      <div className="row"></div>
                      <MDBCol md="3">
                        <MDBInput
                          type="text"
                          pattern="[0-9]{2}-[0-9]{3}"
                          className="form-control"
                          id="zipcode"
                          name="zipcode"
                          value={zipcode}
                          onChange={(e) => onChange(e)}
                          placeholder="NN-NNN"
                        />
                      </MDBCol>
                      <MDBCol md="5">
                        <MDBInput
                          type="text"
                          className="form-control"
                          id="city"
                          name="city"
                          value={city}
                          onChange={(e) => onChange(e)}
                          placeholder="City"
                          required
                        />
                      </MDBCol>
                      <div className="row"></div>
                      <h1 className="h3  fw-normal text-center-dark">
                        Employment information
                      </h1>
                      <MDBCol md="6">
                        {teams.length === 0 ? (
                          <select
                            className="form-select"
                            id="teamName"
                            name="teamName"
                            value={teamName}
                            onChange={(e) => onChange(e)}
                            placeholder="Team"
                          >
                            <option value="" disabled selected>
                              There are no teams in the system
                            </option>
                          </select>
                        ) : (
                          <select
                            className="form-select"
                            id="teamName"
                            name="teamName"
                            value={teamName}
                            onChange={(e) => onChange(e)}
                            placeholder="Team"
                            required
                          >
                            <option selected disabled value="">
                              Choose team
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
                      <div className="row"></div>
                      <MDBCol md="5">
                        <MDBInput
                          type="text"
                          className="form-control"
                          id="positionName"
                          name="positionName"
                          value={positionName}
                          onChange={(e) => onChange(e)}
                          placeholder="Position"
                          required
                        />
                      </MDBCol>
                      <div className="row"></div>
                      <button
                        className="w-100 btn btn-lg button-blue-2 top-space"
                        type="submit"
                      >
                        Create account
                      </button>
                    </MDBRow>
                  </div>
                </div>
              ) : (
                <div>
                  {isAuthenticated == true} ? (<ForbiddenPage />) : (
                  <ForbiddenPage />)
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  accountCreated: state.auth.accountCreated,
  errors: state.auth.errors,
  anotherUser: state.auth.anotherUser,
});

export default connect(mapStateToProps, { extendedSignup })(RegisterPage);
