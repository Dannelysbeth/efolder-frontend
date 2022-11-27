import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
// import "./UserPage.css";
import a_documents from "../../Data/documentsA";
import b_documents from "../../Data/documentsA";
import List from "../MyDocumentsPage/DocumentList";
import { uploadFile, extendedSignup } from "../../Actions/auth";

import { connect } from "react-redux";
import {
  MDBInput,
  MDBBtn,
  MDBCheckbox,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

const ViewDocumentsPage = () => {
  const [documents, setDocuments] = useState([]);
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const getDocuments = () => {
    return fetch(`${process.env.REACT_APP_REMOTE_URL}/api/document/info/all`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setDocuments(responseJson);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  };
  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <div className="backgd d-flex flex-column min-vh-100">
      <div className="userPage-text mt-3">
        <MDBRow className="g-3" tag="form">
          <div className="card-header ">
            <div className="row align-items-center">
              <div className="col-7">
                <h3 className="mb-0">Dodaj dokumenty</h3>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="d-flex align-items-center">
              {!loading &&
                !error &&
                documents.map((doc) => (
                  <>
                    <i className="fa-sharp fa-solid fa-file-pdf ic-w mr-1" />
                    <p id={doc["name"]}>
                      {doc["name"]} ({doc["size"]})
                    </p>
                  </>
                ))}
              <a
                className="btn btn-link btn-rounded btn-sm"
                href="#"
                role="button"
              >
                View
              </a>
            </div>
          </div>
        </MDBRow>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(ViewDocumentsPage);
