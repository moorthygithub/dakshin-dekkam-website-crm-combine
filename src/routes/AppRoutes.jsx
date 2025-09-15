import { Route, Routes } from "react-router-dom";

// CRM Imports
import Login from "@/crm/app/auth/Login";
import Dashboard from "@/crm/app/dashboard/Dashboard";
import NotFound from "@/crm/app/errors/NotFound";
import EventAttendMember from "@/crm/app/event/Event/EventAttendMember";
import EventForm from "@/crm/app/event/Event/EventForm";
import EventList from "@/crm/app/event/Event/EventList";
import EventMemberTractList from "@/crm/app/event/EventMemberTrack/EventMemberTractList";
import EventRegisterList from "@/crm/app/event/EventRegister/EventRegisterList";
import MemberForm from "@/crm/app/member/MemberForm";
import MemberList from "@/crm/app/member/MemberList";
import EventDetailsReport from "@/crm/app/report/EventDetailsReport/EventDetailsReport";
import EventReport from "@/crm/app/report/EventReport/EventReport";
import Maintenance from "@/crm/components/common/Maintenance";
import MainLayout from "@/website/src/layout/MainLayout";
import About from "@/website/src/pages/About/About";
import Community from "@/website/src/pages/Community/Community";
import Contact from "@/website/src/pages/Contact/Contact";
import Gallery from "@/website/src/pages/Gallery/Gallery";
import Home from "@/website/src/pages/Home";
import Member from "@/website/src/pages/Member/Member";
import AuthRoute from "./AuthRoute";
import ProtectedRoute from "./ProtectedRoute";
import AppInitializer from "@/crm/utils/AppInitializer";
import SessionTimeoutTracker from "@/crm/components/SessionTimeoutTracker/SessionTimeoutTracker";
import useLogout from "@/hooks/useLogout";
import { useSelector } from "react-redux";
import VersionCheck from "@/crm/utils/VersionCheck";

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
        <Route path="member" element={<MemberList />} />
        <Route path="member-form" element={<MemberForm />} />
        <Route path="member-form/:id" element={<MemberForm />} />
        <Route path="event" element={<EventList />} />
        <Route path="event-form" element={<EventForm />} />
        <Route path="event-form/:id" element={<EventForm />} />
        <Route path="event-member-attend/:id" element={<EventAttendMember />} />
        <Route path="event-register" element={<EventRegisterList />} />
        <Route path="event-track" element={<EventMemberTractList />} />
        <Route path="report-event" element={<EventReport />} />
        <Route path="report-event-details" element={<EventDetailsReport />} />
      </Route>

      {/* WEBSITE ROUTES */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="member" element={<Member />} />
        <Route path="community" element={<Community />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* CATCH-ALL */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
