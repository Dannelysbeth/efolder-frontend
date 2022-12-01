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

const UploadDocumentPage = ({ errors, uploadFile }) => {
  const { username } = useParams();
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
    console.log(file);
    uploadFile(fileCategory, file, username);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="form-signin top-space">
        <MDBRow className="g-3" tag="form" onSubmit={(e) => onSubmit(e)}>
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
                accept="application/pdf"
                onChange={(e) => onChange(e)}
              />
            </div>

            <p className="main">Wspierane pliki:</p>
            <p className="info">PDF</p>
          </div>
          <MDBBtn className="w-100 btn btn-lg button-blue" type="submit">
            Prześlij document{" "}
          </MDBBtn>
          {errors !== null ? (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <strong>{errors.message}</strong>
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
});

export default connect(mapStateToProps, { extendedSignup, uploadFile })(
  UploadDocumentPage
);
