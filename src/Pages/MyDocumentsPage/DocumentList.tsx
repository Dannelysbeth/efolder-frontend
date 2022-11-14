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
        <div>
          <li>
            <i className="fa-sharp fa-solid fa-file-pdf ic-w mr-1" /> {name}
          </li>
          {/* <h6>File size: {fileSize}</h6>
          <h6>Upload time: {uploadTime}</h6> */}
          <p></p>
        </div>
      </article>

      /////////////////////////
    );
  });
};

export default List;
