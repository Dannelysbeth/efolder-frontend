import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
// import "./UserPage.css";
import a_documents from "../../Data/documentsA";
import b_documents from "../../Data/documentsA";
import List from "../MyDocumentsPage/DocumentList";
import { uploadFile, extendedSignup } from "../../Actions/auth";

import { connect } from "react-redux";
import documents from "../../Data/documentsA";
import { saveAs } from "file-saver";
import {
  MDBInput,
  MDBBtn,
  MDBCheckbox,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

const UserPageDemo = ({ user, uploadFile }) => {
  const [aFiles, setAFiles] = useState(a_documents);
  const [fileData, setFileData] = useState({
    file: null,
  });
  const [bFiles, setBFiles] = useState(b_documents);
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [formData, setFormData] = useState({
    fileCategory: "",
  });
  const { file } = fileData;
  const onFileChange = (e) =>
    setFileData({ ...fileData, [e.target.name]: e.target.files[0] });

  const { fileCategory } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(file);

    if (fileCategory !== null) {
      uploadFile(fileCategory, file);
      return <Navigate to="/" />;
    }
  };
  console.log(`File category: ${fileCategory} \nfile: ${file}`);

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
          <div className="col-xl-5  mb-5 mb-xl-0">
            <div className="row">
              <div className=" ">
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
      </div>
    </div>
  );

  return (
    <div className="backgd d-flex flex-column min-vh-100">
      <div className="userPage-text mt-3">
        {user !== null ? infoOfUser() : "Osoba niezalogowana "}
        <MDBRow className="g-3" tag="form" onSubmit={(e) => onSubmit(e)}>
          <div className="card-header ">
            <div className="row align-items-center">
              <div className="col-7">
                <h3 className="mb-0">Dodaj dokumenty</h3>
              </div>
            </div>
          </div>
          <div className="card-body">
            <form className="was-validated post" action="#" id="#">
              <div className="form-group">
                <select
                  className="form-select"
                  required
                  value={fileCategory}
                  name="fileCategory"
                  onChange={(e) => onChange(e)}
                >
                  <option value="">Wybierz kategorię dokumentu</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
              <p></p>
              <MDBCol md="4" className="form-floating form-myBox">
                <input
                  type="file"
                  name="file"
                  className="form-control "
                  // value={file}
                  onChange={(e) => onFileChange(e)}
                  required
                />
              </MDBCol>
              <MDBBtn className="w-100 btn btn-lg button-blue" type="submit">
                Prześlij document
              </MDBBtn>
            </form>
          </div>
        </MDBRow>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, { uploadFile })(UserPageDemo);
