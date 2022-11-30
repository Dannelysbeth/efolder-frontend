import React, { useEffect } from "react";
import { connect } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";

import {
  checkAuthenticated,
  loadUser,
  // RolesLoad,
  // signup,
} from "../../Actions/auth";

const Layout = ({
  checkAuthenticated,
  loadUser,
  // RolesLoad,
  // signup,
  children,
}) => {
  useEffect(() => {
    checkAuthenticated();
    loadUser();
    // RolesLoad();
    // signup();
  }, []);

  console.log(window.location.pathname === "/blank");

  const notBlank = () => (
    <div>
      <NavBar></NavBar>
      {children}
      <Footer></Footer>
    </div>
  );
  const blank = () => <div></div>;
  return (
    <div>{window.location.pathname === "/blank" ? blank() : notBlank()}</div>
  );
};

export default connect(null, {
  checkAuthenticated,
  loadUser,
  // RolesLoad,
  // signup,
})(Layout);
