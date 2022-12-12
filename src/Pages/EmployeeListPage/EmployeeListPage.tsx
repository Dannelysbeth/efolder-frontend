import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import documents from "../../Data/documentsA";
import { saveAs } from "file-saver";
import {
  MDBBadge,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

const EmployeeListPage = ({ user }) => {
  const [users, setUsers] = useState([
    {
      id: 0,
      username: "",
      firstName: "",
      middleName: "",
      lastName: "",
      imageUrl: null,
      teamName: "",
      supervisor: "",
      hrManager: "",
      positionName: "",
      positionDescription: "",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const getUsers = () => {
    return fetch(
      `${process.env.REACT_APP_REMOTE_URL}/api/employment/employees`,
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
        setUsers(responseJson);
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
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {checkIfAdmin() ? (
        <MDBListGroup style={{ minWidth: "22rem" }} light>
          {users.length === 0 ? (
            <h3>Brak użytkowników w systemie</h3>
          ) : (
            users.map((user) => (
              <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img
                    src={
                      user.imageUrl
                        ? user.imageUrl
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
      ) : (
        <div>
          {user == null} ? (<Navigate to="/forbidden" />) : (
          <Navigate to="/login" />)
        </div>
      )}
    </div>
    // <MDBListGroup style={{ minWidth: "22rem" }} light>
    //   {users.length === 0 ? (
    //     <h3>Brak użytkowników w systemie</h3>
    //   ) : (
    //     users.map((user) => (
    //       <MDBListGroupItem className="d-flex justify-content-between align-items-center">
    //         <div className="d-flex align-items-center">
    //           <img
    //             src={
    //               user.imageUrl
    //                 ? user.imageUrl
    //                 : "https://i.imgur.com/teiJw8H.png"
    //             }
    //             alt=""
    //             style={{ width: "45px", height: "45px" }}
    //             className="rounded-circle"
    //           />
    //           <div className="ms-3">
    //             <p className="fw-bold mb-1">
    //               {user.firstName}
    //               {user.middleName != null ? " " + user.middleName : null}{" "}
    //               {user.lastName}
    //             </p>
    //             <p className="text-muted mb-0">{user.positionName}</p>
    //             <p className="text-muted mb-0">{user.teamName}</p>
    //           </div>
    //         </div>
    //         <MDBBtn size="sm" rounded color="link">
    //           <Link
    //             className="nav-link active"
    //             to={{ pathname: `/user/${user.username}/daneOsobowe` }}
    //           >
    //             View
    //           </Link>
    //         </MDBBtn>
    //       </MDBListGroupItem>
    //     ))
    //   )}
    // </MDBListGroup>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(EmployeeListPage);
