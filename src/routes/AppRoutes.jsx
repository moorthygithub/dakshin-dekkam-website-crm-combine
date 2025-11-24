import { Route, Routes } from "react-router-dom";

// CRM Imports
import Login from "@/crm/app/auth/Login";
import Dashboard from "@/crm/app/dashboard/Dashboard";
import EventAttendMember from "@/crm/app/event/Event/EventAttendMember";
import EventForm from "@/crm/app/event/Event/EventForm";
import EventList from "@/crm/app/event/Event/EventList";
import EventMemberTractList from "@/crm/app/event/EventMemberTrack/EventMemberTractList";
import EventRegisterList from "@/crm/app/event/EventRegister/EventRegisterList";
import MemberActiveList from "@/crm/app/member/MemberActiveList";
import MemberForm from "@/crm/app/member/MemberForm";
import MemberInactiveList from "@/crm/app/member/MemberInactiveList";
import MemberList from "@/crm/app/member/MemberList";
import NewRegister from "@/crm/app/newregister/NewRegister";
import PanelNotFound from "@/crm/app/PanelNotFound/PanelNotFound";
import EventReport from "@/crm/app/report/EventReport/EventReport";
import EventSummaryReport from "@/crm/app/report/EventSummaryReport/EventSummaryReport";
import Maintenance from "@/crm/components/common/Maintenance";
import SessionTimeoutTracker from "@/crm/components/SessionTimeoutTracker/SessionTimeoutTracker";
import AppInitializer from "@/crm/utils/AppInitializer";
import VersionCheck from "@/crm/utils/VersionCheck";
import useLogout from "@/hooks/useLogout";
import Extra from "@/website/Extra/Extra";
import MainLayout from "@/website/layout/MainLayout";
import About from "@/website/pages/About/About";
import Community from "@/website/pages/Community/Community";
import Contact from "@/website/pages/Contact/Contact";
import Gallery from "@/website/pages/Gallery/Gallery";
import Home from "@/website/pages/Home";
import Member from "@/website/pages/Member/Member";
import WebsiteNotFound from "@/website/pages/NotFound/WebsiteNotFound";
import Signup from "@/website/pages/SiginUp/Signup";
import { useSelector } from "react-redux";
import AuthRoute from "./AuthRoute";
import ProtectedRoute from "./ProtectedRoute";
import MemberReport from "@/crm/app/report/MemberReport/MemberReport";
import BookingRoom from "@/website/pages/BookingRoom/BookingRoom";
import LoanIndex from "@/website/pages/loan/LoanIndex";
import BookingFormList from "@/crm/app/booking-form/BookingFormList";
import BhavanIndex from "@/website/pages/bhavan/BhavanIndex";

// Website Imports

const AppRoutes = () => {
  const time = useSelector((state) => state.auth.token_expire_time);
  const handleLogout = useLogout();
  return (
    <Routes>
      {/* CRM AUTH ROUTES */}
      <Route
        path="/crm"
        element={
          <AppInitializer>
            <SessionTimeoutTracker expiryTime={time} onLogout={handleLogout} />
            <VersionCheck />
            <AuthRoute />
          </AppInitializer>
        }
      >
        <Route index element={<Login />} />
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="*" element={<PanelNotFound />} />
      </Route>

      {/* CRM PROTECTED ROUTES */}
      <Route
        path="/crm"
        element={
          <AppInitializer>
            <SessionTimeoutTracker expiryTime={time} onLogout={handleLogout} />
            <VersionCheck />
            <ProtectedRoute />
          </AppInitializer>
        }
      >
        <Route path="home" element={<Dashboard />} />
        <Route path="new-register" element={<NewRegister />} />
        <Route path="member" element={<MemberList />} />
        <Route path="active-member" element={<MemberActiveList />} />
        <Route path="inactive-member" element={<MemberInactiveList />} />
        <Route path="member-form" element={<MemberForm />} />
        <Route path="member-form/:id" element={<MemberForm />} />
        <Route path="event" element={<EventList />} />
        <Route path="event-form" element={<EventForm />} />
        <Route path="event-form/:id" element={<EventForm />} />
        <Route path="event-member-attend/:id" element={<EventAttendMember />} />
        <Route path="event-register" element={<EventRegisterList />} />
        <Route path="event-track" element={<EventMemberTractList />} />


        <Route path="booking-form" element={<BookingFormList />} />


        <Route path="report-event" element={<EventReport />} />
        <Route path="report-event-summary" element={<EventSummaryReport />} />
        <Route path="report-member" element={<MemberReport />} />
        <Route path="*" element={<PanelNotFound />} />
      </Route>

      {/* WEBSITE ROUTES */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="aboutus" element={<About />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="member" element={<Member />} />
        <Route path="signup" element={<Signup />} />
        <Route path="community" element={<Community />} />
        <Route path="contact" element={<Contact />} />
        <Route path="booking-room" element={<BookingRoom />} />
        <Route path="loan" element={<LoanIndex />} />
        <Route path="bhavan-rorm" element={<BhavanIndex />} />
        <Route path="*" element={<WebsiteNotFound />} />
      </Route>
      <Route path="extra" element={<Extra />} />
    </Routes>
  );
};

export default AppRoutes;
