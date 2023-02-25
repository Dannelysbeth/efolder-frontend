import React from "react";
import { useState } from "react";
import "../css/app.css";
import { login, checkAuthenticated, loadUser } from "../../Actions/auth";
import { connect } from "react-redux";

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

  if (isAuthenticated) {
    window.location.replace("/");
    // return <Navigate to="/"></Navigate>;
  }

  return (
    <section className=" gradient-form ">
      <div className="d-flex flex-column min-vh-100 flex-row  py-5 h-100 center">
        <div className="row d-flex justify-content-center align-items-center h-100 ">
          <div className="d-flex flex-column min-vh-100 flex-row">
            <div className="row g-0 ">
              {errors != null && errors.message != null ? (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <strong>Username or password is incorrect</strong>
                </div>
              ) : null}
            </div>
            <div className="card ">
              <div className="row g-0 ">
                <div className="col-md-6 col-lg-6 d-none d-md-block">
                  <img
                    src="https://i.imgur.com/nauR3Dl.png"
                    className="img-fluid-1"
                  />
                </div>

                <div className="col-md-6 col-lg-6 d-flex align-items-center">
                  <div className="form-signin ">
                    <form onSubmit={(e) => onSubmit(e)}>
                      <h1 className="h3 mb-3 fw-normal center-text-2">
                        Sign in
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
                        <label>Username</label>
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
                        <label>Password</label>
                      </div>
                      <p>
                        <p>
                          {errors != null && errors.message != null
                            ? "Username or password is incorrect"
                            : ""}
                        </p>
                      </p>
                      <button
                        className="w-100 button-blue-lp btn btn-lg btn-white  btn-bold"
                        type="submit"
                      >
                        Sign in
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
