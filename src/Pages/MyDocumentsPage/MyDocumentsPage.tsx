import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import documents from "../../Data/documentsA";
import { saveAs } from "file-saver";
import List from "./DocumentList";

// $(document).ready(function () {
//   ($(".treeview-animated") as any).mdbTreeview();
// });

const MyDocumentPage = () => {
  //   $(document).ready(function () {
  //     ($(".treeview-animated") as any).mdbTreeview();
  //   });
  const [files, setFiles] = useState(documents);
  //   const [info, setInfo] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(true);

  return (
    <div className="backgd d-flex flex-column min-vh-100">
      <div className="user-container top-space bottom-space">
        <h1 className="caption">Moja Kartoteka</h1>
        <hr></hr>
        <ul className="treeview-animated-list mb-3">
          <li className="treeview-animated-items">
            <a className="closed">
              <i className="fas fa-angle-right"></i>
              <span>
                <i className="far fa-folder-open ic-w mx-1"></i>Inbox
              </span>
            </a>
            <ul className="nested">
              <List documents={files} />
            </ul>
          </li>
        </ul>
        {/* <h4 className="userPage-text mt-3">
          <h3> My Documents ({files.length})</h3>
          <List documents={files} />
          {/* <img style={this.style} src={{ uri: this.state.base64 }} /> */}
        {/* </h4> */}
        <hr></hr>
      </div>
    </div>
    // ///////
    // <div className="backgd d-flex flex-column min-vh-100">
    //   <div className="user-container top-space bottom-space">
    //     <h6 className="pt-3 pl-3">Moja kartoteka</h6>
    //     <hr></hr>
    //     <ul className="treeview-animated-list mb-3">
    //       <li className="treeview-animated-items">
    //         <a className="closed">
    //           <i className="fas fa-angle-right"></i>
    //           <span>
    //             <i className="far fa-folder-open ic-w mx-1"></i>Inbox
    //           </span>
    //         </a>
    //         <ul className="nested">
    //           <li className="treeview-animated-items">
    //             <div className="treeview-animated-element">
    //               <i className="fa-sharp fa-solid fa-file-pdf" /> Admin
    //             </div>
    //           </li>
    //           <li>
    //             <div className="treeview-animated-element">
    //               <i className="fa-sharp fa-solid fa-file-pdf ic-w mr-1" />{" "}
    //               Corporate
    //             </div>
    //           </li>
    //           <li>
    //             <div className="treeview-animated-element">
    //               <i className="fa-sharp fa-solid fa-file-pdf" /> Finance
    //             </div>
    //           </li>
    //           <li>
    //             <div className="treeview-animated-element">
    //               <i className="fa-sharp fa-solid fa-file-pdf" /> Other
    //             </div>
    //           </li>
    //         </ul>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
  );
};

export default MyDocumentPage;
