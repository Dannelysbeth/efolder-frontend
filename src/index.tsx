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
import AboutUsPage from "./Pages/AboutUsPage/AboutUsPage";
import UserInfoPage from "./Pages/UserPage/UserPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import AnotherUserPage from "./Pages/UserPage/AnotherUserPage";
import UploadDocumentPage from "./Pages/UploadDocumentPage/UploadDocumentPage";
import ViewDocumentsPage from "./Pages/ViewDocumentsPage/ViewDocumentsPage";
import EmployeeListPage from "./Pages/EmployeeListPage/EmployeeListPage";
import PasswordChangePage from "./Pages/PasswordChangePage/PasswordChangePage";
import ForbiddenPage from "./Pages/ForbiddenPage/ForbiddenPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import ChangeOwnPasswordPage from "./Pages/ChangeOwnPasswordPage/ChangeOwnPasswordPage";
import DocumentsPage from "./Pages/DocumentsPage/DocumentsPage";
import MyFilesPage from "./Pages/DocumentsPage/MyFilesPage/MyFilesPage";
import AFilesPage from "./Pages/DocumentsPage/MyFilesPage/AFilesPage";
import BFilePage from "./Pages/DocumentsPage/MyFilesPage/BFilesPage";
import CFilesPage from "./Pages/DocumentsPage/MyFilesPage/CFilesPage";
import DFilesPage from "./Pages/DocumentsPage/MyFilesPage/DFilesPage";
import UploadMyFilesPage from "./Pages/DocumentsPage/UploadMyFilesPage/UploadMyFilesPage";
import UploadPicture from "./Pages/UploadPicture/UploadPicture";
import SuperAdminPermPage from "./Pages/SuperAdminPermPage/SuperAdminPermPage";
import CreateTeamPage from "./Pages/CreateTeamPage/CreateTeamPage";
import TeamViewPage from "./Pages/TeamsViewPage/TeamsViewPage";
import ViewMyTeamspage from "./Pages/TeamsViewPage/ViewMyTeamspage";
import TeamPage from "./Pages/TeamPage/TeamPage";
import PersonalInfoPage from "./Pages/ProfilePage/PersonalInfoPage";

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
              <Route path="/forbidden" element={<ForbiddenPage />} />
              <Route path="/o-nas" element={<AboutUsPage />} />{" "}
              <Route path="/createTeam" element={<CreateTeamPage />} />
              <Route path="/viewTeams" element={<TeamViewPage />} />
              <Route path="/viewMyTeams" element={<ViewMyTeamspage />} />
              <Route path="/team">
                <Route path="/team/:teamName" element={<TeamPage />} />
              </Route>
              <Route path="/:profil" element={<ProfilePage />}>
                <Route path="info" element={<PersonalInfoPage />} />
                {/* <Route path="kartoteka/" element={<DocumentsPage />}> */}
                <Route path="dokumenty" element={<MyFilesPage />}>
                  <Route path="A" element={<AFilesPage />} />
                  <Route path="B" element={<BFilePage />} />
                  <Route path="C" element={<CFilesPage />} />
                  <Route path="D" element={<DFilesPage />} />
                </Route>
                {/* </Route> */}
                <Route path="dodajDokumenty" element={<UploadMyFilesPage />} />
                <Route path="zmienHaslo" element={<ChangeOwnPasswordPage />} />
              </Route>
              <Route path="/pracownicy" element={<EmployeeListPage />} />
              <Route path="/uploadProfilePic" element={<UploadPicture />} />
              <Route path="/createUser" element={<RegisterPage />} />{" "}
              <Route path="/user">
                <Route path="/user/:username/" element={<AnotherUserPage />}>
                  <Route path="kartoteka" element={<ViewDocumentsPage />} />
                  <Route path="daneOsobowe" element={<UserInfoPage />} />
                  <Route path="adminRole" element={<SuperAdminPermPage />} />
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

reportWebVitals();
