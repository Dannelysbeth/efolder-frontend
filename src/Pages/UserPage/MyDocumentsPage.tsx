import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, useNavigate, useParams, Outlet } from "react-router-dom";
import "./UserPage.css";
import a_documents from "../../Data/documentsA";
import b_documents from "../../Data/documentsA";
import List from "../MyDocumentsPage/DocumentList";

import { connect } from "react-redux";
import documents from "../../Data/documentsA";
import {
  MDBAccordion,
  MDBAccordionItem,
  MDBBtn,
  MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

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

  return (
    <MDBContainer>
      <MDBAccordion borderless alwaysOpen initialActive={0}>
        <MDBAccordionItem collapseId={1} headerTitle="Moje dokumenty">
          <MDBAccordion borderless alwaysOpen initialActive={1}>
            <MDBAccordionItem collapseId={1} headerTitle="A">
              {documents.length === 0 ? (
                <h3>Brak dokumentów</h3>
              ) : (
                documents.map((document) => (
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <i className="fa-sharp fa-solid fa-file-pdf" />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{document.name}</p>
                        <p className="text-muted mb-0">{document.size}</p>
                      </div>
                    </div>
                    <MDBDropdown className="btn-group-1">
                      <MDBDropdownToggle />
                      <MDBDropdownMenu>
                        <MDBDropdownItem link>
                          <Link
                            className="nav-link active"
                            to={{
                              pathname: `http://localhost:8080/api/document/view/${document.id}`,
                            }}
                          >
                            Otwórz{" "}
                          </Link>
                        </MDBDropdownItem>
                        <MDBDropdownItem link>Another action</MDBDropdownItem>
                        <MDBDropdownItem link>
                          Something else here
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                    {/* <MDBBtn size="sm">
                      <Link
                        className="nav-link active"
                        to={{
                          pathname: `http://localhost:8080/api/document/view/${document.id}`,
                        }}
                      >
                        View
                      </Link>
                    </MDBBtn> */}
                  </MDBListGroupItem>
                ))
              )}
            </MDBAccordionItem>
          </MDBAccordion>
          <MDBAccordion borderless alwaysOpen initialActive={1}>
            <MDBAccordionItem collapseId={1} headerTitle="B">
              {documents.length === 0 ? (
                <h3>Brak użytkowników w systemie</h3>
              ) : (
                documents.map((document) => (
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <i className="fa-sharp fa-solid fa-file-pdf" />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{document.name}</p>
                        <p className="text-muted mb-0">{document.size}</p>
                      </div>
                    </div>
                    <MDBBtn size="sm">
                      <Link
                        className="nav-link active"
                        to={{
                          pathname: `http://localhost:8080/api/document/view/${document.id}`,
                        }}
                      >
                        View
                      </Link>
                    </MDBBtn>
                  </MDBListGroupItem>
                ))
              )}
            </MDBAccordionItem>
          </MDBAccordion>
        </MDBAccordionItem>
      </MDBAccordion>
    </MDBContainer>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.anotherUser,
});

export default connect(mapStateToProps)(AnotherUserPage);
