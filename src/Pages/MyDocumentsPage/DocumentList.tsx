import React from "react";

const List = (props) => {
  const { documents } = props;

  return documents.map((document) => {
    const { id, name, category, size, uploadTime } = document;
    return (
      <article key={id} className="document">
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
      </article>
    );
  });
};

export default List;
