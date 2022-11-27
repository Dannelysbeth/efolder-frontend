import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, useNavigate, useParams, Outlet } from "react-router-dom";
// import "./UserPage.css";
import a_documents from "../../Data/documentsA";
import b_documents from "../../Data/documentsA";
import List from "../MyDocumentsPage/DocumentList";

import { connect } from "react-redux";
import documents from "../../Data/documentsA";

const AnotherUserPage = ({ user }) => {
  const { username } = useParams();
  const [documents, setDocuments] = useState([
    {
      id: 0,
      name: "",
      category: "",
      size: 0,
      uploadFile: "",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const getDocuments = () => {
    return fetch(
      `${process.env.REACT_APP_REMOTE_URL}/api/document/${username}`,
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
  const infoOfUser = () => (
    <div className="row">
      <div className="row user-container">
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
                    <List documents={documents} />
                  </li>
                </ul>
              </li>
            </ul>
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
      <div className="userPage-text mt-3">{infoOfUser()}</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.anotherUser,
});

export default connect(mapStateToProps)(AnotherUserPage);
