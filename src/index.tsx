import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Layout from "./hocs/Layout/Layout";
import store from "./store";
import HomePage from "./Pages/MainPage/MainPage";
import PageNotFound from "./Pages/NotFoundPage/NotFoundPage";
import MainPage from "./Pages/MainPage/MainPage";
import AboutUsPage from "./Pages/AboutUsPage/AboutUsPage";
import UserPage from "./Pages/UserPage/UserPageDemo";
import UserInfoPage from "./Pages/UserPage/UserPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import ScrollToTop from "./Actions/ScrollToTop";
import BlankPage from "./Pages/BlankPage/BlankPage";
import OAuth2RedirectPage from "./Pages/OAuth2RedirectPage/OAuth2RedirectPage";
import MyDocumentsPage from "./Pages/UserPage/UserPage"; //AnotherUserPage
import AnotherUserPage from "./Pages/UserPage/AnotherUserPage";
import DocumentsPage from "./Pages/UserPage/MyDocumentsPage";
import UploadDocumentPage from "./Pages/UploadDocumentPage/UploadDocumentPage";
import ViewDocumentsPage from "./Pages/ViewDocumentsPage/ViewDocumentsPage";
import EmployeeListPage from "./Pages/EmployeeListPage/EmployeeListPage";
import PasswordChangePage from "./Pages/PasswordChangePage/PasswordChangePage";

const routing = (
  <div>
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            {/* Routes available to everyone */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />}></Route>
            {/* Protected routes */}
            <Route>
              <Route path="/konto" element={<UserPage />} />
              <Route path="/o-nas" element={<AboutUsPage />} />
              <Route path="/kartoteka" element={<MyDocumentsPage />} />
              <Route path="/pracownicy" element={<EmployeeListPage />} />
              <Route path="/zmienHaslo" element={<PasswordChangePage />} />
              <Route path="/createUser" element={<RegisterPage />} />{" "}
              <Route path="/user">
                <Route path="/user/:username/" element={<AnotherUserPage />}>
                  <Route path="kartoteka" element={<DocumentsPage />} />
                  <Route path="daneOsobowe" element={<UserInfoPage />} />
                  <Route
                    path="dodajDokumenty"
                    element={<UploadDocumentPage />}
                  />
                  <Route path="zmienHaslo" element={<PasswordChangePage />} />
                </Route>
              </Route>
              <Route path="/uploadFile" element={<UploadDocumentPage />} />
              <Route path="/mojeDocumenty" element={<DocumentsPage />} />
            </Route>
            {/* route that doesnt exist */}
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </Layout>
      </Router>
    </Provider>
  </div>
);

ReactDOM.render(routing, document.getElementById("root"));

{
  /* // If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals */
}
reportWebVitals();
