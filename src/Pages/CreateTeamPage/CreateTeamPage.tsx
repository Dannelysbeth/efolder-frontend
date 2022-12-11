import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { createTeam } from "../../Actions/auth";
import { checkAuthenticated } from "../../Actions/auth";
import {
  MDBInput,
  MDBBtn,
  MDBCheckbox,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { Alert } from "reactstrap";
import LoginPage from "../LoginPage/LoginPage";
import ForbiddenPage from "../ForbiddenPage/ForbiddenPage";

const RegisterPage = ({
  createTeam,
  teamCreated,
  user,
  isAuthenticated,
  errors,
  accountCreated,
}) => {
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [error, setError] = useState(false);
  const [hrAdmins, setHrAdmins] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    teamLeader: "",
  });

  console.log(window.location.hostname);
  const { name, description, teamLeader } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createTeam(name, description, teamLeader);
    if (teamCreated) window.location.replace(`/team/${name}`);
  };
  console.log(isAuthenticated);
  console.log(`User created: ${accountCreated}`);

  const checkIfTeamCreated = () => (
    <div>
      <Navigate to={`/team/${name}`} />
    </div>
    // return window.location.replace();
  );

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

  function checkIfSuperAdmin(): boolean {
    if (user != null && user.roles != null)
      for (var i of user.roles) {
        if (i == "ROLE_SUPER_ADMIN") return true;
      }
    return false;
  }
  useEffect(() => {
    getHRUsers();
    checkIfTeamCreated();
  }, []);

  return (
    <div>
      {teamCreated ? (
        <div>{checkIfTeamCreated()}</div>
      ) : (
        <div>
          {checkIfSuperAdmin() ? (
            <div className="d-flex flex-column min-vh-100">
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
              <div className="form-register top-space">
                <MDBRow
                  className="g-3"
                  tag="form"
                  onSubmit={(e) => onSubmit(e)}
                >
                  <div className="row"></div>
                  <h1 className="h3  fw-normal text-left">
                    Infomacje o zatrudnieniu
                  </h1>
                  <div className="row"></div>
                  <MDBCol md="7">
                    <MDBInput
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => onChange(e)}
                      placeholder="Nazwa zespołu"
                      required
                    />
                  </MDBCol>
                  <MDBCol md="10">
                    <MDBInput
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      value={description}
                      onChange={(e) => onChange(e)}
                      placeholder="Opis zespołu"
                      required
                    />
                  </MDBCol>
                  <MDBCol md="5">
                    {hrAdmins.length === 0 ? (
                      <select
                        className="form-select"
                        id="teamLeader"
                        name="teamLeader"
                        value={teamLeader}
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
                        id="teamLeader"
                        name="teamLeader"
                        value={teamLeader}
                        onChange={(e) => onChange(e)}
                        placeholder="Leader zespołu"
                        required
                      >
                        <option selected disabled value="">
                          Wybierz lidera zespołu
                        </option>
                        {!loading &&
                          !error &&
                          hrAdmins.map((hrAdmin) => (
                            <option value={hrAdmin["username"]}>
                              {hrAdmin["firstName"]} {hrAdmin["lastName"]} (
                              {hrAdmin["username"]})
                            </option>
                          ))}
                      </select>
                    )}
                  </MDBCol>
                  <div className="row"></div>
                  <MDBBtn
                    className="w-100 btn btn-lg button-blue"
                    type="submit"
                  >
                    Utwórz zespół
                  </MDBBtn>
                </MDBRow>
              </div>
            </div>
          ) : (
            <div>
              {isAuthenticated != true} ? (<ForbiddenPage />) : (
              <ForbiddenPage />)
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  accountCreated: state.auth.accountCreated,
  errors: state.auth.errors,
  teamCreated: state.auth.teamCreated,
  anotherUser: state.auth.anotherUser,
});

export default connect(mapStateToProps, { createTeam })(RegisterPage);
