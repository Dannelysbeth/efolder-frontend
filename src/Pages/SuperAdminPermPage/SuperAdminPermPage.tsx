import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
// import "./RegisterPage.css";
import { connect } from "react-redux";
import { giveAdminPermission, takeAdminPermission } from "../../Actions/auth";
import { changePassword } from "../../Actions/auth";
import {
  MDBBtn,
  MDBCol,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
  MDBRow,
} from "mdb-react-ui-kit";
import { Console } from "console";

const SuperAdminPermPage = ({
  user,
  giveAdminPermission,
  errors,
  takeAdminPermission,
}) => {
  const { username } = useParams();
  const [infoMessage, setInfoMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [employee, setEmployee] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => setBasicModal(!basicModal);

  function giveAdminPermissions() {
    toggleShow();
    setInfoMessage("");
    giveAdminPermission(username);
    setInfoMessage("Rola Administratora została poprawnie nadana");
  }
  function takeAdminPermissions() {
    toggleShow();
    setInfoMessage("");
    takeAdminPermission(username);
    setInfoMessage("Rola Administratora została odebrana");
  }

  function checkIfUserIsAdmin(): boolean {
    // getEmployeeRoles();
    console.log(employee);
    if (employee != null) {
      for (var r of employee["roles"]) {
        if (
          r["roleName"] == "ROLE_HR_ADMIN" ||
          r["roleName"] == "ROLE_SUPER_ADMIN"
        )
          return true;
      }
    }
    return false;
  }

  const getEmployeeRoles = () => {
    return fetch(`${process.env.REACT_APP_REMOTE_URL}/api/role/${username}`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setEmployee(responseJson);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    getEmployeeRoles();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="form-signin top-space">
        {checkIfUserIsAdmin() ? (
          <MDBRow className="g-3">
            {/* <h1 className="h3 mb-3 fw-normal text-center">Jest adminem</h1> */}

            <MDBBtn className="w-100 btn-danger btn-lg " onClick={toggleShow}>
              Odbierz uprawnienia administratora
            </MDBBtn>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
              <MDBModalDialog>
                <MDBModalContent>
                  <MDBModalHeader>
                    {/* <MDBModalTitle>Modal title</MDBModalTitle> */}
                    <MDBBtn
                      className="btn-close"
                      color="none"
                      onClick={toggleShow}
                    ></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody>
                    Czy na pewno odebrać prawa administratora?
                  </MDBModalBody>

                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={toggleShow}>
                      Anuluj
                    </MDBBtn>
                    <MDBBtn
                      color="danger"
                      onClick={(e) => takeAdminPermissions()}
                    >
                      Tak
                    </MDBBtn>
                  </MDBModalFooter>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
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
        ) : (
          <MDBRow className="g-3">
            {/* <h1 className="h3 mb-3 fw-normal text-center">Nie jest adminem</h1> */}

            <MDBBtn
              className="w-100 btn btn-lg button-blue"
              // type="button"
              // data-mdb-toggle="modal"
              // data-mdb-target="#exampleModal"
              onClick={toggleShow}
            >
              Nadaj rolę administratora
            </MDBBtn>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
              <MDBModalDialog>
                <MDBModalContent>
                  <MDBModalHeader>
                    {/* <MDBModalTitle>Modal title</MDBModalTitle> */}
                    <MDBBtn
                      className="btn-close"
                      color="none"
                      onClick={toggleShow}
                    ></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody>
                    Czy na pewno nadać prawa administratora?
                  </MDBModalBody>

                  <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={toggleShow}>
                      Anuluj
                    </MDBBtn>
                    <MDBBtn
                      color="primary"
                      onClick={(e) => giveAdminPermissions()}
                    >
                      Tak
                    </MDBBtn>
                  </MDBModalFooter>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
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
        )}
        {/* <div>{popUpMessage()}</div> */}
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

export default connect(mapStateToProps, {
  giveAdminPermission,
  takeAdminPermission,
})(SuperAdminPermPage);
