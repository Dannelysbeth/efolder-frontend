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

  function deleteItem(document) {
    deleteDocument(document);
    setDocuments((oldDocs) => oldDocs.filter((d) => d.id !== document.id));
  }

  const onDocumentSubmit = (document: any, e) => {
    e.preventDefault();
    console.log("TEST");
    downloadDocumentById(document);
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
          collapseId={1}
          headerTitle="Moje dokumenty"
        >
          <MDBAccordion borderless initialActive={1}>
            <MDBAccordionItem collapseId={1} headerTitle="A">
              {documents.length === 0 ? (
                <h3>Brak dokumentów</h3>
              ) : (
                documents.map((document, index) => {
                  return (
                    <div key={document.id}>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                        <div className="row d-flex align-items-center">
                          <div className="col-2">
                            <i className="fas fa-file-pdf"></i>
                          </div>

                          <div className="col-12 ms-3">
                            <p className="fw-bold mb-1">{document.name}</p>
                            <p className="text-muted mb-0">{document.size}</p>
                          </div>
                        </div>
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            type="button"
                            className="btn btn-primary "
                            onClick={(e) => onDocumentSubmit(document, e)}
                          >
                            <i className="fas fa-download"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={(e) => deleteItem(document)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </MDBListGroupItem>
                    </div>
                  );
                })
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
                      View
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
