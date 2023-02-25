import React from "react";
import { useEffect, useState } from "react";

import { connect } from "react-redux";
import { MDBListGroupItem } from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";

const ViewDocumentsPage = () => {
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
    <div className=" ">
      {documents == null || documents.length === 0 ? (
        <div className="documents-container-noScroll center">
          <h2 className=" text-white text-bold">No documents</h2>
        </div>
      ) : (
        <div className="documents-container ">
          {documents.map((document, index) => {
            return (
              <div key={document.id}>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                  <div className=" d-flex align-items-center">
                    <div className="col-2">
                      <i className="fas  fa-file-pdf"></i>
                    </div>

                    <div className="col-12 ms-3">
                      <p className="fw-bold ">{document.name}</p>
                      <p className="text-muted ">{document.size}</p>
                    </div>
                  </div>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      className="btn btn-sm button-blue-2 "
                      onClick={(e) => onDocumentSubmit(document, e)}
                    >
                      <i className="fas fa-download"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={(e) => deleteItem(document)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </MDBListGroupItem>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.anotherUser,
});

export default connect(mapStateToProps)(ViewDocumentsPage);
