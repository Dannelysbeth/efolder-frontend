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

  const onDocumentSubmit = (document: any, e) => {
    e.preventDefault();
    console.log("TEST");
    downloadDocumentById(document);
  };
  const onDocumentDeleteSubmit = (document: any, e) => {
    e.preventDefault();
    deleteDocument(document);
    const newDocList = documents.filter((doc) => doc.id != document.id);
    setDocuments(newDocList);
    getDocuments();
    setDocuments(documents);
    console.log("TEST 2");
  };

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
  const deleteDocument = (document: any) => {
    return fetch(
      `${process.env.REACT_APP_REMOTE_URL}/api/document/${document.id}`,
      {
        method: "POST",
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
  const downloadDocumentById = (doc: any) => {
    return fetch(
      `${process.env.REACT_APP_REMOTE_URL}/api/document/download/${doc.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment;filename=report.pdf",
        },
      }
    )
      .then((response) => response.blob())
      .then((responseType) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([responseType]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", doc.name);

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      });
  };
  useEffect(() => {
    getDocuments();
    setDocuments(documents);
  }, []);

  return (
    <MDBContainer>
      <MDBAccordion borderless alwaysOpen initialActive={1}>
        <MDBAccordionItem
          initialActive={1}
          alwaysOpen
          collapseId={0}
          headerTitle="Moje dokumenty"
        >
          <MDBAccordion borderless initialActive={0}>
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
                        <MDBDropdownItem
                          link
                          // size="bg"
                          onClick={(e) => onDocumentSubmit(document, e)}
                        >
                          {/* <Link
                        className="nav-link active"e
                        to={{
                          pathname: `http://localhost:8080/api/document/view/${document.id}`,
                        }}
                      > */}
                          Pobierz
                          {/* </Link> */}
                        </MDBDropdownItem>
                        <MDBDropdownItem
                          link
                          // size="bg"
                          onClick={(e) => onDocumentDeleteSubmit(document, e)}
                        >
                          Usuń
                        </MDBDropdownItem>
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
                    <MDBBtn
                      size="sm"
                      onClick={(e) => onDocumentSubmit(document, e)}
                    >
                      {/* <Link
                        className="nav-link active"e
                        to={{
                          pathname: `http://localhost:8080/api/document/view/${document.id}`,
                        }}
                      > */}
                      View
                      {/* </Link> */}
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
function FileDownload(data: any, arg1: string) {
  throw new Error("Function not implemented.");
}
