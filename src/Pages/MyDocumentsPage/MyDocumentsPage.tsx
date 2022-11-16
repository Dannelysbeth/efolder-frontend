import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import a_documents from "../../Data/documentsA";
import b_documents from "../../Data/documentsA";
import { saveAs } from "file-saver";
import List from "./DocumentList";

// $(document).ready(function () {
//   ($(".treeview-animated") as any).mdbTreeview();
// });

const MyDocumentPage = () => {
  const [aFiles, setAFiles] = useState(a_documents);
  const [bFiles, setBFiles] = useState(b_documents);
  //   const [info, setInfo] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(true);

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

    // //////////////////
    // <div className="accordion accordion-borderless" id="accordionFlushExampleX">
    //   <div className="accordion-item">
    //     <h2 className="accordion-header" id="flush-headingOneX">
    //       <button
    //         className="accordion-button"
    //         type="button"
    //         data-mdb-toggle="collapse"
    //         data-mdb-target="#flush-collapseOneX"
    //         aria-expanded="true"
    //         aria-controls="flush-collapseOneX"
    //       >
    //         Accordion Item #1
    //       </button>
    //     </h2>
    //     <div
    //       id="flush-collapseOneX"
    //       className="accordion-collapse collapse show"
    //       aria-labelledby="flush-headingOneX"
    //       data-mdb-parent="#accordionFlushExampleX"
    //     >
    //       <div className="accordion-body">
    //         Placeholder content for this accordion, which is intended to
    //         demonstrate the
    //         <code>.accordion-flush</code> class. This is the first item's
    //         accordion body.
    //       </div>
    //     </div>
    //   </div>
    //   <div className="accordion-item">
    //     <h2 className="accordion-header" id="flush-headingTwoX">
    //       <button
    //         className="accordion-button collapsed"
    //         type="button"
    //         data-mdb-toggle="collapse"
    //         data-mdb-target="#flush-collapseTwoX"
    //         aria-expanded="false"
    //         aria-controls="flush-collapseTwoX"
    //       >
    //         Accordion Item #2
    //       </button>
    //     </h2>
    //     <div
    //       id="flush-collapseTwoX"
    //       className="accordion-collapse collapse"
    //       aria-labelledby="flush-headingTwoX"
    //       data-mdb-parent="#accordionFlushExampleX"
    //     >
    //       <div className="accordion-body">
    //         Placeholder content for this accordion, which is intended to
    //         demonstrate the
    //         <code>.accordion-flush</code> class. This is the second item's
    //         accordion body. Let's imagine this being filled with some actual
    //         content.
    //       </div>
    //     </div>
    //   </div>
    //   <div className="accordion-item">
    //     <h2 className="accordion-header" id="flush-headingThreeX">
    //       <button
    //         className="accordion-button collapsed"
    //         type="button"
    //         data-mdb-toggle="collapse"
    //         data-mdb-target="#flush-collapseThreeX"
    //         aria-expanded="false"
    //         aria-controls="flush-collapseThreeX"
    //       >
    //         Accordion Item #3
    //       </button>
    //     </h2>
    //     <div
    //       id="flush-collapseThreeX"
    //       className="accordion-collapse collapse"
    //       aria-labelledby="flush-headingThreeX"
    //       data-mdb-parent="#accordionFlushExampleX"
    //     >
    //       <div className="accordion-body">
    //         Placeholder content for this accordion, which is intended to
    //         demonstrate the
    //         <code>.accordion-flush</code> class. This is the third item's
    //         accordion body. Nothing more exciting happening here in terms of
    //         content, but just filling up the space to make it look, at least at
    //         first glance, a bit more representative of how this would look in a
    //         real-world application.
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default MyDocumentPage;
