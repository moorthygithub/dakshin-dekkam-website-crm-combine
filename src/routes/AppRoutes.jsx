// import Login from "@/crm/app/auth/Login";
// import Dashboard from "@/crm/app/dashboard/Dashboard";
// import NotFound from "@/crm/app/errors/NotFound";
// import EventForm from "@/crm/app/event/Event/EventForm";
// import EventList from "@/crm/app/event/Event/EventList";
// import EventMemberTractList from "@/crm/app/event/EventMemberTrack/EventMemberTractList";
// import EventRegisterList from "@/crm/app/event/EventRegister/EventRegisterList";
// import MemberForm from "@/crm/app/member/MemberForm";
// import MemberList from "@/crm/app/member/MemberList";
// import Maintenance from "@/crm/components/common/Maintenance";
// import { Route, Routes } from "react-router-dom";
// import AuthRoute from "./AuthRoute";
// import ProtectedRoute from "./ProtectedRoute";
// import EventReport from "@/crm/app/report/EventReport/EventReport";
// import EventDetailsReport from "@/crm/app/report/EventDetailsReport/EventDetailsReport";
// import RegisteredNotScanned from "@/crm/app/report/RegisteredNotScanned/RegisteredNotScanned";
// import EventAttendMember from "@/crm/app/event/Event/EventAttendMember";
// import NotRegisterNotScanned from "@/crm/app/report/NotregisteredNotScanned/NotRegisterNotScanned";
// import LoginPage from "@/crm/components/loginAuth/LoginPage";
// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<AuthRoute />}>
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/maintenance" element={<Maintenance />} />
//       </Route>
//       <Route path="/" element={<ProtectedRoute />}>
//         <Route path="/home" element={<Dashboard />} />
//         <Route path="/member" element={<MemberList />} />
//         <Route path="/member-form" element={<MemberForm />} />
//         <Route path="/member-form/:id" element={<MemberForm />} />
//         <Route path="/event" element={<EventList />} />
//         <Route
//           path="/event-member-attend/:id"
//           element={<EventAttendMember />}
//         />
//         <Route path="/event-form" element={<EventForm />} />
//         <Route path="/event-form/:id" element={<EventForm />} />
//         <Route path="/event-register" element={<EventRegisterList />} />
//         <Route path="/event-track" element={<EventMemberTractList />} />
//         <Route path="/report-event" element={<EventReport />} />
//         <Route path="/report-event-details" element={<EventDetailsReport />} />
//         <Route
//           path="/report-register-notscanned"
//           element={<RegisteredNotScanned />}
//         />
//         <Route
//           path="/report-notregister-notscanned"
//           element={<NotRegisterNotScanned />}
//         />
//       </Route>
//       <Route path="*" element={<NotFound />} />

//       <Route element={<MainLayout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/gallery" element={<Gallery />} />
//           <Route path="/member" element={<Member />} />
//           <Route path="/community" element={<Community />} />
//           <Route path="/member" element={<Member />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

// export default AppRoutes;
import { Route, Routes } from "react-router-dom";

// CRM Imports
import Login from "@/crm/app/auth/Login";
import Dashboard from "@/crm/app/dashboard/Dashboard";
import NotFound from "@/crm/app/errors/NotFound";
import EventForm from "@/crm/app/event/Event/EventForm";
import EventList from "@/crm/app/event/Event/EventList";
import EventMemberTractList from "@/crm/app/event/EventMemberTrack/EventMemberTractList";
import EventRegisterList from "@/crm/app/event/EventRegister/EventRegisterList";
import MemberForm from "@/crm/app/member/MemberForm";
import MemberList from "@/crm/app/member/MemberList";
import Maintenance from "@/crm/components/common/Maintenance";
import AuthRoute from "./AuthRoute";
import ProtectedRoute from "./ProtectedRoute";
import EventReport from "@/crm/app/report/EventReport/EventReport";
import EventDetailsReport from "@/crm/app/report/EventDetailsReport/EventDetailsReport";
import RegisteredNotScanned from "@/crm/app/report/RegisteredNotScanned/RegisteredNotScanned";
import EventAttendMember from "@/crm/app/event/Event/EventAttendMember";
import NotRegisterNotScanned from "@/crm/app/report/NotregisteredNotScanned/NotRegisterNotScanned";
import LoginPage from "@/crm/components/loginAuth/LoginPage";
import MainLayout from "@/website/src/layout/MainLayout";
import Home from "@/website/src/pages/Home";
import About from "@/website/src/pages/About/About";
import Gallery from "@/website/src/pages/Gallery/Gallery";
import Member from "@/website/src/pages/Member/Member";
import Community from "@/website/src/pages/Community/Community";
import Contact from "@/website/src/pages/Contact/Contact";

// Website Imports

const AppRoutes = () => {
  return (
    <Routes>
      {/* CRM AUTH ROUTES */}
      <Route path="/crm" element={<AuthRoute />}>
        <Route index element={<Login />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="maintenance" element={<Maintenance />} />
      </Route>

      {/* CRM PROTECTED ROUTES */}
      <Route path="/crm" element={<ProtectedRoute />}>
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
        <Route
          path="report-register-notscanned"
          element={<RegisteredNotScanned />}
        />
        <Route
          path="report-notregister-notscanned"
          element={<NotRegisterNotScanned />}
        />
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
