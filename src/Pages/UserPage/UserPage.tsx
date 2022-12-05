import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import "./UserPage.css";
import { connect } from "react-redux";
import documents from "../../Data/documentsA";
import { saveAs } from "file-saver";
import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";

const UserPage = ({ user }) => {
  const { username } = useParams();
  const [employee, setEmployee] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [files, setFiles] = useState(documents);
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [addressData, setAddressData] = useState({
    country: "",
    city: "",
    zipcode: "",
    street: "",
    buildingNumber: "",
    flatNumber: "",
    county: "",
  });

  function onSave(e) {
    e.preventDefault();
    setIsEditable(false);
    changeAddressInfo();
    window.location.reload();
  }
  function onCancel() {
    setIsEditable(false);
  }

  const getEmployee = () => {
    return fetch(
      `${process.env.REACT_APP_REMOTE_URL}/api/employment/info/${username}`,
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
        setEmployee(responseJson);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  };
  const onChange = (e) =>
    setAddressData({ ...addressData, [e.target.name]: e.target.value });

  const changeAddressInfo = () => {
    return fetch(
      `${process.env.REACT_APP_REMOTE_URL}/api/address/${username}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      }
    )
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
    getEmployee();
  }, []);

  const infoOfUser = () => (
    <div className="row">
      <div className="column col-lg-3">
        <img
          src={
            employee["user"] && employee["user"]["imageUrl"]
              ? employee["user"]["imageUrl"]
              : "https://i.imgur.com/teiJw8H.png"
          }
          className="profile-pic rounded-circle no-padding "
          height="200"
          width="200"
          alt="Avatar"
          loading="lazy"
        />
      </div>

      <div className="column col-lg-9">
        <MDBRow
          className="g-3"
          // tag="form"
          // onSubmit={(e) => onSubmit(e)}
        >
          <p>
            <p></p>
          </p>
          <MDBCol md="4" tag="form">
            <MDBInput
              type="text"
              className="form-control"
              id=""
              name="firstName"
              value={employee["user"] && employee["user"]["firstname"]}
              placeholder="Imię"
              readonly
            />
          </MDBCol>
          {employee["user"] && employee["user"]["middleName"] ? (
            <MDBCol md="4">
              <MDBInput
                type="text"
                className="form-control"
                id="floatingInput"
                name="middleName"
                value={employee["user"] && employee["user"]["middleName"]}
                placeholder="Drugie imię"
              />
            </MDBCol>
          ) : null}{" "}
          <MDBCol md="5">
            <MDBInput
              type="text"
              className="form-control"
              id="floatingInput"
              name="lastName"
              value={employee["user"] && employee["user"]["lastname"]}
              placeholder="Nazwisko"
              readonly
              required
            />
          </MDBCol>{" "}
          <div className="row"></div>
          <MDBCol md="3">
            <MDBInput
              type="text"
              className="form-control"
              id="floatingInput"
              name="username"
              value={employee["user"] && employee["user"]["username"]}
              // onChange={(e) => onChange(e)}
              readonly
              placeholder="Nazwa użytkownika"
            />
          </MDBCol>
          <MDBCol md="5">
            <MDBInput
              type="email"
              className="form-control"
              id="floatingInput"
              name="email"
              value={employee["user"] && employee["user"]["email"]}
              // onChange={(e) => onChange(e)}
              readonly
              placeholder="nazwa@przyklad.com"
            />
          </MDBCol>
        </MDBRow>
      </div>
    </div>
  );
  const adressInfo = () => (
    <div className="user-container top-space bottom-space">
      <div className="d-flex justify-content-end">
        {!isEditable ? (
          <button
            className="btn btn-info btn-sm "
            id="emp-info-edit-btn"
            onClick={() => setIsEditable(true)}
          >
            <span className="fa fa-pencil fa-little"></span>
          </button>
        ) : (
          <p>
            <p></p>
          </p>
        )}
      </div>
      <h1 className="caption">Infomacje adresowe</h1>

      <hr></hr>

      <div className="row">
        {isEditable ? (
          <MDBRow className="g-3" tag="form" onSubmit={(e) => onSave(e)}>
            <MDBCol md="4">
              <MDBInput
                type="text"
                className="form-control"
                id="country"
                name="country"
                onChange={(e) => onChange(e)}
                placeholder="Kraj"
                required
              />
            </MDBCol>
            <MDBCol md="5">
              <MDBInput
                type="text"
                className="form-control"
                id="country"
                name="county"
                onChange={(e) => onChange(e)}
                placeholder="Województwo/Prowincja"
              />
            </MDBCol>
            <div className="row"></div>
            <MDBCol md="5">
              <MDBInput
                type="text"
                className="form-control"
                id="street"
                name="street"
                onChange={(e) => onChange(e)}
                placeholder="Ulica"
              />
            </MDBCol>
            <MDBCol md="2">
              <MDBInput
                type="text"
                className="form-control"
                id="buildingNumber"
                name="buildingNumber"
                onChange={(e) => onChange(e)}
                placeholder="Nr domu"
                required
              />
            </MDBCol>
            <MDBCol md="3">
              <MDBInput
                type="text"
                className="form-control"
                id="flatNumber"
                name="flatNumber"
                // value={employee["address"] && employee["address"]["flatNumber"]}
                onChange={(e) => onChange(e)}
                placeholder="Nr mieszkania"
                // readOnly={!isEditable}
              />
            </MDBCol>
            <div className="row"></div>
            <MDBCol md="3">
              <MDBInput
                type="text"
                pattern="[0-9]{2}-[0-9]{3}"
                className="form-control"
                id="zipcode"
                name="zipcode"
                // value={employee["address"] && employee["address"]["zipcode"]}
                onChange={(e) => onChange(e)}
                placeholder="NN-NNN"
                // readOnly={!isEditable}
              />
            </MDBCol>
            <MDBCol md="5">
              {!isEditable ? (
                <MDBInput
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={employee["address"] && employee["address"]["city"]}
                  placeholder="Miasto"
                  readOnly={!isEditable}
                />
              ) : (
                <MDBInput
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  placeholder="Miasto"
                  readOnly={!isEditable}
                />
              )}
            </MDBCol>
            <div className="d-flex justify-content-end">
              <div className="d-flex justify-content-end">
                {" "}
                <button
                  type="submit"
                  className="btn btn-primary btn-sm "
                  id="emp-primary-edit-btn"
                  // onClick={() => onSave()}
                >
                  Zapisz
                </button>
              </div>
              <div className="d-flex justify-content-end">
                {" "}
                <button
                  className="btn btn-danger btn-sm "
                  id="emp-danger-edit-btn"
                  onClick={() => onCancel()}
                >
                  Anuluj
                </button>
              </div>
            </div>
          </MDBRow>
        ) : (
          <MDBRow className="g-3">
            <MDBCol md="4">
              <MDBInput
                type="text"
                className="form-control"
                id="country"
                name="country"
                value={employee["address"] && employee["address"]["country"]}
                // onChange={(e) => onChange(e)}
                placeholder="Kraj"
                readOnly={!isEditable}
              />
            </MDBCol>
            <MDBCol md="5">
              <MDBInput
                type="text"
                className="form-control"
                id="country"
                name="county"
                value={
                  employee["address"] && employee["address"]["county"] != null
                    ? employee["address"]["county"]
                    : "-"
                }
                // onChange={(e) => onChange(e)}
                placeholder="Województwo/Prowincja"
                readOnly={!isEditable}
              />
            </MDBCol>
            <div className="row"></div>
            <MDBCol md="5">
              <MDBInput
                type="text"
                className="form-control"
                id="street"
                name="street"
                value={employee["address"] && employee["address"]["street"]}
                // onChange={(e) => onChange(e)}
                placeholder="Ulica"
                readOnly={!isEditable}
              />
            </MDBCol>
            <MDBCol md="2">
              <MDBInput
                type="text"
                className="form-control"
                id="buildingNumber"
                name="buildingNumber"
                value={
                  employee["address"] && employee["address"]["buildingNumber"]
                }
                // onChange={(e) => onChange(e)}
                placeholder="Nr domu"
                readOnly={!isEditable}
                // required
              />
            </MDBCol>
            <MDBCol md="3">
              <MDBInput
                type="text"
                className="form-control"
                id="flatNumber"
                name="flatNumber"
                value={employee["address"] && employee["address"]["flatNumber"]}
                // onChange={(e) => onChange(e)}
                placeholder="Nr mieszkania"
                readOnly={!isEditable}
              />
            </MDBCol>
            <div className="row"></div>
            <MDBCol md="3">
              <MDBInput
                type="text"
                pattern="[0-9]{2}-[0-9]{3}"
                className="form-control"
                id="zipcode"
                name="zipcode"
                value={employee["address"] && employee["address"]["zipcode"]}
                // onChange={(e) => onChange(e)}
                placeholder="NN-NNN"
                readOnly={!isEditable}
              />
            </MDBCol>
            <MDBCol md="5">
              {!isEditable ? (
                <MDBInput
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={employee["address"] && employee["address"]["city"]}
                  placeholder="Miasto"
                  readOnly={!isEditable}
                />
              ) : (
                <MDBInput
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  placeholder="Miasto"
                  readOnly={!isEditable}
                />
              )}
            </MDBCol>
            <p>
              <p></p>
            </p>
          </MDBRow>
        )}
      </div>
    </div>
  );

  return (
    <div className="backgd d-flex flex-column min-vh-100">
      <div className="user-container top-space bottom-space">
        <h1 className="caption">Dane osobowe</h1>
        <hr></hr>
        <h4 className="userPage-text mt-3"> </h4>
        {user !== null ? infoOfUser() : "Osoba niezalogowana "}
      </div>
      {employee && employee["user"] ? adressInfo() : "Osoba niezalogowana "}
      <div className="user-container top-space bottom-space">
        <h1 className="column col-lg-3 caption">Adres</h1>
        <hr></hr>
        <h4 className="userPage-text mt-3">
          {/* {user !== null ? adressInfo() : "Osoba niezalogowana "} */}
        </h4>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(UserPage);
