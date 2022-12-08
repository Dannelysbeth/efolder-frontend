import { MDBBtn } from "mdb-react-ui-kit";
import React, { useEffect, useState, Component } from "react";
import Avatar from "react-avatar-edit";
import { connect } from "react-redux";
import { uploadOwnProfilePic } from "../../Actions/auth";
import { createObjectURL, base64StringToBlob } from "blob-util";

const UploadPicture = ({ uploadOwnProfilePic }) => {
  const [src, setSrc] = useState(null);
  const [file, setFile] = useState(null);

  //   const changeEmploymentInfo = () => {
  //     return fetch(
  //       `${process.env.REACT_APP_REMOTE_URL}/api/employment/${username}`,
  //       {
  //         method: "POST",
  //         mode: "cors",
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("access")}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(employmentData),
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then((responseJson) => {
  //         setEmployee(responseJson);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         setLoading(false);
  //         setError(true);
  //       });
  //   };

  //   const uploadPictureToDatabase = () => {
  //     return fetch(
  //       `${process.env.REACT_APP_REMOTE_URL}/api/profilePicture/upload`,
  //       {
  //         method: "POST",
  //         mode: "cors",
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${localStorage.getItem("access")}`,
  //           Accept: "*/*",
  //         },
  //         body: preview,
  //       }
  //     )
  //       .then((response) => response.data())
  //       .then((responseJson) => {
  //         setUsers(responseJson);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         setLoading(false);
  //         setError(true);
  //       });
  //   };

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
    const buffer = Buffer.from(file, "base64");

    // const blob = new Blob([buffer], { type: "image/png" });
    // console.log(blob);
    // const fileBlob = blobToFile(blob, "profilePic.png");
    // console.log(fileBlob);
    var fil = blobToFile(file, "hello.png");
    console.log(fil);
    uploadOwnProfilePic(fil);
    window.location.reload();
  };

  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <div>
      <Avatar
        width={400}
        height={400}
        onCrop={onCrop}
        onClose={onClose}
        src={src}
      />
      <MDBBtn onClick={(e) => onSubmit()}>Wybierz</MDBBtn>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { uploadOwnProfilePic })(UploadPicture);
