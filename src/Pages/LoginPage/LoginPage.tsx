import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./LoginPage.css";
import { login, checkAuthenticated, loadUser } from "../../Actions/auth";
import { connect } from "react-redux";
import axios from "axios";

const LoginPage = ({ login, isAuthenticated, errors, user }) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const { name, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(name, password);
    loadUser();

    // setFormData({ name, password });
  };

  // const continueWithGoogle = () => {
  //     const site = window.location.hostname === "localhost" ? "http://localhost:3000" : "https://projekt-pp-tab-2022-frontend.herokuapp.com"   ;
  //     window.location.replace("https://projekt-pp-tab-2022.herokuapp.com/oauth2/authorize/google?redirect_uri=:site/google".replace(":site", site));
  // };

  if (isAuthenticated) {
    window.location.replace("/");
    // return <Navigate to="/"></Navigate>;
  }

  return (
    <section className="vh-100 gradient-form">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="d-flex flex-column min-vh-100">
            <div className="card">
              <div className="row g-0">
                <div className="col-md-6 col-lg-6 d-none d-md-block">
                  <img
                    src="https://i.imgur.com/nauR3Dl.png"
                    className="img-fluid-1"
                  />
                </div>
                <div className="col-md-6 col-lg-6 d-flex align-items-center">
                  <div className="form-signin ">
                    <form onSubmit={(e) => onSubmit(e)}>
                      <h1 className="h3 mb-3 fw-normal text-center ">
                        Zaloguj się
                      </h1>

                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="name"
                          placeholder="name"
                          value={name}
                          onChange={(e) => onChange(e)}
                        />
                        <label>Nazwa użytkownika</label>
                      </div>
                      <div className="form-floating form-myBox">
                        <input
                          type="password"
                          className="form-control"
                          id="floatingPassword"
                          name="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => onChange(e)}
                        />
                        <label>Hasło</label>
                      </div>
                      <p>
                        {/* <p>{errors !== null ? errors.message : ""}</p> */}
                      </p>
                      <button
                        className="w-100 btn btn-lg button-blue-lp "
                        type="submit"
                      >
                        Zaloguj się
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  login,
  loadUser,
  checkAuthenticated,
})(LoginPage);
