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
  MDBCardHeader,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

const ViewMyTeamspage = ({ user }) => {
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const getTeams = () => {
    return fetch(
      `${process.env.REACT_APP_REMOTE_URL}/api/team/teamLeader/${user.username}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
        },
      }
    )
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
  //   function checkIfAdmin(): boolean {
  //     if (user != null && user.roles != null) {
  //       console.log(user.username);
  //       for (var i of user.roles) {
  //         if (i == "ROLE_SUPER_ADMIN" || i == "ROLE_HR_ADMIN") return true;
  //       }
  //     }

  //     return false;
  //   }
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
  }, []);

  return (
    <div className="team-container">
      <MDBCardHeader>
        <h1 className="text-center">Moje zespoły</h1>
      </MDBCardHeader>
      {checkIfTeamLeader() ? (
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
                  {/* <h5 className="d-flex justify-content-between align-items-center text-muted">
                    {team.description}
                  </h5> */}
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
                <MDBBtn size="sm" rounded color="link">
                  <Link
                    className="nav-link active"
                    to={{ pathname: `/team/${team.name}` }}
                  >
                    View
                  </Link>
                </MDBBtn>
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

export default connect(mapStateToProps)(ViewMyTeamspage);
