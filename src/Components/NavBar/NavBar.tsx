import React, { Fragment, useState } from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../Actions/auth";
import { MDBIcon } from "mdb-react-ui-kit";

const NavBar = ({ logout, isAuthenticated, user }) => {
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const logout_user = () => {
    logout();
    setRedirect(true);
    navigate("/");
  };

  function checkIfAdmin(): boolean {
    if (user != null && user.roles != null)
      for (var i of user.roles) {
        if (i == "ROLE_SUPER_ADMIN" || i == "ROLE_HR_ADMIN") return true;
      }
    return false;
  }
  function checkIfTeamLeader(): boolean {
    if (user != null && user.roles != null) {
      console.log(user.username);
      for (var i of user.roles) {
        if (i == "ROLE_MANAGER") return true;
      }
    }
    return false;
  }
  function checkIfRegularEmployee(): boolean {
    if (user != null && user.roles != null)
      for (var i of user.roles) {
        if (i == "ROLE_REGULAR_EMPLOYEE") return true;
      }
    return false;
  }

  const userBar = () => (
    <Fragment>
      <li id="message bold" className="greetings">
        {user.firstName} {}
        {user.lastName}
      </li>
    </Fragment>
  );
  const userPic = () => (
    <img
      src={user.imageUrl ? user.imageUrl : "https://i.imgur.com/teiJw8H.png"}
      className="profile-pic rounded-circle no-padding "
      height="50"
      width="50"
      alt="Profile picture"
      loading="lazy"
    />
  );

  const authLink = () => (
    <div className="row">
      <div className="col-8 center">{user !== null ? userPic() : " "}</div>

      <div className="col-4 no-padding">
        <li className="navbar-dropdown-icon  dropdown text-center no-padding">
          <MDBIcon
            fas
            icon="caret-down"
            className="btn fa-solid fa-lg text-light no-padding "
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          <ul className="dropdown-menu navbar-dropdown dropdown-menu-end">
            <li>
              <h5 className="center text-center border-bottom">
                {user !== null ? userBar() : " "}
              </h5>
            </li>
            <li>
              <Link to="/profil" className="nav-link link-light dropdown-item ">
                <MDBIcon far icon="user-circle" /> Profil
              </Link>
            </li>
            <li>
              {checkIfRegularEmployee() ? (
                <Link
                  to="/kartoteka"
                  className="nav-link link-light dropdown-item "
                >
                  <MDBIcon fas icon="id-card" /> Moja kartoteka
                </Link>
              ) : null}
            </li>
            <li>
              <Link
                to="/zmienHaslo"
                className="nav-link link-light dropdown-item "
              >
                <MDBIcon fas icon="key" /> Zmień hasło
              </Link>
            </li>
            {
              <li>
                {checkIfAdmin() == true ? (
                  <Link
                    to="/createUser"
                    className="nav-link link-light dropdown-item "
                  >
                    <MDBIcon fas icon="user-plus" /> Utwórz konto
                  </Link>
                ) : null}
              </li>
            }
            {
              <li>
                {checkIfAdmin() == true ? (
                  <Link
                    to="/pracownicy"
                    className="nav-link link-light dropdown-item "
                  >
                    <MDBIcon fas icon="user-tag" /> Pracownicy
                  </Link>
                ) : null}
              </li>
            }{" "}
            {
              <li>
                {checkIfAdmin() == true ? (
                  <Link
                    to="/viewTeams"
                    className="nav-link link-light dropdown-item "
                  >
                    <MDBIcon fas icon="users" /> Zespoły
                  </Link>
                ) : null}
              </li>
            }{" "}
            {
              <li>
                {checkIfTeamLeader() == true ? (
                  <Link
                    to="/viewMyTeams"
                    className="nav-link link-light dropdown-item "
                  >
                    <MDBIcon fas icon="user-friends" /> Moje zespoły
                  </Link>
                ) : null}
              </li>
            }{" "}
            {
              <li>
                {checkIfAdmin() == true ? (
                  <Link
                    to="/createTeam"
                    className="nav-link link-light dropdown-item "
                  >
                    <MDBIcon fas icon="users-cog" /> Stwórz zespół
                  </Link>
                ) : null}
              </li>
            }{" "}
            <li>
              <Link
                to=""
                className="nav-link link-light dropdown-item"
                onClick={logout_user}
              >
                <MDBIcon fas icon="sign-out-alt" /> {}
                Wyloguj
              </Link>
            </li>
          </ul>
        </li>
      </div>
    </div>
  );

  const guestLink = () => (
    <li className="nav-item shadow">
      <Link to="/login" className="nav-link link-light active">
        Zaloguj
      </Link>
    </li>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-custom no-padding" id="main">
      <div className="container-fluid justify-content-between center-text-2">
        <Link to="/" className="navbar-brand">
          <img
            src="https://i.imgur.com/s3tSg4v.png"
            alt="Logo"
            width="200px"
            className="NavbarLogo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="fa fa-navicon"></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav ms-auto mx-5 pe-3 gap-3">
            {/* <li className="nav-item shadow">
              <Link to="/o-nas" className="nav-link link-light active">
                O nas
              </Link>
            </li> */}
            <li className="nav-item shadow center-text-2 ">
              <Link to="/aktualnosci" className="nav-link link-light active">
                Aktualności
              </Link>
            </li>
            <li className="nav-item center-text-2">
              <Link to="/" className="nav-link link-light active">
                <MDBIcon fas icon="home" /> O nas
              </Link>
            </li>

            {/* <li className="nav-item shadow">
              <Link to="/pomoc" className="nav-link link-light active">
                Pomoc
              </Link>
            </li> */}
            {isAuthenticated ? authLink() : guestLink()}
          </ul>
        </div>
      </div>
    </nav>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(NavBar);
