import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserPage.css";
import { connect } from "react-redux";
import { saveAs } from "file-saver";

const UserPage = ({ user }) => {
  // const [vouchers, setVouchers] = useState([]);
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
          src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
          className="rounded-circle no-padding "
          height="200"
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

  return (
    <div className="backgd d-flex flex-column min-vh-100">
      <div className="user-container top-space bottom-space">
        <h1 className="caption">Dane osobowe</h1>
        <hr></hr>
        <h4 className="userPage-text mt-3">
          {user !== null ? infoOfUser() : "Osoba niezalogowana "}
        </h4>
        <hr></hr>
        {/* <h1 className="caption">Zdjęcie profilowe</h1> */}
        {/* <hr></hr> */}
        <h4 className="userPage-text mt-3">
          {/* <img style={this.style} src={{ uri: this.state.base64 }} /> */}
        </h4>
        {/* {tickets.length === 0 ? (
          ""
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="active text-center">ilość wejść</th>
                <th className="active text-center">wyciąg</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                !error &&
                tickets.map((ticket) => (
                  <tr>
                    <td className="text-center" data-title="">
                      {ticket["entryAmount"]}
                    </td>
                    <td className="text-center" data-title="">
                      {ticket["skiLiftName"]}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )} */}
        {/* <h1 className="caption">Moje karnety</h1>
                <hr></hr>
                <h4 className="userPage-text mt-3">Przejazdy pojedyńcze:{tickets.length === 0 ? " Brak" : ""}</h4>
                { tickets.length === 0 ? "" :
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th className='active text-center'>ilość wejść</th>
                                <th className='active text-center'>wyciąg</th>
                            </tr>
                        </thead>
                        <tbody>
                        { !loading && !error && tickets.map(ticket => 
                        <tr>
                            <td className='text-center' data-title=''>{ticket["entryAmount"]}</td>
                            <td className='text-center' data-title=''>{ticket["skiLiftName"]}</td>
                        </tr>
                            )}
                        </tbody>
                    </table>
                }
                <h4 className="userPage-text mt-3">Karnety czasowe: {vouchers.length === 0 ? " Brak" : ""}</h4>
                { vouchers.length === 0 ? "" : 
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th className='active text-center'>od</th>
                                <th className='active text-center'>do</th>
                                <th className='active text-center'>Czy aktywny</th>
                            </tr>
                        </thead>
                        <tbody>
                        { !loading && !error && vouchers.map(voucher => 
                        <tr>
                            <td className='text-center' data-title=''>{voucher["startDate"] !== null ? voucher["startDate"] : "Jeszcze nie użyto"}</td>
                            <td className='text-center' data-title=''>{voucher["expireDate"]  !== null ? voucher["expireDate"] : "Jeszcze nie użyto"}</td>
                            <td className='text-center' data-title=''>{voucher["active"] === true ? "tak" : "nie"}</td>
                        </tr>
                            )}
                        </tbody>
                    </table>
                } */}
        {/* <hr></hr>
                <h1 className="caption">Pobierz raport</h1>
                <button className="btn button-blue active ms-4" onClick={() => getReport()}>Pobierz</button>
                <hr></hr> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(UserPage);
