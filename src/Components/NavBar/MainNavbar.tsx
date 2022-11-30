import React, { Fragment, useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBRipple,
  MDBBadge,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
// import "./MainNavbar.css";
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
  const [showShow, setShowShow] = useState(false);

  const toggleShow = () => setShowShow(!showShow);

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
    // <li className="navbar-dropdown-icon shadow dropdown text-center">
    //   <button
    //     className="btn fa-solid fa-lg text-light no-padding "
    //     type="button"
    //     data-bs-toggle="dropdown"
    //     aria-expanded="false"
    //   >
    //     {user !== null ? userPic() : " "}
    //     {/* {user.firstName} {}
    //     {user.lastName} */}
    //   </button>
    //   <ul className="dropdown-menu navbar-dropdown dropdown-menu-end">
    //     {user !== null ? userBar() : " "}
    //     <li>
    //       <Link to="/" className="nav-link link-light dropdown-item ">
    //         Home
    //       </Link>
    //     </li>

    //     <li>
    //       <Link to="/konto" className="nav-link link-light dropdown-item ">
    //         Profil
    //       </Link>
    //     </li>

    //     {/* <li>
    //       <Link to="/zmienHaslo" className="nav-link link-light dropdown-item ">
    //         Zmien haslo
    //       </Link>
    //     </li> */}
    //     <li>
    //       <Link
    //         to=""
    //         className="nav-link link-light dropdown-item"
    //         onClick={logout_user}
    //       >
    //         Wyloguj
    //       </Link>
    //     </li>
    //   </ul>
    // </li>
    <MDBDropdown>
      <MDBDropdownToggle tag="a" href="#!" className="hidden-arrow nav-link">
        {user !== null ? userPic() : " "}
      </MDBDropdownToggle>

      <MDBDropdownMenu>
        <MDBDropdownItem>
          <Link to="/" className="nav-link link-light dropdown-item ">
            Home
          </Link>
        </MDBDropdownItem>
        <MDBDropdownItem>
          <Link to="/konto" className="nav-link link-light dropdown-item ">
            Profil
          </Link>
        </MDBDropdownItem>
        <MDBDropdownItem>
          <Link
            to=""
            className="nav-link link-light dropdown-item"
            onClick={logout_user}
          >
            Wyloguj
          </Link>
        </MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
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
        <MDBCollapse show={showShow} tag="nav" className="d-lg-block bg-white ">
          <div className="position-sticky">
            <MDBListGroup flush className="mx-3 mt-4">
              <MDBRipple rippleTag="span">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  className="border-0 border-bottom rounded rounded"
                >
                  <MDBIcon fas icon="tachometer-alt me-3" />
                  Main Dashboard
                </MDBListGroupItem>
              </MDBRipple>

              <MDBRipple rippleTag="span">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  className="border-0 border-bottom rounded"
                  active
                  aria-current="true"
                >
                  <MDBIcon fas icon="chart-area me-3" />
                  Website traffic
                </MDBListGroupItem>
              </MDBRipple>

              <MDBRipple rippleTag="span">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  className="border-0 border-bottom rounded"
                >
                  <MDBIcon fas icon="lock me-3" />
                  Password
                </MDBListGroupItem>
              </MDBRipple>

              <MDBRipple rippleTag="span">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  className="border-0 border-bottom rounded"
                >
                  <MDBIcon fas icon="chart-line me-3" />
                  Analitics
                </MDBListGroupItem>
              </MDBRipple>

              <MDBRipple rippleTag="span">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  className="border-0 border-bottom rounded"
                >
                  <MDBIcon fas icon="chart-pie me-3" />
                  SEO
                </MDBListGroupItem>
              </MDBRipple>

              <MDBRipple rippleTag="span">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  className="border-0 border-bottom rounded"
                >
                  <MDBIcon far icon="chart-bar me-3" />
                  Orders
                </MDBListGroupItem>
              </MDBRipple>

              <MDBRipple rippleTag="span">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  className="border-0 border-bottom rounded"
                >
                  <MDBIcon fas icon="globe me-3" />
                  International
                </MDBListGroupItem>
              </MDBRipple>

              <MDBRipple rippleTag="span">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  className="border-0 border-bottom rounded"
                >
                  <MDBIcon fas icon="building me-3" />
                  Partners
                </MDBListGroupItem>
              </MDBRipple>

              <MDBRipple rippleTag="span">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  className="border-0 border-bottom rounded"
                >
                  <MDBIcon fas icon="calendar me-3" />
                  Calendar
                </MDBListGroupItem>
              </MDBRipple>

              <MDBRipple rippleTag="span">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  className="border-0 border-bottom rounded"
                >
                  <MDBIcon fas icon="users me-3" />
                  User
                </MDBListGroupItem>
              </MDBRipple>

              <MDBRipple rippleTag="span">
                <MDBListGroupItem
                  tag="a"
                  href="#"
                  action
                  className="border-0 rounded"
                >
                  <MDBIcon fas icon="money-bill me-3" />
                  Sales
                </MDBListGroupItem>
              </MDBRipple>
            </MDBListGroup>
          </div>
        </MDBCollapse>

        <MDBNavbar expand="lg" light bgColor="light">
          <MDBContainer fluid>
            <MDBNavbarNav className="d-flex flex-row justify-content-end w-auto">
              <MDBNavbarItem className="me-3 me-lg-0 d-flex align-items-center">
                <MDBDropdown>
                  <MDBDropdownToggle
                    tag="a"
                    href="#!"
                    className="hidden-arrow nav-link"
                  >
                    <MDBIcon fas icon="bell" />
                    <MDBBadge color="danger" notification pill>
                      1
                    </MDBBadge>
                  </MDBDropdownToggle>

                  <MDBDropdownMenu>
                    <MDBDropdownItem>
                      <Link to="#">Some news</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <Link to="#">Another news</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <Link to="#">Something else here</Link>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>

              <MDBNavbarItem className="me-3 me-lg-0">
                <MDBNavbarLink href="#">
                  <MDBIcon fas icon="fill-drip" />
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem className="me-3 me-lg-0">
                <MDBNavbarLink href="#">
                  <MDBIcon fab icon="github" />
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem className="me-3 me-lg-0 d-flex align-items-center">
                {/* <MDBDropdown>
                  <MDBDropdownToggle
                    tag="a"
                    href="#!"
                    className="hidden-arrow nav-link"
                  >
                    <img
                      src="https://mdbootstrap.com/img/Photos/Avatars/img (31).jpg"
                      className="rounded-circle"
                      height="22"
                      alt=""
                      loading="lazy"
                    />
                  </MDBDropdownToggle>

                  <MDBDropdownMenu>
                    <MDBDropdownItem>
                      <Link to="#">My profile</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <Link to="#">Settings</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <Link to="#">Logout</Link>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown> */}
                {isAuthenticated ? authLink() : guestLink()}
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBContainer>
        </MDBNavbar>
      </div>
    </nav>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(NavBar);
