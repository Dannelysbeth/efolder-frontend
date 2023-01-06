import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { extendedSignup, uploadOwnFile } from "../../../Actions/auth";
import { MDBRow } from "mdb-react-ui-kit";

const UploadMyFilesPage = ({ errors, uploadOwnFile, successMessage }) => {
  const [errMsg, setErrMsg] = useState("");

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
    setErrMsg("");
    if (fileCategory != "" && file != null) {
      uploadOwnFile(fileCategory, file);
    } else if (fileCategory != "") {
      setErrMsg("Proszę wybierz plik");
    } else {
      setErrMsg("Proszę wybierz kategorię dokumentu");
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100 parent-top">
      <div className="d-flex flex-column  ">
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

        <div className="form-document-upload ">
          <MDBRow className="">
            <h4 className="  center">Dodaj dokument</h4>
            <p>
              <p></p>
            </p>
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
            <p>
              <p></p>
            </p>
            <div className="file-card ">
              <div className=" files input">
                <input
                  type="file"
                  name="file"
                  required
                  accept="application/pdf"
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <p>
              <p></p>
            </p>

            <button
              className="w-100 btn btn-lg button-blue-2"
              type="submit"
              onClick={(e) => submitDocument(e)}
            >
              Prześlij document{" "}
            </button>
          </MDBRow>
        </div>
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

export default connect(mapStateToProps, { extendedSignup, uploadOwnFile })(
  UploadMyFilesPage
);
