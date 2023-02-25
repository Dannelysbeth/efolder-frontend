import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { updateTeam } from "../../Actions/auth";
import ForbiddenPage from "../ForbiddenPage/ForbiddenPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

import { connect } from "react-redux";
import {
  MDBInput,
  MDBBtn,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBModalBody,
  MDBModalFooter,
  MDBModalContent,
  MDBModalDialog,
  MDBModal,
  MDBModalHeader,
} from "mdb-react-ui-kit";

const TeamPage = ({ user, updateTeam }) => {
  const { teamName } = useParams();
  const [team, setTeam] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    teamLeader: team["teamLeader"] && team["teamLeader"]["username"],
  });

  const [hrAdmins, setHrAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [editTeamModal, setEditTeamModal] = useState(false);
  const [deleteTeamModal, setDeleteTeamModal] = useState(false);
  const [deleteTeamFailModal, setDeleteTeamFailModal] = useState(false);
  const [deleteTeamSuccessModal, setDeleteTeamSuccessModal] = useState(false);
  const editTeamToggleShow = () => setEditTeamModal(!editTeamModal);
  const deleteTeamToggleShow = () => setDeleteTeamModal(!deleteTeamModal);
  const deleteTeamFailToggleShow = () =>
    setDeleteTeamFailModal(!deleteTeamFailModal);
  const deleteTeamSuccessToggleShow = () =>
    setDeleteTeamSuccessModal(!deleteTeamSuccessModal);

  const { name, description, teamLeader } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const getTeam = () => {
    return fetch(`${process.env.REACT_APP_REMOTE_URL}/api/team/${teamName}`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("HERE");
        setTeam(responseJson);
        console.log(responseJson);
        console.log(team);

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
  const deleteTeam = () => {
    return fetch(
      `${process.env.REACT_APP_REMOTE_URL}/api/team/delete/${team["id"]}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  };

  const onUpdateTeam = (e) => {
    e.preventDefault();
    updateTeam(team["name"], description, teamLeader);
    window.location.replace(`/team/${team["name"]}`);
  };
  function onDeleteTeam() {
    deleteTeamToggleShow();
    deleteTeam();
    if (checkIfTeamIsEmpty()) {
      setDeleteTeamSuccessModal(true);
    } else {
      setDeleteTeamFailModal(true);
    }
  }
  function onSuccesDeleteTeam() {
    deleteTeamFailToggleShow();
    window.location.replace("/viewTeams");
  }

  function checkIfTeamIsEmpty(): boolean {
    if (team["teamSize"] != null && team["teamSize"] > 0) {
      return false;
    } else {
      return true;
    }
  }

  function checkIfAdmin(): boolean {
    if (user != null && user.roles != null)
      for (var i of user.roles) {
        if (i == "ROLE_SUPER_ADMIN" || i == "ROLE_HR_ADMIN") {
          return true;
        }
      }
    return false;
  }
  function checkIfTeamLeader(): boolean {
    if (user != null && user.roles != null) {
      for (var i of user.roles) {
        if (i == "ROLE_MANAGER") return true;
      }
    }
    return false;
  }

  function checkIfCanViewPage(): boolean {
    if (checkIfAdmin()) return true;
    else if (
      checkIfTeamLeader() &&
      user != null &&
      user.username != null &&
      team["teamLeader"] &&
      team["teamLeader"]["username"] === user.username
    )
      return true;

    return false;
  }

  function checkIfTeamExists(): boolean {
    if (team["message"] && team["message"] != null) {
      return false;
    } else {
      return true;
    }
  }

  const returnUserNotAdmin = () => (
    <div>
      {user == null} ? (<Navigate to="/login" />) : (
      <Navigate to="/forbidden" />)
    </div>
  );
  useEffect(() => {
    getHRUsers();
    getTeam();
  }, []);

  const returnUserPage = () => (
    <div>
      {" "}
      {checkIfTeamExists() ? (
        <div>
          <div>
            {checkIfCanViewPage() ? (
              <div className="backgd d-flex flex-column min-vh-100 ">
                <div className="">
                  <p>
                    <p></p>
                  </p>
                  <div className="row user-container-2 justify-content-center center">
                    <h3 className="center-text-2 justify-content-center">
                      {team["name"]}{" "}
                    </h3>
                    <h5 className="center-text-3">
                      {team["description"] != null && team["description"] != ""
                        ? team["description"]
                        : null}
                    </h5>

                    <div className="center d-flex align-items-center">
                      <img
                        src={
                          team["teamLeader"] && team["teamLeader"]["imageUrl"]
                            ? team["teamLeader"] &&
                              team["teamLeader"]["imageUrl"]
                            : "https://i.imgur.com/teiJw8H.png"
                        }
                        alt=""
                        style={{ width: "100px", height: "100px" }}
                        className="rounded-circle-2"
                      />
                    </div>
                    <div className=" ms-3">
                      <p className="fw-bold mb-2 center-text-2">
                        Team leader:{" "}
                        {team["teamLeader"] && team["teamLeader"]["firstName"]}{" "}
                        {team["teamLeader"] &&
                        team["teamLeader"]["middleName"] != null
                          ? team["teamLeader"]["middleName"] + " "
                          : null}
                        {team["teamLeader"] && team["teamLeader"]["lastName"]}
                      </p>
                      <p className="text-muted mb-0 center-text-2">
                        Team members: {team["teamSize"]}
                      </p>
                    </div>
                  </div>{" "}
                  <p>
                    <p></p>
                  </p>
                  {checkIfAdmin() ? (
                    <div>
                      {" "}
                      <div className="center  d-flex flex-col  ">
                        <button
                          className="btn button-blue-2 d-flex flex-col team-button-container center"
                          onClick={editTeamToggleShow}
                        >
                          <span className="fa fa-pencil fa-little"></span>
                        </button>
                      </div>
                      <MDBModal
                        show={editTeamModal}
                        setShow={setEditTeamModal}
                        tabIndex={"-3"}
                      >
                        <MDBModalDialog>
                          <MDBModalContent>
                            <MDBModalHeader>
                              <button
                                className="btn-close"
                                color="none"
                                onClick={editTeamToggleShow}
                              ></button>
                            </MDBModalHeader>
                            <MDBModalBody>
                              <MDBCol md="7">
                                <MDBInput
                                  type="text"
                                  className="form-control"
                                  id="name"
                                  name="name"
                                  value={team["name"]}
                                  onChange={(e) => onChange(e)}
                                  placeholder="Team name"
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
                                  placeholder="Team description"
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
                                    aria-label="Team leader"
                                  >
                                    <option value="" disabled selected>
                                      No users in the system
                                    </option>
                                  </select>
                                ) : (
                                  <select
                                    className="form-select"
                                    id="teamLeader"
                                    name="teamLeader"
                                    value={teamLeader}
                                    onChange={(e) => onChange(e)}
                                    placeholder="Team leader"
                                    required
                                  >
                                    <option selected disabled value="">
                                      Choose team leader
                                    </option>
                                    {hrAdmins.map((hrAdmin) => (
                                      <option value={hrAdmin["username"]}>
                                        {hrAdmin["firstName"]}{" "}
                                        {hrAdmin["lastName"]} (
                                        {hrAdmin["username"]})
                                      </option>
                                    ))}
                                  </select>
                                )}
                              </MDBCol>
                            </MDBModalBody>

                            <MDBModalFooter>
                              <button
                                className="btn btn-secondary"
                                color="secondary"
                                onClick={editTeamToggleShow}
                              >
                                Cancel
                              </button>
                              <button
                                className="btn btn-primary"
                                color="primary"
                                onClick={(e) => onUpdateTeam(e)}
                              >
                                Save
                              </button>
                            </MDBModalFooter>
                          </MDBModalContent>
                        </MDBModalDialog>
                      </MDBModal>
                    </div>
                  ) : null}
                  {team["employees"] && team["employees"].length === 0 ? (
                    <div className="team-empty-container center">
                      <h3 className=" center">
                        This team has no members assigned
                      </h3>
                    </div>
                  ) : (
                    <MDBListGroup
                      className="team-members-container"
                      style={{ minWidth: "22rem" }}
                      light
                    >
                      {team["employees"] &&
                        team["employees"].map((user) => (
                          <div>
                            <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <img
                                  src={
                                    user["imageUrl"]
                                      ? user["imageUrl"]
                                      : "https://i.imgur.com/teiJw8H.png"
                                  }
                                  alt=""
                                  style={{ width: "45px", height: "45px" }}
                                  className="rounded-circle"
                                />
                                <div className="ms-3">
                                  <p className="fw-bold mb-1">
                                    {user.firstName}
                                    {user.middleName != null
                                      ? " " + user.middleName
                                      : null}{" "}
                                    {user.lastName}
                                  </p>
                                  <p className="text-muted mb-0">
                                    {user.positionName}
                                  </p>
                                  <p className="text-muted mb-0">
                                    {user.teamName}
                                  </p>
                                </div>
                              </div>
                              {checkIfAdmin() ? (
                                <button className="btn btn-info btn-sm button-blue-2">
                                  <Link
                                    className="nav-link active"
                                    to={{
                                      pathname: `/user/${user.username}/daneOsobowe`,
                                    }}
                                  >
                                    <i className="fas  fas-white fa-eye"></i>
                                  </Link>
                                </button>
                              ) : null}
                            </MDBListGroupItem>
                          </div>
                        ))}
                    </MDBListGroup>
                  )}
                </div>{" "}
                {checkIfAdmin() ? (
                  <div className="d-flex justify-content-center ">
                    {" "}
                    <p>
                      <p></p>
                    </p>{" "}
                    <div className="center  d-flex flex-col min-vw-100">
                      <button
                        className="btn btn-danger d-flex flex-col team-button-container center"
                        onClick={deleteTeamToggleShow}
                      >
                        <span className="fa fa-trash fa-little"></span>
                      </button>
                    </div>
                    <p>
                      <p></p>
                    </p>
                    <MDBModal
                      show={deleteTeamModal}
                      setShow={setDeleteTeamModal}
                      tabIndex="-3"
                    >
                      <MDBModalDialog>
                        <MDBModalContent>
                          <MDBModalHeader>
                            <MDBBtn
                              className="btn-close"
                              color="none"
                              onClick={deleteTeamToggleShow}
                            ></MDBBtn>
                          </MDBModalHeader>
                          <MDBModalBody>
                            You intend to delete a team. This action cannot be
                            undone. Are you sure you want to continue?
                          </MDBModalBody>

                          <MDBModalFooter>
                            <MDBBtn
                              color="secondary"
                              onClick={deleteTeamToggleShow}
                            >
                              Cancel
                            </MDBBtn>
                            <MDBBtn
                              color="danger"
                              onClick={(e) => onDeleteTeam()}
                            >
                              Yes
                            </MDBBtn>
                          </MDBModalFooter>
                        </MDBModalContent>
                      </MDBModalDialog>
                    </MDBModal>
                  </div>
                ) : null}
                <p>
                  <p></p>
                </p>
                <MDBModal
                  show={deleteTeamFailModal}
                  setShow={setDeleteTeamFailModal}
                  tabIndex="-3"
                >
                  <MDBModalDialog>
                    <MDBModalContent>
                      <MDBModalHeader>
                        <MDBBtn
                          className="btn-close"
                          color="none"
                          onClick={deleteTeamFailToggleShow}
                        ></MDBBtn>
                      </MDBModalHeader>
                      <MDBModalBody>
                        The specified team cannot be removed because there are
                        employees are assigned to it!
                      </MDBModalBody>

                      <MDBModalFooter>
                        <MDBBtn
                          className=""
                          color="secondary"
                          onClick={deleteTeamFailToggleShow}
                        >
                          I understand
                        </MDBBtn>
                      </MDBModalFooter>
                    </MDBModalContent>
                  </MDBModalDialog>
                </MDBModal>
                <MDBModal
                  show={deleteTeamSuccessModal}
                  setShow={setDeleteTeamSuccessModal}
                  tabIndex="-3"
                >
                  <MDBModalDialog>
                    <MDBModalContent>
                      <MDBModalHeader>
                        <MDBBtn
                          className="btn-close"
                          color="none"
                          onClick={deleteTeamSuccessToggleShow}
                        ></MDBBtn>
                      </MDBModalHeader>
                      <MDBModalBody>
                        The specified team has been successfully deleted!
                      </MDBModalBody>

                      <MDBModalFooter>
                        <MDBBtn
                          color="secondary"
                          onClick={(e) => onSuccesDeleteTeam()}
                        >
                          I understand
                        </MDBBtn>
                      </MDBModalFooter>
                    </MDBModalContent>
                  </MDBModalDialog>
                </MDBModal>
              </div>
            ) : (
              <ForbiddenPage />
            )}
          </div>
        </div>
      ) : (
        <NotFoundPage />
      )}
    </div>
  );

  return <div>{returnUserPage()}</div>;
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  errors: state.auth.errors,
  isAuthenticated: state.auth.isAuthenticated,
  teamUpdated: state.auth.teamUpdated,
});

export default connect(mapStateToProps, { updateTeam })(TeamPage);
