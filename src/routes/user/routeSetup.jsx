import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "../../components/user/signup";
import Login from "../../components/user/login";
import Home from '../../pages/home'
import UserProtect from "./userProtected";
import UserPublic from "./userPublic";
import UserProfile from "../../pages/userProfile";
import EditUserProfile from "../../pages/editUserProfile";
import ChangeUserPassword from "../../pages/changeUserPassword";
import EmailVerify from "../../components/EmailVerify/emailVerify";
import EmailVerifyToEdit from "../../components/EmailVerify/EmailVerifyToEdit";
import EmailForgotVerify from "../../components/EmailVerify/EmailForgotVerify";
import ShowAnnounced from "../../components/showannounced/showAnnounced";
import TournamentPage from "../../pages/tournamentpage";
import ClubsPage from "../../pages/clubspage";
import Failure from "../../pages/failure";
import SuccessPage from "../../pages/successpage";
import MatchesView from "../../pages/matchesView";




function UserRoute() {
  return (
    <Routes>
      <Route path="/login" element={<UserPublic><Login /></UserPublic>} />
      <Route path="/:id/forgotverify/:token" element={<UserPublic><EmailForgotVerify /></UserPublic>} />

      <Route path="/signup" element={<UserPublic><Signup /></UserPublic>} />
      <Route path="/:id/verify/:token" element={<UserPublic><EmailVerify /></UserPublic>} />


      <Route path="/home" element={<UserProtect><Home /></UserProtect>} />
      <Route path="/profile" element={<UserProtect><UserProfile /></UserProtect>} />
      <Route path="/editprofile" element={<UserProtect><EditUserProfile /></UserProtect>} />
      <Route path="/:id/verifytoedit/:token" element={<UserProtect><EmailVerifyToEdit /></UserProtect>} />

      <Route path="/changepassword" element={<UserProtect><ChangeUserPassword /></UserProtect>} />
      <Route path="/show" element={<UserProtect><ShowAnnounced /></UserProtect>} />
      <Route path="/tournamentpage" element={<UserProtect><TournamentPage /></UserProtect>} />
      <Route path="/clubspage" element={<UserProtect><ClubsPage/></UserProtect>} />
      <Route path="/failure" element={<UserProtect><Failure/></UserProtect>} />
      <Route path="/successpage" element={<UserProtect><SuccessPage/></UserProtect>} />
      <Route path="/matchesview" element={<UserProtect><MatchesView/></UserProtect>} />



      








    </Routes>
  );
}

export default UserRoute