import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import CompanyDetail from "./pages/CompanyDetail";
import ReportDetail from "./pages/ReportDetail";
import Strategist from "./pages/Strategist";
import Submit from "./pages/Submit";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/companies" element={<Companies />} />

        <Route
          path="/companies/:id"
          element={<CompanyDetail />}
        />

        <Route
          path="/reports/:id"
          element={<ReportDetail />}
        />

        <Route
          path="/strategist"
          element={<Strategist />}
        />

        <Route
          path="/submit"
          element={<Submit />}
        />

        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Layout>
  );
}