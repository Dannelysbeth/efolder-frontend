import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
// import "./UserPage.css";

import { connect } from "react-redux";
import {
  MDBInput,
  MDBBtn,
  MDBCheckbox,
  MDBRow,
  MDBCol,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

const ViewDocumentsPage = () => {
  const [info, setInfo] = useState([]);
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
  const [documentsA, setDocumentsA] = useState([
    {
      id: 0,
      name: "",
      category: "",
      size: 0,
      uploadFile: "",
    },
  ]);
  const [documentsB, setDocumentsB] = useState([
    {
      id: 0,
      name: "",
      category: "",
      size: 0,
      uploadFile: "",
    },
  ]);
  const [documentsC, setDocumentsC] = useState([
    {
      id: 0,
      name: "",
      category: "",
      size: 0,
      uploadFile: "",
    },
  ]);
  const [documentsD, setDocumentsD] = useState([
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
    setDocumentsA((oldDocs) => oldDocs.filter((d) => d.id !== document.id));
    setDocumentsB((oldDocs) => oldDocs.filter((d) => d.id !== document.id));
    setDocumentsC((oldDocs) => oldDocs.filter((d) => d.id !== document.id));
    setDocumentsD((oldDocs) => oldDocs.filter((d) => d.id !== document.id));
  }

  const onDocumentSubmit = (document: any, e) => {
    e.preventDefault();
    console.log("TEST");
    downloadDocumentById(document);
  };

  const getADocuments = () => {
    return fetch(
      `${process.env.REACT_APP_REMOTE_URL}/api/document/info/A/${username}`,
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
        setDocumentsA(responseJson);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  };
  const getBDocuments = () => {
    return fetch(
      `${process.env.REACT_APP_REMOTE_URL}/api/document/info/B/${username}`,
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
        setDocumentsB(responseJson);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  };
  const getCDocuments = () => {
    return fetch(
      `${process.env.REACT_APP_REMOTE_URL}/api/document/info/C/${username}`,
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
        setDocumentsC(responseJson);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  };
  const getDDocuments = () => {
    return fetch(
      `${process.env.REACT_APP_REMOTE_URL}/api/document/info/D/${username}`,
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
        setDocumentsD(responseJson);
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
    getADocuments();
    getBDocuments();
    getCDocuments();
    getDDocuments();
  }, []);

  const [verticalActive, setVerticalActive] = useState("tab1");

  const handleVerticalClick = (value: string) => {
    if (value === verticalActive) {
      return;
    }

    setVerticalActive(value);
  };

  return (
    <div className=" d-flex flex-column min-vh-100 ">
      <div className="d-flex flex-column min-vh-100 userPage-text mt-3">
        <>
          <MDBRow>
            <MDBCol size="3">
              <MDBTabs pills className="flex-column text-center">
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleVerticalClick("tab1")}
                    active={verticalActive === "tab1"}
                  >
                    A
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleVerticalClick("tab2")}
                    active={verticalActive === "tab2"}
                  >
                    B
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleVerticalClick("tab3")}
                    active={verticalActive === "tab3"}
                  >
                    C
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleVerticalClick("tab4")}
                    active={verticalActive === "tab4"}
                  >
                    D
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>
            </MDBCol>
            <MDBCol size="9">
              <MDBTabsContent className="documents-container">
                <MDBTabsPane show={verticalActive === "tab1"}>
                  {documentsA.length === 0 ? (
                    <h3>Brak dokumentów</h3>
                  ) : (
                    documentsA.map((document, index) => {
                      return (
                        <div key={document.id}>
                          <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                            <div className="row d-flex align-items-center">
                              <div className="col-2">
                                <i className="fas fa-file-pdf"></i>
                              </div>

                              <div className="col-12 ms-3">
                                <p className="fw-bold mb-1">{document.name}</p>
                                <p className="text-muted mb-0">
                                  {document.size}
                                </p>
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
                </MDBTabsPane>
                <MDBTabsPane show={verticalActive === "tab2"}>
                  {documentsB.length === 0 ? (
                    <h3>Brak dokumentów</h3>
                  ) : (
                    documentsB.map((document, index) => {
                      return (
                        <div key={document.id}>
                          <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                            <div className="row d-flex align-items-center">
                              <div className="col-2">
                                <i className="fas fa-file-pdf"></i>
                              </div>

                              <div className="col-12 ms-3">
                                <p className="fw-bold mb-1">{document.name}</p>
                                <p className="text-muted mb-0">
                                  {document.size}
                                </p>
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
                </MDBTabsPane>
                <MDBTabsPane show={verticalActive === "tab3"}>
                  {documentsC.length === 0 ? (
                    <h3>Brak dokumentów</h3>
                  ) : (
                    documentsC.map((document, index) => {
                      return (
                        <div key={document.id}>
                          <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                            <div className="row d-flex align-items-center">
                              <div className="col-2">
                                <i className="fas fa-file-pdf"></i>
                              </div>

                              <div className="col-12 ms-3">
                                <p className="fw-bold mb-1">{document.name}</p>
                                <p className="text-muted mb-0">
                                  {document.size}
                                </p>
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
                </MDBTabsPane>
                <MDBTabsPane show={verticalActive === "tab4"}>
                  {documentsD.length === 0 ? (
                    <h3>Brak dokumentów</h3>
                  ) : (
                    documentsD.map((document, index) => {
                      return (
                        <div key={document.id}>
                          <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                            <div className="row d-flex align-items-center">
                              <div className="col-2">
                                <i className="fas fa-file-pdf"></i>
                              </div>

                              <div className="col-12 ms-3">
                                <p className="fw-bold mb-1">{document.name}</p>
                                <p className="text-muted mb-0">
                                  {document.size}
                                </p>
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
                </MDBTabsPane>
              </MDBTabsContent>
            </MDBCol>
          </MDBRow>
        </>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(ViewDocumentsPage);
