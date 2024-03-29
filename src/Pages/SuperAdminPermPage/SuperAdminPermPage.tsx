import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { giveAdminPermission, takeAdminPermission } from "../../Actions/auth";
import {
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBRow,
} from "mdb-react-ui-kit";

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
    window.location.reload();
  }
  function takeAdminPermissions() {
    takePermToggleShow();
    setInfoMessage("");
    takeAdminPermission(username);
    setInfoMessage("Rola Administratora została odebrana");
    window.location.reload();
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
      <div className="center top-space">
        {!checkIfUserIsSuperAdmin() ? (
          <div>
            {checkIfUserIsAdmin() ? (
              <MDBRow className="g-3">
                <button
                  className="w-100 btn btn-bold text-center-dark btn-danger btn-lg "
                  onClick={takePermToggleShow}
                >
                  Revoke administrator privileges
                </button>
                <MDBModal
                  show={takePermModal}
                  setShow={setTakePermModal}
                  tabIndex="-1"
                >
                  <MDBModalDialog>
                    <MDBModalContent>
                      <MDBModalHeader>
                        <button
                          className="btn-close"
                          color="none"
                          onClick={takePermToggleShow}
                        ></button>
                      </MDBModalHeader>
                      <MDBModalBody>
                        Are you sure to revoke administrator rights?
                      </MDBModalBody>

                      <MDBModalFooter>
                        <button color="secondary" onClick={takePermToggleShow}>
                          Cancel
                        </button>
                        <button
                          color="danger"
                          onClick={(e) => takeAdminPermissions()}
                        >
                          Yes
                        </button>
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
                    <button
                      className="w-100 btn-bold btn-lg button-blue-3"
                      onClick={givePermToggleShow}
                    >
                      Grant administrator privileges
                    </button>
                    <MDBModal
                      show={givePermModal}
                      setShow={setGivePermModal}
                      tabIndex="-2"
                    >
                      <MDBModalDialog>
                        <MDBModalContent>
                          <MDBModalHeader>
                            <button
                              className="btn-close"
                              color="none"
                              onClick={givePermToggleShow}
                            ></button>
                          </MDBModalHeader>
                          <MDBModalBody>
                            Are you sure to grant administrator privileges?
                          </MDBModalBody>

                          <MDBModalFooter>
                            <button
                              color="secondary"
                              onClick={givePermToggleShow}
                            >
                              Cancel
                            </button>
                            <button
                              color="primary"
                              onClick={(e) => giveAdminPermissions()}
                            >
                              Yes
                            </button>
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
              <button
                className="btn shadow w-100 btn-danger text-center-dark  btn-lg "
                onClick={deleteUserToggleShow}
              >
                <MDBIcon fas icon="trash-alt" /> Delete user
              </button>
              <MDBModal
                show={deleteUserModal}
                setShow={setDeleteUserModal}
                tabIndex="-3"
              >
                <MDBModalDialog>
                  <MDBModalContent>
                    <MDBModalHeader>
                      <button
                        className="btn-close"
                        color="none"
                        onClick={deleteUserToggleShow}
                      ></button>
                    </MDBModalHeader>
                    <MDBModalBody>
                      You intend to delete a user. This action cannot be undone.
                      Are you sure you want to continue?
                    </MDBModalBody>

                    <MDBModalFooter>
                      <button color="secondary" onClick={deleteUserToggleShow}>
                        Cancel
                      </button>
                      <button
                        color="danger"
                        onClick={(e) => onDeleteUserAccount()}
                      >
                        Yes
                      </button>
                    </MDBModalFooter>
                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>
            </MDBRow>
          </div>
        ) : (
          <div className="empty-container center">
            <h2
              color="danger"
              className=" text-danger fw-bold text-center-light flex-center"
            >
              The user is a Super Administrator
            </h2>
          </div>
        )}
        <MDBModal
          show={deleteFailInfoModal}
          setShow={setDeleteFailInfoModal}
          tabIndex="-2"
        >
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <button
                  className="btn-close"
                  color="none"
                  onClick={deleteFailInfoToggleShow}
                ></button>
              </MDBModalHeader>
              <MDBModalBody>
                The given employee cannot be deleted because they is the leader
                of of at least one team! To remove a user, set up new team
                leaders.
              </MDBModalBody>

              <MDBModalFooter>
                <button color="secondary" onClick={deleteFailInfoToggleShow}>
                  Understand
                </button>
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
