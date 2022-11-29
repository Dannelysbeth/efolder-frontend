import React, { Fragment, useState } from "react";
import "./NavBar.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../Actions/auth";

const NavBar = ({ logout, isAuthenticated, user }) => {
  const [info, setInfo] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const logout_user = () => {
    logout();
    setRedirect(true);
    navigate("/");
  };

  function checkIfSuperAdmin(): boolean {
    if (user != null && user.roles != null)
      for (var i of user.roles) {
        if (i == "ROLE_SUPER_ADMIN") return true;
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
    <li className="navbar-dropdown-icon shadow dropdown text-center">
      <button
        className="btn fa-solid fa-lg text-light no-padding "
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {user !== null ? userPic() : " "}
      </button>
      <ul className="dropdown-menu navbar-dropdown dropdown-menu-end">
        {user !== null ? userBar() : " "}
        <li>
          <Link to="/konto" className="nav-link link-light dropdown-item ">
            Moje dane
          </Link>
        </li>
        <li>
          <Link to="/kartoteka" className="nav-link link-light dropdown-item ">
            Kartoteka pracownicza
          </Link>
        </li>

        <li>
          <Link to="/uploadFile" className="nav-link link-light dropdown-item ">
            Dodaj dokument
          </Link>
        </li>
        <li>
          <Link
            to=""
            className="nav-link link-light dropdown-item"
            onClick={logout_user}
          >
            Wyloguj
          </Link>
        </li>
        {
          <li>
            {checkIfSuperAdmin() == true ? (
              <Link
                to="/createUser"
                className="nav-link link-light dropdown-item "
              >
                Utwórz konto
              </Link>
            ) : null}
          </li>
        }
        {
          <li>
            {checkIfSuperAdmin() == true ? (
              <Link
                to="/pracownicy"
                className="nav-link link-light dropdown-item "
              >
                Pracownicy
              </Link>
            ) : null}
          </li>
        }
      </ul>
    </li>
  );

  const guestLink = () => (
    <li className="nav-item shadow">
      <Link to="/login" className="nav-link link-light active">
        Zaloguj
      </Link>
    </li>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-custom" id="main">
      <div className="container-fluid justify-content-between">
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
            <li className="nav-item shadow">
              <Link to="/o-nas" className="nav-link link-light active">
                O nas
              </Link>
            </li>
            <li className="nav-item shadow">
              <Link to="/aktualnosci" className="nav-link link-light active">
                Aktualności
              </Link>
            </li>
            <li className="nav-item shadow">
              <Link to="/kontakt" className="nav-link link-light active">
                Kontakt
              </Link>
            </li>
            <li className="nav-item shadow">
              <Link to="/regulamin" className="nav-link link-light active">
                Regulamin
              </Link>
            </li>
            <li className="nav-item shadow">
              <Link to="/pomoc" className="nav-link link-light active">
                Pomoc
              </Link>
            </li>
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
