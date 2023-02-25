import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ForbiddenPage from "../ForbiddenPage/ForbiddenPage";
import {
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
          // hrManager: "",
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
        // hrManager: "",
        positionName: "",
        positionDescription: "",
      },
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const getTeams = () => {
    return fetch(`${process.env.REACT_APP_REMOTE_URL}/api/team/myTeams`, {
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
    <div className="backgd-2 padding-employee">
      <div className=" team-container">
        <MDBCardHeader>
          <h1 className="text-center">My teams</h1>
        </MDBCardHeader>
        {checkIfTeamLeader() ? (
          <MDBListGroup style={{ minWidth: "22rem" }} light>
            {teams.length === 0 ? (
              <h3>No teams in the system</h3>
            ) : (
              teams != null &&
              teams.map((team) => (
                <MDBListGroupItem
                  className="d-flex justify-content-between align-items-center "
                  type="button"
                  to={{ pathname: `/team/${team.name}` }}
                >
                  <div className="row">
                    <h4 className="d-flex justify-content-between align-items-center">
                      {team.name}
                    </h4>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1">
                          Team leader: {team.teamLeader.firstName}
                          {team.teamLeader.middleName != null
                            ? " " + team.teamLeader.middleName
                            : null}{" "}
                          {team.teamLeader.lastName}
                        </p>
                        <p className="text-muted mb-0">
                          Team members: {team.teamSize}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-info btn-sm button-blue-2">
                    <Link
                      className="nav-link active"
                      to={{ pathname: `/team/${team.name}` }}
                    >
                      <i className="fas fas-white fa-eye"></i>
                    </Link>
                  </button>
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(ViewMyTeamspage);
