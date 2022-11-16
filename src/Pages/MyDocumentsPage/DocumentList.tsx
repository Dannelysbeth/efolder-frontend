import React from "react";

// const List = (props) => {
//     const { documents } = props
//     return documents.map((document) => {
//       const { fileId, fileName, fileCategory, fileSize, uploadTime } = document
//       return (
//         <article key={fileId} className="document">
//           <div>
//             <h6>{fileName}</h6>
//             <p>File size: {fileSize}</p>
//             <p>Upload time: {uploadTime}</p>
//           </div>
//         </article>
//       )
//     }

//     export default List

const List = (props) => {
  const { documents } = props;
  // Map over prop "people" and code the right structure

  return documents.map((document) => {
    const { id, name, category, size, uploadTime } = document;
    return (
      <article key={id} className="document">
        {/* <div>
          <div className="fw-bold">
            {" "}
            <i className="fa-sharp fa-solid fa-file-pdf ic-w mr-1" /> {name}
          </div>
          <div className="text-muted">File size: {size}</div>
        </div> */}
        {/* //// */}
        <div className="d-flex align-items-center">
          <i className="fa-sharp fa-solid fa-file-pdf ic-w mr-1" />
          <div className="ms-3">
            <p className="fw-bold mb-1">{name}</p>
            <small>File size: {size}</small>
          </div>
          <a className="btn btn-link btn-rounded btn-sm" href="#" role="button">
            View
          </a>
        </div>

        {/* <div>
          <p>
            <i className="fa-sharp fa-solid fa-file-pdf ic-w mr-1" /> {name}
            <small>
              {" "}
              <p>File size: {size}</p>
            </small>
          </p>
          <p></p>
        </div> */}
      </article>
    );
  });
};

export default List;
