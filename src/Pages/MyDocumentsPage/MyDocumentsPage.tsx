import React from "react";
import { useState } from "react";
import a_documents from "../../Data/documentsA";
import List from "./DocumentList";

const MyDocumentPage = () => {
  const [aFiles, setAFiles] = useState(a_documents);

  return (
    <div className="backgd d-flex flex-column min-vh-100">
      <div className="user-container top-space bottom-space">
        <h1 className="caption">Moja Kartoteka</h1>
        <hr></hr>
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
                <List documents={aFiles} />
              </li>
            </ul>
          </li>
        </ul>
        <hr></hr>
      </div>
    </div>
  );
};

export default MyDocumentPage;
