import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { extendedSignup, uploadFile } from "../../Actions/auth";
import { checkAuthenticated } from "../../Actions/auth";
import {
  MDBInput,
  MDBBtn,
  MDBCheckbox,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

const UploadDocumentPage = ({ errors, uploadFile, successMessage }) => {
  const { username } = useParams();
  const [infoMessage, setInfoMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hrAdmins, setHrAdmins] = useState([]);
  const [teams, setTeams] = useState([]);
  const [files, setFiles] = useState([]);

  const [formData, setFormData] = useState({
    file: null,
  });
  const [category, setCategory] = useState({
    fileCategory: "",
  });

  console.log(window.location.hostname);

  const { file } = formData;
  const { fileCategory } = category;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  const onCatChange = (e) =>
    setCategory({ ...category, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
  };
  function submitDocument(e) {
    // setInfoMessage("");
    setErrMsg("");

    if (fileCategory != "" && file != null) {
      // setErrMsg("");
      uploadFile(fileCategory, file, username);
      // if (errors == null) {
      //   setInfoMessage("Dokument został poprawnie dodany");
      //   setFormData({ ...formData, file: null });
      //   setCategory({ ...category, fileCategory: "" });
      // } else {
      //   setInfoMessage("");
      // }
    } else if (fileCategory != "") {
      setErrMsg("Proszę wybierz plik");
    } else {
      setErrMsg("Proszę wybierz kategorię dokumentu");
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="form-signin top-space">
        <MDBRow className="g-3">
          <h1 className="h3 mb-3 fw-normal text-center">Dodaj dokument</h1>
          <div className="form-group">
            <select
              className="form-select"
              required
              value={fileCategory}
              name="fileCategory"
              onChange={(e) => onCatChange(e)}
            >
              <option value="">Wybierz kategorię dokumentu</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          <div className="file-card">
            <div className="file-inputs">
              <input
                type="file"
                name="file"
                required
                accept="application/pdf"
                onChange={(e) => onChange(e)}
              />
            </div>

            <p className="main">Wspierane pliki:</p>
            <p className="info">PDF</p>
          </div>
          <MDBBtn
            className="w-100 btn btn-lg button-blue"
            type="submit"
            onClick={(e) => submitDocument(e)}
          >
            Prześlij document{" "}
          </MDBBtn>
          {errors != null && errors.message != null && errMsg == "" ? (
            <div
              className="alert alert-danger alert-dismissible fade show "
              role="alert"
            >
              <strong>{errors.message}</strong>
            </div>
          ) : null}
          {successMessage != null && errMsg == "" ? (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <strong>{successMessage}</strong>{" "}
            </div>
          ) : null}
          {errMsg != null && errMsg != "" ? (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <strong>{errMsg}</strong>{" "}
            </div>
          ) : null}
        </MDBRow>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  accountCreated: state.auth.accountCreated,
  errors: state.auth.errors,
  anotherUser: state.auth.anotherUser,
  user: state.auth.user,
  successMessage: state.auth.fileSuccessMessage,
});

export default connect(mapStateToProps, { extendedSignup, uploadFile })(
  UploadDocumentPage
);
