import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import "./UserPage.css";
import a_documents from "../../Data/documentsA";
import List from "../MyDocumentsPage/DocumentList";

import { connect } from "react-redux";

const AnotherUserPage = ({ user }) => {
  const { username } = useParams();
  const [aFiles, setAFiles] = useState(a_documents);
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

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
  useEffect(() => {
    getEmployee();
  }, []);

  const infoOfUser = () => (
    <div className="row">
      <div className="row user-container">
        <div className="col-xl-7 order-xl-2">
          <div className="">
            <div className="card-header ">
              <div className="row align-items-center">
                <h3 className="mb-0">Dane osobowe</h3>
              </div>
            </div>
            <div className="card-body">
              <form>
                <h6 className="heading-small text-muted mb-4 position-relative">
                  Infomacje o zatrudnieniu{"    "}
                </h6>
                <div className="pl-lg-4">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group focused">
                        <label className="form-control-label-user-page input-username">
                          Stanowisko
                        </label>
                        <input
                          type="text"
                          id="input-username"
                          className="form-control form-control-alternative"
                          placeholder="Username"
                          value="Java Dev"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-control-label-user-page input-email">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="input-email"
                          className="form-control form-control-alternative"
                          // placeholder="adress email"
                          value={employee["user"] && employee["user"]["email"]}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group focused">
                        <label className="form-control-label-user-page input-first-name">
                          First name
                        </label>
                        <input
                          type="text"
                          id="input-first-name"
                          className="form-control form-control-alternative"
                          placeholder="First name"
                          value={
                            employee["user"] && employee["user"]["firstName"]
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group focused">
                        <label className="form-control-label-user-page input-last-name">
                          Last name
                        </label>
                        <input
                          type="text"
                          id="input-last-name"
                          className="form-control form-control-alternative"
                          placeholder="Last name"
                          value={
                            employee["user"] && employee["user"]["lastName"]
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
                {/* <!-- Address --> */}
                <h6 className="heading-small text-muted mb-4 position-relative">
                  Informacje adresowe
                  <a
                    href="#"
                    className="btn btn-info btn-sm position-absolute top-0 end-0 "
                    id="emp-info-edit-btn"
                  >
                    <span className="fa fa-pencil fa-little"></span>
                  </a>
                </h6>
                <div className="pl-lg-4">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group focused">
                        <label className="form-control-label-user-page input-country">
                          Kraj
                        </label>
                        <input
                          id="input-country"
                          className="form-control form-control-alternative"
                          placeholder="Country"
                          value="United States"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group focused">
                        <label className="form-control-label-user-page input-country">
                          Województwo
                        </label>
                        <input
                          id="input-country"
                          className="form-control form-control-alternative"
                          placeholder="Country"
                          value="United States"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group focused">
                        <label className="form-control-label-user-page input-address">
                          Ulica
                        </label>
                        <input
                          id="input-address"
                          className="form-control form-control-alternative"
                          placeholder="Home Address"
                          value="Ulica"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="form-group focused">
                        <label className="form-control-label-user-page input-address">
                          Numer domu
                        </label>
                        <input
                          id="input-house-number"
                          className="form-control form-control-alternative"
                          placeholder="Numer domu"
                          value=""
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="form-group focused">
                        <label className="form-control-label-user-page input-address">
                          Numer mieszkania
                        </label>
                        <input
                          id="input-flat-number"
                          className="form-control form-control-alternative"
                          placeholder="Numer mieszkania"
                          value=""
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group focused">
                        <label className="form-control-label-user-page input-country">
                          Kod pocztowy
                        </label>
                        <input
                          type="text"
                          id="input-postal-code"
                          className="form-control form-control-alternative"
                          placeholder="Kod pocztowy"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group focused">
                        <label className="form-control-label-user-page input-city">
                          Miasto
                        </label>
                        <input
                          type="text"
                          id="input-city"
                          className="form-control form-control-alternative"
                          placeholder="City"
                          value="New York"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
              </form>
            </div>
          </div>
          <div className="card-header ">
            <div className="row align-items-center">
              <div className="col-7">
                <h3 className="mb-0">Dodaj dokumenty</h3>
              </div>
            </div>
          </div>
          <div className="card-body">
            <form className="was-validated">
              <div className="form-group">
                <select className="custom-select" required>
                  <option value="">Wybierz kategorię dokumentu</option>
                  <option value="1">A</option>
                  <option value="2">B</option>
                  <option value="3">C</option>
                  <option value="4">D</option>
                </select>
                <div className="invalid-feedback">
                  Wymagane jest podanie kategorii
                </div>
              </div>

              <div className="custom-file">
                <label className="custom-file-label validatedCustomFile">
                  Wybierz dokument
                </label>
                <p></p>
                <input
                  type="file"
                  className="custom-file-input"
                  id="validatedCustomFile"
                  required
                />

                <div className="invalid-feedback">
                  Example invalid custom file feedback
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-xl-5  mb-5 mb-xl-0">
          <div className="row">
            <div className=" ">
              <div className="card-profile-image shadows ">
                <img
                  src={
                    employee["user.imageUrl"]
                      ? user.imageUrl
                      : "https://i.imgur.com/teiJw8H.png"
                  }
                  className="rounded-circle user-pic shadow"
                />
              </div>

              <div className="row card-body pt-0 pt-md-4">
                <div className=" text">
                  <h3>
                    {employee["user.firstName"]}
                    {employee["user.middleName"]
                      ? " " + employee["user.middleName"] + " "
                      : null}
                    {employee["user.lastname"]}
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2"></i>Bucharest, Romania
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2"></i>Solution
                    Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2"></i>University of
                    Computer Science
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="card-header ">
              <div className="row align-items-center">
                <div className="col-7">
                  <h3 className="mb-0">Moje dokumenty</h3>
                </div>
              </div>
            </div>
            <div className="card-body">
              <ul className="treeview-animated-list mb-3">
                <li className="list-unstyled treeview-animated-items">
                  <a className="closed">
                    <i className="fas fa-angle-right"></i>
                    <span>
                      <i className="far fa-folder-open ic-w mx-1"></i>A
                    </span>
                  </a>
                  <ul className="nested">
                    <li className="list-unstyled treeview-animated-items">
                      <List documents={aFiles} />
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-7 order-xl-1"></div>
      </div>
    </div>
  );
  return (
    <div className="backgd d-flex flex-column min-vh-100">
      <h4 className="userPage-text mt-3">{infoOfUser()}</h4>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.anotherUser,
});

export default connect(mapStateToProps)(AnotherUserPage);
