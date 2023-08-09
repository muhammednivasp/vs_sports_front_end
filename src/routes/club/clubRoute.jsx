import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../../components/user/login";
import Clubsignup from "../../components/club/Clubsignup";
import Home from '../../pages/home'
import ClubProtect from "./clubProtected";
import ClubPublic from "./clubPublic";
import ClubProfile from "../../pages/clubProfile";
import EditProfile from "../../pages/editClubProfile"
import ChangeClubPassword from "../../pages/changeClubPassword";
import AnnounceTournament from "../../pages/announceNewTournament";
import ClubEmailVerify from "../../components/EmailVerify/clubMailVerify";
import ClubEmailVerifyToEdit from "../../components/EmailVerify/clubEmailVerifyToEdit";
import ClubEmailForgotVerify from "../../components/EmailVerify/clubEmailForgotVerify"
import ManageTournament from "../../pages/manage"
import AnnouncedShow from "../../pages/announcedShow";
import AddTournament from "../../pages/addTournament";
import ShowAnnounced from "../../components/showannounced/showAnnounced"
import TournamentShow from "../../pages/tournamentShow"
import TournamentPage from "../../pages/tournamentpage";
import ClubsPage from "../../pages/clubspage";
import SuccessPage from "../../pages/successpage";
import Failure from "../../pages/failure";
import DetailsPage from "../../pages/detailsPage";
import MatchManage from "../../pages/matchManage";
import Matches from "../../pages/Matches";
import MatchesView from "../../pages/matchesView";
import Images from "../../components/images/Images";
import TicketSuccessPage from "../../pages/ticketSuccessPage";
import MyTickets from "../../pages/myTickets";
import ManageTickets from "../../pages/manageTickets";

function ClubRoute() {
  return (
    <Routes>
      <Route path="/login" element={<ClubPublic><Login /></ClubPublic>} />
      <Route path="/:id/forgotverify/:token" element={<ClubPublic><ClubEmailForgotVerify /></ClubPublic>} />

      <Route path="/clubsignup" element={<ClubPublic><Clubsignup /></ClubPublic>} />
      <Route path="/:id/verify/:token" element={<ClubPublic><ClubEmailVerify /></ClubPublic>} />


      <Route path="/home" element={<ClubProtect><Home /></ClubProtect>} />
      <Route path="/clubprofile" element={<ClubProtect><ClubProfile /></ClubProtect>} />
      <Route path="/editprofile" element={<ClubProtect><EditProfile /></ClubProtect>} />
      <Route path="/:id/verifyclubtoedit/:token" element={<ClubProtect><ClubEmailVerifyToEdit /></ClubProtect>} />
      <Route path="/changepassword" element={<ClubProtect><ChangeClubPassword /></ClubProtect>} />
      <Route path="/announce" element={<ClubProtect><AnnounceTournament /></ClubProtect>} />
      <Route path="/manage" element={<ClubProtect><ManageTournament /></ClubProtect>} />
      <Route path="/showannounced" element={<ClubProtect><AnnouncedShow /></ClubProtect>} />
      <Route path="/addtournament" element={<ClubProtect><AddTournament /></ClubProtect>} />
      <Route path="/show" element={<ClubProtect><ShowAnnounced /></ClubProtect>} />
      <Route path="/showtournament" element={<ClubProtect><TournamentShow /></ClubProtect>} />
      <Route path="/tournamentpage" element={<ClubProtect><TournamentPage /></ClubProtect>} />
      <Route path="/clubspage" element={<ClubProtect><ClubsPage/></ClubProtect>} />
      <Route path="/failure" element={<ClubProtect><Failure/></ClubProtect>} />
      <Route path="/successpage" element={<ClubProtect><SuccessPage/></ClubProtect>} />
      <Route path="/details" element={<ClubProtect><DetailsPage/></ClubProtect>} />
      <Route path="/matchmanage" element={<ClubProtect><MatchManage/></ClubProtect>} />
      <Route path="/matches" element={<ClubProtect><Matches/></ClubProtect>} />
      <Route path="/matchesview" element={<ClubProtect><MatchesView/></ClubProtect>} />
      <Route path="/imageupload" element={<ClubProtect><Images/></ClubProtect>} />
      <Route path="/ticketsuccesspage" element={<ClubProtect><TicketSuccessPage/></ClubProtect>} />
      <Route path="/ticketshow" element={<ClubProtect><MyTickets/></ClubProtect>} />
      <Route path="/managetickets" element={<ClubProtect><ManageTickets/></ClubProtect>} />

      







      










    </Routes>
  );
}

export default ClubRoute