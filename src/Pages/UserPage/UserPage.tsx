import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserPage.css";
import { connect } from "react-redux";
import documents from "../../Data/documentsA";
import { saveAs } from "file-saver";

const UserPage = ({ user }) => {
  // const [vouchers, setVouchers] = useState([]);
  const [files, setFiles] = useState(documents);
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  // const getProfilePicture = () => {
  //   return (
  //     fetch(`${process.env.REACT_APP_REMOTE_URL}/api/profilePicture/myPic`, {
  //       method: "GET",
  //       mode: "cors",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("access")}`,
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((res) => res.text())
  //     .then((content) => {
  //       setState({
  //       base64: content
  //     })
  //     })
  //       // fetch(YOUR_IMAGE_URI, {
  //       //   method: 'GET',
  //       //   headers: {
  //       //     'Authorization': 'Bearer ' + 'TOKEN'
  //       //   }
  //       // }
  //       // ).then((res) => res.text())
  //       // .then((content) => {
  //       // this.setState({
  //       //   base64: content
  //       // })
  //       // })
  //   );
  // };

  // class NetworkImage extends React.Component {
  //   style: any;
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       base64: null,
  //     };
  //     this.style = props.style;
  //   }
  //   componentDidMount() {
  //     var imageUri = "/auth/diary/image/" ;
  //     fetch(imageUri, {
  //       method: "GET",
  //       mode: "cors",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("access")}`,
  //         "Content-Type": "application/json",
  //       },
  //       redirect: "follow",
  //     })
  //     .then((res) => res.text())
  //     .then((content) => {
  //       let data =
  //         "data:image/jpeg;base64," +
  //         content.substring(1, content.length - 1);
  //       this.setState({
  //         base64: data,
  //       });
  //     });
  //     });
  //   }

  // const getTickets = () => {
  //     return fetch(`${process.env.REACT_APP_REMOTE_URL}/api/card/ticket/myTickets`, {
  //         method: 'GET',
  //         mode: 'cors',
  //         headers: {
  //             'Authorization': `Bearer ${localStorage.getItem('access')}`,
  //             'Content-Type': 'application/json',
  //         }
  //     })
  //         .then(response => response.json())
  //         .then(responseJson => {
  //             setTickets(responseJson);
  //             setLoading(false);
  //         })
  //         .catch(error => {
  //             setLoading(false);
  //             setError(true);
  //         });
  // }

  // const getVouchers = () => {
  //     return fetch(`${process.env.REACT_APP_REMOTE_URL}/api/card/voucher/myVouchers`, {
  //         method: 'GET',
  //         mode: 'cors',
  //         headers: {
  //             'Authorization': `Bearer ${localStorage.getItem('access')}`,
  //             'Content-Type': 'application/json',
  //         }
  //     })
  //         .then(response => response.json())
  //         .then(responseJson => {
  //             setVouchers(responseJson);
  //             setLoading(false);
  //         })
  //         .catch(error => {
  //             setLoading(false);
  //             setError(true);
  //         });
  // }

  // const getReport = () => {
  //     return fetch(`${process.env.REACT_APP_REMOTE_URL}/api/report/customer`, {
  //         method: 'GET',
  //         mode: 'cors',
  //         headers: {
  //             'Authorization': `Bearer ${localStorage.getItem('access')}`,
  //             'Content-Type': 'application/json',
  //         }
  //     })
  //         .then(response =>
  //             response.blob()
  //         )
  //         .then(blob => saveAs(blob, user.username+".pdf"))
  //         .catch(error => {

  //         });
  // }

  //   useEffect(() => {
  //     getTickets();
  //       getVouchers();
  //   }, []);

  const infoOfUser = () => (
    <div className="row">
      <div className="column col-lg-3">
        <img
          src={
            user.imageUrl ? user.imageUrl : "https://i.imgur.com/teiJw8H.png"
          }
          className="profile-pic rounded-circle no-padding "
          height="200"
          width="200"
          alt="Profile picture"
          loading="lazy"
        />
      </div>
      <div className="column col-lg-3">
        <p>Imię:</p>
        <p>{user.middleName ? "Drugie Imię:" : ""}</p>
        <p>Nazwisko:</p>
        <p>E-mail:</p>
        <p>{user.gender ? "Płeć:" : ""}</p>
        <p>{user.birthdate ? "Data urodzenia:" : ""}</p>
      </div>
      <div className="column col-lg-3">
        <p>{user.firstName}</p>
        <p>{user.middleName ? user.middleName : ""}</p>
        <p>{user.lastName}</p>
        <p>{user.email}</p>
        <p>{user.gender ? user.gender : ""}</p>
        <p>{user.birthdate ? user.birthdate : ""}</p>
      </div>
    </div>
  );
  const adressInfo = () => (
    <div className="row">
      <div className="column col-lg-3">
        <p>ul. Akademicka 16</p>
        <p>44-100 Gliwice</p>
        <p>Polska</p>
        {/* <p>E-mail:</p>
        <p>{user.gender ? "Płeć:" : ""}</p>
        <p>{user.birthdate ? "Data urodzenia:" : ""}</p> */}
      </div>
      {/* <div className="column col-lg-3">
        <p>Polska</p>
        <p>Śląskie</p>
        <p>Gliwice</p>
        <p>{user.email}</p>
        <p>{user.gender ? user.gender : ""}</p>
        <p>{user.birthdate ? user.birthdate : ""}</p>
      </div> */}
    </div>
  );

  return (
    <div className="backgd d-flex flex-column min-vh-100">
      <div className="user-container top-space bottom-space">
        <h1 className="caption">Dane osobowe</h1>
        <hr></hr>
        <h4 className="userPage-text mt-3">
          {user !== null ? infoOfUser() : "Osoba niezalogowana "}
        </h4>
      </div>
      <div className="user-container top-space bottom-space">
        <h1 className="caption">Infomacje o zatrudnieniu</h1>
        <hr></hr>
        <h4 className="userPage-text mt-3">
          {user !== null ? adressInfo() : "Osoba niezalogowana "}
        </h4>
      </div>
      <div className="user-container top-space bottom-space">
        <h1 className="column col-lg-3 caption">Adres</h1>
        <hr></hr>
        <h4 className="userPage-text mt-3">
          {user !== null ? adressInfo() : "Osoba niezalogowana "}
        </h4>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(UserPage);
