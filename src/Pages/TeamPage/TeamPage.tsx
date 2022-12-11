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
} from "mdb-react-ui-kit";

const TeamPage = ({ user, isAuthenticated, errors }) => {
  const { teamName } = useParams();
  const [team, setTeam] = useState([]);
  //   const [team, setTeam] = useState({
  //     id:"",
  //     name: "",
  //     description: "",
  //     teamSize: 0,
  //     employees: [
  //       {
  //         id: 0,
  //         username,
  //         firstName: "",
  //         middleName: null,
  //         lastName: "",
  //         imageUrl: null,
  //         teamName: "",
  //         supervisor: "",
  //         hrManager: "",
  //         positionName: "",
  //         positionDescription: "",
  //       },
  //     ],
  //     teamLeader: {
  //       id: 0,
  //       username: "",
  //       firstName: "",
  //       middleName: null,
  //       lastName: "",
  //       imageUrl: null,
  //       teamName: "",
  //       supervisor: "",
  //       hrManager: "",
  //       positionName: "",
  //       positionDescription: "",
  //     },
  //   });
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

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
        // setEmployee(null);
        setLoading(false);
        setError(true);
      });
  };
  useEffect(() => {
    getTeam();
  }, []);

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
    // getTeam();
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

  const returnUserNotAdmin = () => (
    <div>
      {user == null} ? (<Navigate to="/login" />) : (
      <Navigate to="/forbidden" />)
    </div>
  );

  const returnUserPage = () => (
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
                {team["teamLeader"] && team["teamLeader"]["firstName"]}{" "}
                {team["teamLeader"] && team["teamLeader"]["middleName"] != null
                  ? team["teamLeader"]["middleName"] + " "
                  : null}
                {team["teamLeader"] && team["teamLeader"]["lastName"]}
              </div>
              <div className="h5 mt-4">
                <i className="ni business_briefcase-24 mr-2"></i>
                Ilość pracowników w zespole: {team["teamSize"]}
              </div>
            </div>
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
                        <p className="text-muted mb-0">{user.positionName}</p>
                        <p className="text-muted mb-0">{user.teamName}</p>
                      </div>
                    </div>
                    <MDBBtn size="sm" rounded color="link">
                      <Link
                        className="nav-link active"
                        to={{ pathname: `/user/${user.username}/daneOsobowe` }}
                      >
                        View
                      </Link>
                    </MDBBtn>
                  </MDBListGroupItem>
                ))
              )}
            </MDBListGroup>
          </div>{" "}
        </div>
      ) : (
        <ForbiddenPage />
      )}
    </div>
  );

  return <div>{returnUserPage()}</div>;
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  errors: state.auth.errors,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(TeamPage);
