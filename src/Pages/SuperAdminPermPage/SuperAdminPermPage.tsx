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
  const [canDeleteUser, setCanDeleteUser] = useState(false);
  const [givePermModal, setGivePermModal] = useState(false);
  const [takePermModal, setTakePermModal] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [deleteFailInfoModal, setDeleteFailInfoModal] = useState(false);
  const givePermToggleShow = () => setGivePermModal(!givePermModal);
  const takePermToggleShow = () => setTakePermModal(!takePermModal);
  const deleteUserToggleShow = () => setDeleteUserModal(!deleteUserModal);
  const deleteFailInfoToggleShow = () =>
    setDeleteFailInfoModal(!deleteFailInfoModal);

  function giveAdminPermissions() {
    givePermToggleShow();
    setInfoMessage("");
    giveAdminPermission(username);
    setInfoMessage("Rola Administratora została poprawnie nadana");
  }
  function takeAdminPermissions() {
    takePermToggleShow();
    setInfoMessage("");
    takeAdminPermission(username);
    setInfoMessage("Rola Administratora została odebrana");
  }
  function onDeleteUserAccount() {
    deleteUserToggleShow();
    deleteUserAccount();
    if (!checkIfUserIsManager()) {
      window.location.replace("/pracownicy");
    } else {
      setDeleteFailInfoModal(true);
    }
  }

  function checkIfUserIsAdmin(): boolean {
    console.log(employee);
    if (employee != null) {
      for (var r of employee["roles"]) {
        if (r["roleName"] == "ROLE_HR_ADMIN") return true;
      }
    }
    return false;
  }

  function checkIfUserIsSuperAdmin(): boolean {
    if (employee != null) {
      for (var r of employee["roles"]) {
        if (r["roleName"] == "ROLE_SUPER_ADMIN") return true;
      }
    }
  }

  function checkIfUserIsManager(): boolean {
    if (employee != null) {
      for (var r of employee["roles"]) {
        if (r["roleName"] == "ROLE_MANAGER") return true;
      }
    }
  }

  function checkIfLoggedUserSuperAdmin(): boolean {
    if (user != null && user.roles != null)
      for (var i of user.roles) {
        if (i == "ROLE_SUPER_ADMIN") return true;
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

  const deleteUserAccount = () => {
    return fetch(
      `${process.env.REACT_APP_REMOTE_URL}/api/user/delete/${username}`,
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
        // setEmployee(responseJson);
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
        {!checkIfUserIsSuperAdmin() ? (
          <div>
            {checkIfUserIsAdmin() ? (
              <MDBRow className="g-3">
                <MDBBtn
                  className="w-100 btn-danger btn-lg "
                  onClick={takePermToggleShow}
                >
                  Odbierz uprawnienia administratora
                </MDBBtn>
                <MDBModal
                  show={takePermModal}
                  setShow={setTakePermModal}
                  tabIndex="-1"
                >
                  <MDBModalDialog>
                    <MDBModalContent>
                      <MDBModalHeader>
                        <MDBBtn
                          className="btn-close"
                          color="none"
                          onClick={takePermToggleShow}
                        ></MDBBtn>
                      </MDBModalHeader>
                      <MDBModalBody>
                        Czy na pewno odebrać prawa administratora?
                      </MDBModalBody>

                      <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={takePermToggleShow}>
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
              <div>
                {checkIfLoggedUserSuperAdmin() ? (
                  <MDBRow className="g-3">
                    <MDBBtn
                      className="w-100 btn btn-lg button-blue"
                      onClick={givePermToggleShow}
                    >
                      Nadaj rolę administratora
                    </MDBBtn>
                    <MDBModal
                      show={givePermModal}
                      setShow={setGivePermModal}
                      tabIndex="-2"
                    >
                      <MDBModalDialog>
                        <MDBModalContent>
                          <MDBModalHeader>
                            <MDBBtn
                              className="btn-close"
                              color="none"
                              onClick={givePermToggleShow}
                            ></MDBBtn>
                          </MDBModalHeader>
                          <MDBModalBody>
                            Czy na pewno nadać prawa administratora?
                          </MDBModalBody>

                          <MDBModalFooter>
                            <MDBBtn
                              color="secondary"
                              onClick={givePermToggleShow}
                            >
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
                    {infoMessage != null &&
                    infoMessage != "" &&
                    errors == null ? (
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
                ) : null}
              </div>
            )}
            <p>
              <p></p>
            </p>
            <MDBRow className="g-3">
              <MDBBtn
                className="w-100 btn-danger btn-lg "
                onClick={deleteUserToggleShow}
              >
                Usuń użytkownika
              </MDBBtn>
              <MDBModal
                show={deleteUserModal}
                setShow={setDeleteUserModal}
                tabIndex="-3"
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
                      Zamierzasz usunąć użytkownika. Tej czynności nie można
                      cofnąć. Czy na pewno chcesz kontynuować?
                    </MDBModalBody>

                    <MDBModalFooter>
                      <MDBBtn color="secondary" onClick={deleteUserToggleShow}>
                        Anuluj
                      </MDBBtn>
                      <MDBBtn
                        color="danger"
                        onClick={(e) => onDeleteUserAccount()}
                      >
                        Tak
                      </MDBBtn>
                    </MDBModalFooter>
                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>
            </MDBRow>
          </div>
        ) : (
          <h2 color="danger" className="flex-center">
            Użytkownik jest Super Administratorem
          </h2>
        )}
        <MDBModal
          show={deleteFailInfoModal}
          setShow={setDeleteFailInfoModal}
          tabIndex="-2"
        >
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={deleteFailInfoToggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                Podany pracownik nie może zostać usunięty, ponieważ jest liderem
                przynajmniej jednego zespołu! Aby usunąć użytkonika, ustaw
                nowych kieroników zespołów.
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={deleteFailInfoToggleShow}>
                  Rozumiem
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
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
