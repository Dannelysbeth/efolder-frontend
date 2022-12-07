import React from "react";
import { useEffect, useState } from "react";
import { loadUser, changePassword } from "../../Actions/auth";

import { connect } from "react-redux";
import { MDBInput, MDBRow, MDBCol } from "mdb-react-ui-kit";

const ProfilePage = ({ user }) => {
  const [employee, setEmployee] = useState([]);
  const [isAddrEditable, setIsAddrEditable] = useState(false);

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

  function onAddrSave(e) {
    e.preventDefault();
    setIsAddrEditable(false);
    changeAddressInfo();
    window.location.reload();
  }
  function onAddrCancel() {
    setIsAddrEditable(false);
  }
  const onAddrChange = (e) =>
    setAddressData({ ...addressData, [e.target.name]: e.target.value });

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
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  };
  const changeAddressInfo = () => {
    return fetch(`${process.env.REACT_APP_REMOTE_URL}/api/address`, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addressData),
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
            className="btn btn-info btn-sm "
            id="emp-info-edit-btn"
            onClick={() => setIsAddrEditable(true)}
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
              <div className="d-flex justify-content-end">
                {" "}
                <button
                  type="submit"
                  className="btn btn-primary btn-sm "
                  id="emp-primary-edit-btn"
                >
                  Zapisz
                </button>
              </div>
              <div className="d-flex justify-content-end">
                {" "}
                <button
                  className="btn btn-danger btn-sm "
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
        <p>
          <p></p>
        </p>
      </div>
      <h1 className="caption">Infomacje o zatrudnieniu</h1>
      <hr></hr>
      <div className="row">
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
                employee["employment"] && employee["employment"]["positionName"]
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
      </div>
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
          <div className="user-container top-space bottom-space">
            <h1 className="caption">Dane osobowe</h1>
            <hr></hr>
            <h4 className="userPage-text mt-3"> </h4>
            {infoOfUser()}
          </div>
          {checkIfRegularEmployee() ? adressInfo() : null}
          {checkIfRegularEmployee() ? employmentInfo() : null}
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
export default connect(mapStateToProps, { changePassword })(ProfilePage);
