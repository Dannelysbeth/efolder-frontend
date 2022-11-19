import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserPage.css";
import a_documents from "../../Data/documentsA";
import b_documents from "../../Data/documentsA";
import List from "../MyDocumentsPage/DocumentList";

import { connect } from "react-redux";
import documents from "../../Data/documentsA";
import { saveAs } from "file-saver";

const UserPageDemo = ({ user }) => {
  const [files, setFiles] = useState(documents);
  const [aFiles, setAFiles] = useState(a_documents);
  const [bFiles, setBFiles] = useState(b_documents);
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const infoOfUser = () => (
    <div className="row">
      <div className="row">
        <div className="col-xl-7 order-xl-2">
          <div className="card-container ">
            <div className="card-header ">
              <div className="row align-items-center">
                <div className="col-4">
                  <h3 className="mb-0">Dane osobowe</h3>
                </div>
                <div className="col-5 text-left"></div>
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
                          Username
                        </label>
                        <input
                          type="text"
                          id="input-username"
                          className="form-control form-control-alternative"
                          placeholder="Username"
                          value={user.username}
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
                          placeholder={user.email}
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
                          value="Lucky"
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
                          value="Jesse"
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
        </div>
        <div className="col-xl-3  mb-5 mb-xl-0">
          <div className="row card-container card-profile ">
            <div className="card-profile-image shadows ">
              <img
                src={
                  user.imageUrl
                    ? user.imageUrl
                    : "https://i.imgur.com/teiJw8H.png"
                }
                className="rounded-circle user-pic shadow"
              />
            </div>

            <div className="row card-body pt-0 pt-md-4">
              <div className=" text">
                <h3>
                  {user.firstName}
                  {user.middleName ? " " + user.middleName + " " : " "}
                  {user.lastName}
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
                <hr className="my-4" />
                <p>
                  Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick
                  Murphy — writes, performs and records all of his own music.
                </p>
                <a href="#">Show more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {/* Here */}
        <div className="col-xl-3 order-xl-1">
          <div className="card-container ">
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
    </div>
  );
  return (
    <div className="backgd d-flex flex-column min-vh-100">
      <h4 className="userPage-text mt-3">
        {user !== null ? infoOfUser() : "Osoba niezalogowana "}
      </h4>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(UserPageDemo);
