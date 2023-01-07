import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
// import "./UserPage.css";
import { connect } from "react-redux";
import documents from "../../Data/documentsA";
import { saveAs } from "file-saver";
import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";

const UserPage = ({ user }) => {
  const { username } = useParams();
  const [employee, setEmployee] = useState([]);
  const [isAddrEditable, setIsAddrEditable] = useState(false);
  const [isEmpEditable, setIsEmpEditable] = useState(false);
  const [hrAdmins, setHrAdmins] = useState([]);
  const [teams, setTeams] = useState([]);
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
  const [employmentData, setEmploymentData] = useState({
    teamName: "",
    hrManager: "",
    username: username,
    positionName: "",
    positionDescription: "",
  });

  function onAddrSave(e) {
    e.preventDefault();
    setIsAddrEditable(false);
    changeAddressInfo();
    window.location.reload();
  }
  function onEmpSave(e) {
    e.preventDefault();
    setIsEmpEditable(false);
    changeEmploymentInfo();
    window.location.reload();
  }
  function onAddrCancel() {
    setIsAddrEditable(false);
  }
  function onEmpCancel() {
    setIsEmpEditable(false);
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
  const onAddrChange = (e) =>
    setAddressData({ ...addressData, [e.target.name]: e.target.value });

  const onEmpChange = (e) =>
    setEmploymentData({ ...employmentData, [e.target.name]: e.target.value });

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

  const changeEmploymentInfo = () => {
    return fetch(
      `${process.env.REACT_APP_REMOTE_URL}/api/employment/${username}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employmentData),
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
  const getHRUsers = () => {
    return fetch(`${process.env.REACT_APP_REMOTE_URL}/api/user/employee/all`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setHrAdmins(responseJson);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  };

  const getTeams = () => {
    return fetch(`${process.env.REACT_APP_REMOTE_URL}/api/team/all`, {
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

  useEffect(() => {
    getEmployee();
    getHRUsers();
    getTeams();
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
        <MDBRow className="g-3">
          <p>
            <p></p>
          </p>
          <MDBCol md="4" tag="form">
            <MDBInput
              type="text"
              className="form-control"
              id=""
              name="firstName"
              value={employee["user"] && employee["user"]["firstName"]}
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
                readonly
              />
            </MDBCol>
          ) : null}{" "}
          <MDBCol md="5">
            <MDBInput
              type="text"
              className="form-control"
              id="floatingInput"
              name="lastName"
              value={employee["user"] && employee["user"]["lastName"]}
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
        {!isAddrEditable ? (
          <button
            className="btn btn-info btn-sm button-blue-2"
            id="emp-info-edit-btn"
            onClick={() => setIsAddrEditable(true)}
          >
            <span className="fa fa-pencil fa-little "></span>
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
        {isAddrEditable ? (
          <MDBRow className="g-3" tag="form" onSubmit={(e) => onAddrSave(e)}>
            <MDBCol md="4">
              <MDBInput
                type="text"
                className="form-control"
                id="country"
                name="country"
                onChange={(e) => onAddrChange(e)}
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
                onChange={(e) => onAddrChange(e)}
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
                onChange={(e) => onAddrChange(e)}
                placeholder="Ulica"
              />
            </MDBCol>
            <MDBCol md="2">
              <MDBInput
                type="text"
                className="form-control"
                id="buildingNumber"
                name="buildingNumber"
                onChange={(e) => onAddrChange(e)}
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
                onChange={(e) => onAddrChange(e)}
                placeholder="Nr mieszkania"
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
                onChange={(e) => onAddrChange(e)}
                placeholder="NN-NNN"
              />
            </MDBCol>
            <MDBCol md="5">
              <MDBInput
                type="text"
                className="form-control"
                id="city"
                name="city"
                onChange={(e) => onAddrChange(e)}
                placeholder="Miasto"
                required
              />
            </MDBCol>
            <div className="d-flex justify-content-end">
              <div className="d-flex justify-content-end center-text-3">
                {" "}
                <button
                  type="submit"
                  className="btn btn-primary "
                  id="emp-primary-edit-btn"

                  // onClick={() => onSave()}
                >
                  Zapisz
                </button>
              </div>
              <div className="d-flex justify-content-end center-text-3">
                {" "}
                <button
                  className="btn btn-secondary  "
                  id="emp-danger-edit-btn"
                  onClick={() => onAddrCancel()}
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
                placeholder="Kraj"
                readOnly
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
                placeholder="Województwo/Prowincja"
                readOnly
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
                placeholder="Ulica"
                readOnly
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
                placeholder="Nr domu"
                readOnly
              />
            </MDBCol>
            <MDBCol md="3">
              <MDBInput
                type="text"
                className="form-control"
                id="flatNumber"
                name="flatNumber"
                value={employee["address"] && employee["address"]["flatNumber"]}
                placeholder="Nr mieszkania"
                readOnly
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
                placeholder="NN-NNN"
                readOnly
              />
            </MDBCol>
            <MDBCol md="5">
              <MDBInput
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={employee["address"] && employee["address"]["city"]}
                placeholder="Miasto"
                readOnly
              />
            </MDBCol>
            <p>
              <p></p>
            </p>
          </MDBRow>
        )}
      </div>
    </div>
  );

  const employmentInfo = () => (
    <div className="user-container top-space bottom-space">
      <div className="d-flex justify-content-end">
        {!isEmpEditable ? (
          <button
            className="btn btn-info btn-sm button-blue-2"
            id="emp-info-edit-btn"
            onClick={() => setIsEmpEditable(true)}
          >
            <span className="fa fa-pencil fa-little"></span>
          </button>
        ) : (
          <p>
            <p></p>
          </p>
        )}
      </div>
      <h1 className="caption">Infomacje o zatrudnieniu</h1>
      <hr></hr>
      <div className="row">
        {isEmpEditable ? (
          <MDBRow className="g-3" tag="form" onSubmit={(e) => onEmpSave(e)}>
            <MDBCol md="4">
              {teams.length === 0 ? (
                <select
                  className="form-select"
                  id="teamName"
                  name="teamName"
                  // value={teamName}
                  onChange={(e) => onEmpChange(e)}
                  placeholder="Zespół"
                >
                  <option value="" disabled selected>
                    Brak zespołów HR w systemie
                  </option>
                </select>
              ) : (
                <select
                  className="form-select"
                  id="teamName"
                  name="teamName"
                  // value={teamName}
                  onChange={(e) => onEmpChange(e)}
                  placeholder="Zespół"
                  required
                >
                  <option selected disabled value="">
                    Wybierz dział
                  </option>
                  {teams.map((team) => (
                    <option value={team["name"]}>
                      {team["description"]} ({team["name"]})
                    </option>
                  ))}
                </select>
              )}
            </MDBCol>
            <MDBCol md="5">
              <MDBInput
                type="text"
                className="form-control"
                id="supervisor"
                name="supervisor"
                value={
                  employee["employment"] && employee["employment"]["supervisor"]
                }
                placeholder="Przełożony"
                readonly
              />
            </MDBCol>
            <div className="row"></div>
            <MDBCol md="5">
              {hrAdmins.length === 0 ? (
                <select
                  className="form-select"
                  id="hrManager"
                  name="hrManager"
                  // value={hrManager}
                  onChange={(e) => onEmpChange(e)}
                  aria-label="Administartor HR"
                >
                  <option value="" disabled selected>
                    Brak managerów HR w systemie
                  </option>
                </select>
              ) : (
                <select
                  className="form-select"
                  id="hrManager"
                  name="hrManager"
                  // value={hrManager}
                  onChange={(e) => onEmpChange(e)}
                  placeholder="Administartor HR"
                  required
                >
                  <option selected disabled value="">
                    Wybierz administratora HR
                  </option>
                  {hrAdmins.map((hrAdmin) => (
                    <option value={hrAdmin["username"]}>
                      {hrAdmin["firstName"]} {hrAdmin["lastName"]} (
                      {hrAdmin["username"]})
                    </option>
                  ))}
                </select>
              )}
            </MDBCol>
            <div className="row"></div>
            <MDBCol md="2">
              <MDBInput
                type="text"
                className="form-control"
                id="positionName"
                name="positionName"
                onChange={(e) => onEmpChange(e)}
                placeholder="Stanowisko"
                required
              />
            </MDBCol>
            <MDBCol md="3">
              <MDBInput
                type="text"
                className="form-control"
                id="positionDescription"
                name="positionDescription"
                onChange={(e) => onEmpChange(e)}
                placeholder="Opis stanowiska"
              />
            </MDBCol>

            <div className="d-flex justify-content-end">
              <div className="d-flex justify-content-end center-text-3">
                {" "}
                <button
                  type="submit"
                  className="btn btn-primary "
                  id="emp-primary-edit-btn"
                >
                  Zapisz
                </button>
              </div>
              <div className="d-flex justify-content-end center-text-3">
                {" "}
                <button
                  className="btn btn-secondary  "
                  id="emp-danger-edit-btn"
                  onClick={() => onEmpCancel()}
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
                id="teamName"
                name="teamName"
                value={
                  employee["employment"] && employee["employment"]["teamName"]
                }
                placeholder="Nazwa działu"
                readOnly
              />
            </MDBCol>
            <MDBCol md="5">
              <MDBInput
                type="text"
                className="form-control"
                id="supervisor"
                name="supervisor"
                value={
                  employee["employment"] && employee["employment"]["supervisor"]
                }
                placeholder="Województwo/Prowincja"
                readOnly
              />
            </MDBCol>
            <div className="row"></div>
            <MDBCol md="5">
              <MDBInput
                type="text"
                className="form-control"
                id="hrManager"
                name="hrManager"
                value={
                  employee["employment"] && employee["employment"]["hrManager"]
                }
                placeholder="Administrator kadr"
                readOnly
              />
            </MDBCol>
            <div className="row"></div>
            <MDBCol md="2">
              <MDBInput
                type="text"
                className="form-control"
                id="positionName"
                name="positionName"
                value={
                  employee["employment"] &&
                  employee["employment"]["positionName"]
                }
                placeholder="Stanowisko"
                readOnly
              />
            </MDBCol>
            <MDBCol md="3">
              <MDBInput
                type="text"
                className="form-control"
                id="positionDescription"
                name="positionDescription"
                value={
                  employee["employment"] &&
                  employee["employment"]["positionDescription"]
                }
                placeholder="Opis stanowiska"
                readOnly
              />
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
    <div className=" d-flex flex-column min-vh-100">
      {employee && employee["user"] ? adressInfo() : "Osoba niezalogowana "}
      {employee && employee["user"] ? employmentInfo() : "Osoba niezalogowana "}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(UserPage);
