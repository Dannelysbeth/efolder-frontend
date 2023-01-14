import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { connect } from "react-redux";
import { MDBListGroupItem } from "mdb-react-ui-kit";

const AFilesPage = () => {
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

  const getDocuments = () => {
    return fetch(`${process.env.REACT_APP_REMOTE_URL}/api/document/info/A`, {
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
      .catch(() => {
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
          <h2 className=" text-white text-bold">Brak dokumentów</h2>
        </div>
      ) : (
        <div className="documents-container ">
          {documents.map((document) => {
            return (
              <div key={document.id}>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                  <div className=" d-flex align-items-center">
                    <div className="col-2">
                      <i className="fas  fa-file-pdf"></i>
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
                      className="btn btn-sm button-blue-2 "
                      onClick={(e) => onDocumentSubmit(document, e)}
                    >
                      <i className="fas fa-download"></i>
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

export default connect(mapStateToProps)(AFilesPage);
