import React, { Fragment, useState } from "react";
import "./NavBar.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../Actions/auth";

const NavBar = ({ logout, isAuthenticated, user }) => {
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const logout_user = () => {
    logout();
    setRedirect(true);
    navigate("/");
  };

  const userBar = () => (
    <Fragment>
      <li id="message" className="greetings">
        Witaj {user.firstName}
      </li>
    </Fragment>
  );

  const authLink = () => (
    <li className="navbar-dropdown-icon shadow dropdown text-center">
      <button
        className="btn fa-solid fa-lg text-light no-padding "
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img
          src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
          className="rounded-circle no-padding "
          height="50"
          alt="Profile picture"
          loading="lazy"
        />
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
          <Link
            to=""
            className="nav-link link-light dropdown-item"
            onClick={logout_user}
          >
            Wyloguj
          </Link>
        </li>
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
