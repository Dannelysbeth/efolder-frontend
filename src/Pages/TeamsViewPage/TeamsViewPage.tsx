import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import documents from "../../Data/documentsA";
import ForbiddenPage from "../ForbiddenPage/ForbiddenPage";
import LoginPage from "../LoginPage/LoginPage";
import { saveAs } from "file-saver";
import {
  MDBBadge,
  MDBBtn,
  MDBBtnGroup,
  MDBCardHeader,
  MDBCol,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
} from "mdb-react-ui-kit";

const TeamViewPage = ({ user }) => {
  const [teams, setTeams] = useState([
    {
      id: 0,
      name: "",
      description: "",
      teamSize: 0,
      employees: [
        {
          id: 0,
          username: "",
          firstName: "",
          middleName: null,
          lastName: "",
          imageUrl: null,
          teamName: "",
          supervisor: "",
          hrManager: "",
          positionName: "",
          positionDescription: "",
        },
      ],
      teamLeader: {
        id: 0,
        username: "",
        firstName: "",
        middleName: null,
        lastName: "",
        imageUrl: null,
        teamName: "",
        supervisor: "",
        hrManager: "",
        positionName: "",
        positionDescription: "",
      },
    },
  ]);
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
    // createTeam(name, description, teamLeader);
    window.location.replace(`/team/${name}`);
  };
  const [loading, setLoading] = useState(true);
  const [hrAdmins, setHrAdmins] = useState([]);
  const [error, setError] = useState(true);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const deleteUserToggleShow = () => setDeleteUserModal(!deleteUserModal);

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
  function checkIfAdmin(): boolean {
    if (user != null && user.roles != null) {
      console.log(user.username);
      for (var i of user.roles) {
        if (i == "ROLE_SUPER_ADMIN" || i == "ROLE_HR_ADMIN") return true;
      }
    }

    return false;
  }
  function checkIfTeamLeader(): boolean {
    if (user != null && user.roles != null) {
      console.log(user.username);
      for (var i of user.roles) {
        if (i == "ROLE_MANAGER") return true;
      }
    }

    return false;
  }
  useEffect(() => {
    getTeams();
    getHRUsers();
  }, []);

  return (
    <div>
      <MDBCardHeader>
        <h1 className="text-center">Zespoły</h1>
      </MDBCardHeader>
      {checkIfAdmin() ? (
        <MDBListGroup style={{ minWidth: "22rem" }} light>
          {teams.length === 0 ? (
            <h3>Brak zespołów w systemie</h3>
          ) : (
            teams != null &&
            teams.map((team) => (
              <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                <div className="row">
                  <h4 className="d-flex justify-content-between align-items-center">
                    {team.name}
                  </h4>
                  <div className="d-flex align-items-center">
                    <img
                      src={
                        team.teamLeader.imageUrl
                          ? team.teamLeader.imageUrl
                          : "https://i.imgur.com/teiJw8H.png"
                      }
                      alt=""
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">
                        Lider zespołu: {team.teamLeader.firstName}
                        {team.teamLeader.middleName != null
                          ? " " + team.teamLeader.middleName
                          : null}{" "}
                        {team.teamLeader.lastName}
                      </p>
                      <p className="text-muted mb-0">
                        Ilość pracowników w zespole: {team.teamSize}
                      </p>
                      {/* <p className="text-muted mb-0">{user.teamName}</p> */}
                    </div>
                  </div>
                </div>
                <MDBBtnGroup>
                  <MDBBtn
                    size="sm"
                    className="btn btn-info btn-sm "
                    rounded
                    // color="link"
                    onClick={deleteUserToggleShow}
                  >
                    <span className="fa fa-pencil fa-little"></span>
                  </MDBBtn>
                  <MDBBtn size="sm" rounded className="btn btn-info btn-sm ">
                    <Link
                      className="nav-link active"
                      to={{ pathname: `/team/${team.name}` }}
                    >
                      <i className="fas fa-eye"></i>
                    </Link>
                  </MDBBtn>
                  <MDBBtn
                    size="sm"
                    className="btn btn-danger btn-sm "
                    rounded
                    // color="link"
                    // onClick={() => setIsAddrEditable(true)}
                  >
                    <span className="fa fa-trash fa-little"></span>
                  </MDBBtn>
                </MDBBtnGroup>
                <MDBModal
                  show={deleteUserModal}
                  setShow={setDeleteUserModal}
                  tabIndex={"-3"}
                >
                  <MDBModalDialog>
                    <MDBModalContent>
                      <MDBModalHeader>
                        <MDBBtn
                          className="btn-close"
                          color="none"
                          onClick={deleteUserToggleShow}
                        ></MDBBtn>
                      </MDBModalHeader>
                      <MDBModalBody>
                        <MDBCol md="7">
                          <MDBInput
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={team.name}
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
                              {hrAdmins.map((hrAdmin) => (
                                <option value={hrAdmin["username"]}>
                                  {hrAdmin["firstName"]} {hrAdmin["lastName"]} (
                                  {hrAdmin["username"]})
                                </option>
                              ))}
                            </select>
                          )}
                        </MDBCol>
                        // Zamierzasz usunąć użytkownika. Tej czynności nie
                        można // cofnąć. Czy na pewno chcesz kontynuować?
                      </MDBModalBody>

                      <MDBModalFooter>
                        <MDBBtn
                          color="secondary"
                          onClick={deleteUserToggleShow}
                        >
                          Anuluj
                        </MDBBtn>
                        <MDBBtn
                          color="danger"
                          // onClick={(e) => onDeleteUserAccount()}
                        >
                          Tak
                        </MDBBtn>
                      </MDBModalFooter>
                    </MDBModalContent>
                  </MDBModalDialog>
                </MDBModal>
              </MDBListGroupItem>
            ))
          )}
        </MDBListGroup>
      ) : (
        <div>
          {user == null} ? (<ForbiddenPage />) : (
          <ForbiddenPage />)
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(TeamViewPage);
