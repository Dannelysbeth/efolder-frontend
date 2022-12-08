import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
// import "./RegisterPage.css";
import { connect } from "react-redux";
import { giveAdminPermission } from "../../Actions/auth";
import { changePassword } from "../../Actions/auth";
import { MDBBtn, MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { Console } from "console";

const SuperAdminPermPage = ({ user, giveAdminPermission, errors }) => {
  const { username } = useParams();
  const [infoMessage, setInfoMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");

  function submitNewPasswd() {
    setInfoMessage("");
    giveAdminPermission(username);
    //   changePassword(password, repeatPassword, username);

    setInfoMessage("Rola Administratora została poprawnie nadana");
    // } else {
    //   setInfoMessage("");
    // }
  }

  //   const giveAdminPermissions = () => {
  //     return fetch(
  //       `${process.env.REACT_APP_REMOTE_URL}/api/role/superAdmin/${username}`,
  //       {
  //         method: "POST",
  //         mode: "cors",
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("access")}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then((responseJson) => {
  //         setErrMsg("");
  //         // setEmployee(responseJson);
  //         // setLoading(false);
  //       })
  //       .catch((error) => {
  //         // setLoading(false);
  //         setErrMsg(error);
  //       });
  //   };

  useEffect(() => {
    // setInfoMessage();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="form-signin top-space">
        <MDBRow className="g-3">
          <h1 className="h3 mb-3 fw-normal text-center">Zmien haslo</h1>
          <MDBBtn
            className="w-100 btn btn-lg button-blue"
            type="submit"
            onClick={(e) => submitNewPasswd()}
          >
            Nadaj rolę administratora
          </MDBBtn>
          {infoMessage != null && infoMessage != "" && errors == null ? (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <strong>{infoMessage}</strong>
            </div>
          ) : null}
          {errors != null && errors.message != null ? (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <strong>{errors.message}</strong>
            </div>
          ) : null}
        </MDBRow>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  accountCreated: state.auth.accountCreated,
  errors: state.auth.RoleErrors,
  anotherUser: state.auth.anotherUser,
  user: state.auth.user,
  message: state.auth.message,
});

export default connect(mapStateToProps, { giveAdminPermission })(
  SuperAdminPermPage
);
