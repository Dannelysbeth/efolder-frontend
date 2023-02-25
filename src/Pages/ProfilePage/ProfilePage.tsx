import React from "react";
import { useEffect, useState } from "react";
import { loadUser, changePassword } from "../../Actions/auth";

import { connect } from "react-redux";
import {
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
} from "mdb-react-ui-kit";
import Avatar from "react-avatar-edit";
import { uploadOwnProfilePic } from "../../Actions/auth";
import { Link, Outlet } from "react-router-dom";

const ProfilePage = ({ user, uploadOwnProfilePic }) => {
  const [employee, setEmployee] = useState([]);
  const [isAddrEditable, setIsAddrEditable] = useState(false);
  const [profilePictureModal, setProfilePictureModal] = useState(false);
  const profilePictureToggleShow = () =>
    setProfilePictureModal(!profilePictureModal);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const getEmployee = () => {
    return fetch(`${process.env.REACT_APP_REMOTE_URL}/api/employment/info`, {
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
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  const [src, setSrc] = useState(null);
  const [file, setFile] = useState(null);

  const onClose = () => {
    setFile(null);
  };
  const onCrop = (view) => {
    setFile(view);
  };

  function blobToFile(theBlob, fileName) {
    var arr = theBlob.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  }

  const submitPic = () => {
    var fil = blobToFile(file, "hello.png");
    console.log(fil);
    uploadOwnProfilePic(fil);
    window.location.reload();
  };
  const onBeforeFileLoad = (view) => {
    if (view.target.files[0].size > 10000000) {
      alert("Plik jest za duży!");
      view.target.value = "";
    }
  };

  useEffect(() => {
    console.log(file);
  }, [file]);

  const containerStyles = {
    // objectFit="scale-down",
    backgroundSize: "cover",
    backgroundColor: "#ffff", // zielony kolor tła
    width: "500px",
    height: "500px",
    margin: "auto", // wyśrodkowanie w obu płaszczyznach
    borderRadius: "10px", // zaokrąglenie krawędzi o promieniu 10px
  };

  const userBasicInfoPanel = () => (
    <div>
      <div className="">
        <div className="center">
          <div
            className="profile-picture-2 "
            onClick={profilePictureToggleShow}
          >
            <img
              src={
                employee["user"] && employee["user"]["imageUrl"]
                  ? employee["user"]["imageUrl"]
                  : "https://i.imgur.com/teiJw8H.png"
              }
              // className="profile-picture-2 "
              height="200"
              width="200"
              alt=""
              loading="lazy"
            />
          </div>
          <MDBModal
            show={profilePictureModal}
            setShow={setProfilePictureModal}
            tabIndex="-1"
          >
            <MDBModalDialog className="modal-dialog modal-dialog-centered">
              <MDBModalContent>
                <MDBModalBody className="user-container-picture-picker ">
                  <div>
                    <p>
                      <p></p>
                    </p>
                    <div
                      style={containerStyles}
                      className="d-flex justify-content-center"
                    >
                      <Avatar
                        // object-fit="scale-down"
                        background-size="cover"
                        width={500}
                        height={500}
                        onCrop={onCrop}
                        onClose={onClose}
                        label="Wybierz zdjęcie"
                        onBeforeFileLoad={onBeforeFileLoad}
                        src={src}
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      {file != null ? (
                        <div>
                          <p>
                            <p></p>
                          </p>
                          <button
                            className="btn btn-lg button-blue-2"
                            onClick={() => submitPic()}
                          >
                            Wybierz
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </MDBModalBody>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </div>
        <div className="row user-container-2 justify-content-center center">
          <h3 className="justify-content-center center-text-2">
            {employee["user"] && employee["user"]["firstName"]}{" "}
            {employee["user"] && employee["user"]["middleName"]
              ? employee["user"] && employee["user"]["middleName"] + " "
              : null}
            {employee["user"] && employee["user"]["lastName"]} (
            {employee["user"] && employee["user"]["username"]})
          </h3>
          <div className="h6 font-weight-500 center-text-2">
            <i className="ni location_pin mr-2"></i>
            {employee["address"] && employee["user"]["email"]}
          </div>
          <div className="h5 center">
            <i className="ni location_pin mr-2"></i>
            {employee["address"] && employee["address"]["city"]},{" "}
            {employee["address"] && employee["address"]["country"]}
          </div>{" "}
          <div className="h4 font-weight-500 center-text-2">
            <i className="ni business_briefcase-24 mr-2"></i>
            {employee["employment"] && employee["employment"]["positionName"]}
          </div>
          <div className="center-text-2">
            <i className="ni education_hat mr-2 "></i>
            {employee["employment"] && employee["employment"]["teamName"]}
          </div>
        </div>
      </div>
      <div>
        <div className="productsNav">
          <ul className="nav center">
            {checkIfRegularEmployee() == true ? (
              <li className="center">
                <Link
                  className="btn btn-lg button-blue-3"
                  to={{ pathname: `/profil/info` }}
                >
                  {" "}
                  Dane osobowe{" "}
                </Link>
              </li>
            ) : null}
            {checkIfRegularEmployee() == true ? (
              <li className="center">
                <Link
                  className="btn btn-lg button-blue-3"
                  to={{ pathname: `/profil/dokumenty` }}
                >
                  {" "}
                  Kartoteka{" "}
                </Link>
              </li>
            ) : null}
            {checkIfRegularEmployee() == true ? (
              <li className="center">
                <Link
                  className="btn btn-lg button-blue-3"
                  to={{ pathname: `/profil/dodajDokumenty` }}
                >
                  {" "}
                  <text className="center-text-2">Dodaj dokumenty </text>
                </Link>
              </li>
            ) : null}

            <li className="center">
              <Link
                className="btn btn-lg button-blue-3"
                to={{ pathname: `/profil/zmienHaslo` }}
              >
                Zmień hasło
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );

  useEffect(() => {
    loadUser();
    getEmployee();
  }, []);

  function checkIfLogged(): boolean {
    loadUser();
    if (user !== null) return true;
    return false;
  }

  function checkIfRegularEmployee(): boolean {
    if (user != null && user.roles != null)
      for (var i of user.roles) {
        if (i == "ROLE_REGULAR_EMPLOYEE") return true;
      }
    return false;
  }

  return (
    <div>
      {checkIfLogged() ? (
        <div className="backgd d-flex flex-column min-vh-100">
          {userBasicInfoPanel()}
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, {
  changePassword,
  uploadOwnProfilePic,
})(ProfilePage);
