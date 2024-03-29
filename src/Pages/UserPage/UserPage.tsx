import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";

const UserPage = () => {
  const { username } = useParams();
  const [employee, setEmployee] = useState([]);
  const [isAddrEditable, setIsAddrEditable] = useState(false);
  const [isEmpEditable, setIsEmpEditable] = useState(false);
  const [hrAdmins, setHrAdmins] = useState([]);
  const [teams, setTeams] = useState([]);
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
      .catch(() => {
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
      .catch(() => {
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
      .catch(() => {
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
      .catch(() => {
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
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    getEmployee();
    getHRUsers();
    getTeams();
  }, []);

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
      <h1 className="caption">Address information</h1>
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
                placeholder="Country"
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
                placeholder="State/Province"
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
                placeholder="Street"
              />
            </MDBCol>
            <MDBCol md="2">
              <MDBInput
                type="text"
                className="form-control"
                id="buildingNumber"
                name="buildingNumber"
                onChange={(e) => onAddrChange(e)}
                placeholder="Building nr"
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
                placeholder="Apartment nr"
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
                placeholder="City"
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
                >
                  Save
                </button>
              </div>
              <div className="d-flex justify-content-end center-text-3">
                {" "}
                <button
                  className="btn btn-secondary  "
                  id="emp-danger-edit-btn"
                  onClick={() => onAddrCancel()}
                >
                  Cancel
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
                placeholder="Country"
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
                placeholder="State/Province"
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
                placeholder="Street"
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
                placeholder="Building nr"
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
                placeholder="Apartment nr"
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
                placeholder="City"
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
      <h1 className="caption">Employment information</h1>
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
                  onChange={(e) => onEmpChange(e)}
                  placeholder="Team"
                >
                  <option value="" disabled selected>
                    No teams in the system
                  </option>
                </select>
              ) : (
                <select
                  className="form-select"
                  id="teamName"
                  name="teamName"
                  // value={teamName}
                  onChange={(e) => onEmpChange(e)}
                  placeholder="Team"
                  required
                >
                  <option selected disabled value="">
                    Choose team
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
                placeholder="Supervisor"
                readonly
              />
            </MDBCol>
            <div className="row"></div>

            <div className="row"></div>
            <MDBCol md="2">
              <MDBInput
                type="text"
                className="form-control"
                id="positionName"
                name="positionName"
                onChange={(e) => onEmpChange(e)}
                placeholder="Position"
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
                placeholder="Position description"
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
                  Save
                </button>
              </div>
              <div className="d-flex justify-content-end center-text-3">
                {" "}
                <button
                  className="btn btn-secondary  "
                  id="emp-danger-edit-btn"
                  onClick={() => onEmpCancel()}
                >
                  Cancel
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
                placeholder="Team name"
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
                placeholder="State/Province"
                readOnly
              />
            </MDBCol>
            <div className="row"></div>

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
                placeholder="Position"
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
                placeholder="Position description"
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
      {employee && employee["user"] ? adressInfo() : "Not logged user "}
      {employee && employee["user"] ? employmentInfo() : "Not logged user "}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(UserPage);
