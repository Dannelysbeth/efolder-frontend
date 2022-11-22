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
import NewsPage from "./Pages/NewsPage/NewsPage";
import AboutUsPage from "./Pages/AboutUsPage/AboutUsPage";
import UserPage from "./Pages/UserPage/UserPageDemo";
import RulesPage from "./Pages/RulesPage/RulesPage";
import ContactPage from "./Pages/ContactPage/ContactPage";
import OpenHoursPage from "./Pages/OpenHoursPage/OpenHoursPage";
import BuyTicketPage from "./Pages/BuyTicketPage/BuyTicketPage";
import LiftsPage from "./Pages/LiftsPage/LiftsPage";
import PricePage from "./Pages/PricePage/PricePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import ScrollToTop from "./Actions/ScrollToTop";
import BlankPage from "./Pages/BlankPage/BlankPage";
import HelpPage from "./Pages/HelpPage/HelpPage";
import OAuth2RedirectPage from "./Pages/OAuth2RedirectPage/OAuth2RedirectPage";
import EndpaymentPage from "./Pages/EndpaymentPage/EndpaymentPage";
import CancelPaymentPage from "./Pages/CancelPaymentPage/CancelPaymentPage";
import MyDocumentsPage from "./Pages/UserPage/UserPage"; //AnotherUserPage
import AnotherUserPage from "./Pages/UserPage/AnotherUserPage";

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
              <Route path="/createUser" element={<RegisterPage />} />
              <Route path="/user/*" element={<AnotherUserPage />} />
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
