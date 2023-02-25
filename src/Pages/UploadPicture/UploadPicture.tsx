import { MDBBtn } from "mdb-react-ui-kit";
import React, { useEffect, useState, Component } from "react";
import Avatar from "react-avatar-edit";
import { connect } from "react-redux";
import { uploadOwnProfilePic } from "../../Actions/auth";

const UploadPicture = ({ uploadOwnProfilePic }) => {
  const [src, setSrc] = useState(null);
  const [file, setFile] = useState(null);

  const onClose = () => {
    setFile(null);
  };
  const onCrop = (view) => {
    setFile(view);
  };

  function blobToFile(theBlob, fileName) {
    var arr = theBlob.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  }

  const onSubmit = () => {
    var fil = blobToFile(file, "hello.png");
    console.log(fil);
    uploadOwnProfilePic(fil);
    window.location.reload();
  };
  const onBeforeFileLoad = (view) => {
    if (view.target.files[0].size > 10000000) {
      alert("File is too big!");
      view.target.value = "";
    }
  };

  useEffect(() => {
    console.log(file);
  }, [file]);

  const containerStyles = {
    backgroundColor: "#ffff",
    width: "500px",
    height: "500px",
    margin: "auto",
    borderRadius: "10px",
  };

  return (
    <div className="user-container-picture-picker ">
      <p>
        <p></p>
      </p>
      <div style={containerStyles} className="d-flex justify-content-center">
        <Avatar
          width={500}
          height={500}
          onCrop={onCrop}
          onClose={onClose}
          label="Choose photo"
          onBeforeFileLoad={onBeforeFileLoad}
          src={src}
        />
      </div>
      <div className="d-flex justify-content-center">
        {file != null ? (
          <div>
            <p>
              <p></p>
            </p>
            <MDBBtn onClick={(e) => onSubmit()}>Choose</MDBBtn>
          </div>
        ) : null}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { uploadOwnProfilePic })(UploadPicture);
