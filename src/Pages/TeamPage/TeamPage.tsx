import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  Outlet,
  Navigate,
} from "react-router-dom";
import a_documents from "../../Data/documentsA";
import b_documents from "../../Data/documentsA";
import List from "../MyDocumentsPage/DocumentList";
import { updateTeam } from "../../Actions/auth";
import ForbiddenPage from "../ForbiddenPage/ForbiddenPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

import { connect } from "react-redux";
import documents from "../../Data/documentsA";
import {
  MDBInput,
  MDBBtn,
  MDBCheckbox,
  MDBRow,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBModalBody,
  MDBModalFooter,
  MDBModalContent,
  MDBModalDialog,
  MDBModal,
  MDBBtnGroup,
  MDBModalHeader,
} from "mdb-react-ui-kit";
import { get } from "https";
import UserNotFoundPage from "../UserNotFoundPage/UserNotFoundPage";
// import { updateTeam } from "../../Actions/auth";

const TeamPage = ({
  user,
  isAuthenticated,
  errors,
  teamUpdated,
  updateTeam,
}) => {
  const { teamName } = useParams();
  const [team, setTeam] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    teamLeader: team["teamLeader"] && team["teamLeader"]["username"],
  });

  const [hrAdmins, setHrAdmins] = useState([]);
  const [documents, setDocuments] = useState([]);
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
        // setHrAdmins(responseJson);
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
        if (i == "ROLE_SUPER_ADMIN" || i == "ROLE_HR_ADMIN") return true;
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
    getTeam();
    if (checkIfTeamLeader()) {
      getHRUsers();
    }
  }, []);

  const returnUserPage = () => (
    <div>
      {" "}
      {checkIfTeamExists() ? (
        <div>
          <div>
            {checkIfCanViewPage() ? (
              <div className="backgd d-flex flex-column min-vh-100">
                <div className="">
                  <div className="row user-container justify-content-center">
                    <h3 className="justify-content-center">{team["name"]} </h3>
                    <h5>
                      {team["description"] != null && team["description"] != ""
                        ? team["description"]
                        : null}
                    </h5>
                    <div className="h5 font-weight-300 ">
                      <i className="ni location_pin mr-2"></i>
                      Lider zespołu:{" "}
                      {team["teamLeader"] &&
                        team["teamLeader"]["firstName"]}{" "}
                      {team["teamLeader"] &&
                      team["teamLeader"]["middleName"] != null
                        ? team["teamLeader"]["middleName"] + " "
                        : null}
                      {team["teamLeader"] && team["teamLeader"]["lastName"]}
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2"></i>
                      Ilość pracowników w zespole: {team["teamSize"]}
                    </div>
                  </div>{" "}
                  <p>
                    <p></p>
                  </p>
                  {checkIfAdmin() ? (
                    <div>
                      {" "}
                      <div>
                        <MDBBtn
                          size="sm"
                          className="btn btn-info btn-sm "
                          rounded
                          // color="link"
                          onClick={editTeamToggleShow}
                        >
                          <span className="fa fa-pencil fa-little"></span>
                        </MDBBtn>
                      </div>
                      <MDBModal
                        show={editTeamModal}
                        setShow={setEditTeamModal}
                        tabIndex={"-3"}
                      >
                        <MDBModalDialog>
                          <MDBModalContent>
                            <MDBModalHeader>
                              <MDBBtn
                                className="btn-close"
                                color="none"
                                onClick={editTeamToggleShow}
                              ></MDBBtn>
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
                              <MDBBtn
                                color="secondary"
                                onClick={editTeamToggleShow}
                              >
                                Anuluj
                              </MDBBtn>
                              <MDBBtn
                                color="primary"
                                onClick={(e) => onUpdateTeam(e)}
                              >
                                Zapisz
                              </MDBBtn>
                            </MDBModalFooter>
                          </MDBModalContent>
                        </MDBModalDialog>
                      </MDBModal>
                    </div>
                  ) : null}
                  <MDBListGroup style={{ minWidth: "22rem" }} light>
                    {team["employees"] && team["employees"].length === 0 ? (
                      <h3>Ten zepół nie posiada pracowników</h3>
                    ) : (
                      team["employees"] &&
                      team["employees"].map((user) => (
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
                              <p className="text-muted mb-0">{user.teamName}</p>
                            </div>
                          </div>
                          {checkIfAdmin() ? (
                            <MDBBtn size="sm" rounded color="link">
                              <Link
                                className="nav-link active"
                                to={{
                                  pathname: `/user/${user.username}/daneOsobowe`,
                                }}
                              >
                                View
                              </Link>
                            </MDBBtn>
                          ) : null}
                        </MDBListGroupItem>
                      ))
                    )}
                  </MDBListGroup>
                </div>{" "}
                {checkIfAdmin() ? (
                  <div>
                    {" "}
                    <MDBBtn
                      size="sm"
                      className="btn btn-danger btn-sm "
                      rounded
                      onClick={deleteTeamToggleShow}
                      // onClick={() => setIsAddrEditable(true)}
                    >
                      <span className="fa fa-trash fa-little"></span>
                    </MDBBtn>
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
                            Zamierzasz usunąć zespół. Tej czynności nie można
                            cofnąć. Czy na pewno chcesz kontynuować?
                          </MDBModalBody>

                          <MDBModalFooter>
                            <MDBBtn
                              color="secondary"
                              onClick={deleteTeamToggleShow}
                            >
                              Anuluj
                            </MDBBtn>
                            <MDBBtn
                              color="danger"
                              onClick={(e) => onDeleteTeam()}
                            >
                              Tak
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
                        Podany zespół nie może być usunięty, ponieważ są do
                        niego przypisani pracownicy!
                      </MDBModalBody>

                      <MDBModalFooter>
                        <MDBBtn
                          color="secondary"
                          onClick={deleteTeamFailToggleShow}
                        >
                          Rozumiem
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
                        Podany zespół został poprawnie usunięty!
                      </MDBModalBody>

                      <MDBModalFooter>
                        <MDBBtn
                          color="secondary"
                          onClick={(e) => onSuccesDeleteTeam()}
                        >
                          Rozumiem
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
