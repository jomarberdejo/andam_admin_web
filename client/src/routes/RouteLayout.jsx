import React, { useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "@/components/header";
import Home from "@/pages/guest";
import Dashboard from "@/pages/dashboard";
import Reports from "@/pages/reports";
import Profile from "@/pages/profile";
import Maps from "@/pages/maps";
import { useAuth } from "@/context/AuthContext";
import AgencyAdmin from "@/pages/admins";
import { ContactForm } from "@/pages/profile/_custom_components/contact-form";
import { AccountForm } from "@/pages/profile/_custom_components/account-form";

import SocketManager from "@/socket/socketManager";
import ReportItem from "@/pages/reports/_custom_components/report-item";
import NotFound from "@/pages/404";
import Resident from "@/pages/residents";
import ResidentProfile from "@/pages/residents/_custom_components/resident-profile";

const RouteLayout = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn && (
        <>
          <SocketManager />
          <Header />
        </>
      )}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/:id" element={<ReportItem />} />
            <Route path="/admins" element={<AgencyAdmin />} />
            <Route path="/residents" element={<Resident />} />
            <Route path="/residents/:id" element={<ResidentProfile />} />
            <Route path="/profile/" element={<Profile />}>
              <Route path="account" element={<AccountForm />} />
              <Route path="contact" element={<ContactForm />} />
              <Route index element={<Navigate to="/profile/account" />} />
            </Route>
            <Route path="/maps" element={<Maps />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default RouteLayout;
