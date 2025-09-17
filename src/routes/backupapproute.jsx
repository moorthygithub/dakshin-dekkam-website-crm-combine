import { Route, Routes } from "react-router-dom";

// CRM Imports
import Login from "@/crm/app/auth/Login";
import Dashboard from "@/crm/app/dashboard/Dashboard";
import PanelNotFound from "@/crm/app/PanelNotFound/PanelNotFound";
import EventAttendMember from "@/crm/app/event/Event/EventAttendMember";
import EventForm from "@/crm/app/event/Event/EventForm";
import EventList from "@/crm/app/event/Event/EventList";
import EventMemberTractList from "@/crm/app/event/EventMemberTrack/EventMemberTractList";
import EventRegisterList from "@/crm/app/event/EventRegister/EventRegisterList";
import MemberForm from "@/crm/app/member/MemberForm";
import MemberList from "@/crm/app/member/MemberList";
import EventReport from "@/crm/app/report/EventReport/EventReport";
import Maintenance from "@/crm/components/common/Maintenance";
import MainLayout from "@/website/layout/MainLayout";
import About from "@/website/pages/About/About";
import Community from "@/website/pages/Community/Community";
import Contact from "@/website/pages/Contact/Contact";
import Gallery from "@/website/pages/Gallery/Gallery";
import Home from "@/website/pages/Home";
import Member from "@/website/pages/Member/Member";
import AuthRoute from "./AuthRoute";
import ProtectedRoute from "./ProtectedRoute";
import AppInitializer from "@/crm/utils/AppInitializer";
import SessionTimeoutTracker from "@/crm/components/SessionTimeoutTracker/SessionTimeoutTracker";
import useLogout from "@/hooks/useLogout";
import { Provider, useSelector } from "react-redux";
import VersionCheck from "@/crm/utils/VersionCheck";
import WebsiteNotFound from "@/website/pages/NotFound/WebsiteNotFound";
import EventSummaryReport from "@/crm/app/report/EventSummaryReport/EventSummaryReport";
import MemberActiveList from "@/crm/app/member/MemberActiveList";
import MemberInactiveList from "@/crm/app/member/MemberInactiveList";
import NewRegister from "@/crm/app/newregister/NewRegister";
import store from "@/crm/redux/store";

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
          <Provider store={store}>
            <AppInitializer>
              <SessionTimeoutTracker
                expiryTime={time}
                onLogout={handleLogout}
              />
              <VersionCheck />
              <AuthRoute />
            </AppInitializer>
          </Provider>
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
          <Provider store={store}>
            <AppInitializer>
              <SessionTimeoutTracker
                expiryTime={time}
                onLogout={handleLogout}
              />
              <VersionCheck />
              <ProtectedRoute />
            </AppInitializer>
          </Provider>
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
        <Route path="report-event" element={<EventReport />} />
        <Route path="report-event-summary" element={<EventSummaryReport />} />
        <Route path="*" element={<PanelNotFound />} />
      </Route>

      {/* WEBSITE ROUTES */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="member" element={<Member />} />
        <Route path="community" element={<Community />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<WebsiteNotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
