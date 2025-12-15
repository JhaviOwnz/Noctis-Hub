import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import OesPlanner from "./pages/OesPlanner";
import OesPlannerFull from "./pages/OesPlannerFull";
import ExecutiveInsights from "./pages/ExecutiveInsights";
import Refunds from "./pages/Refunds";

import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Rutas que usan el layout principal */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/oes-planner" element={<OesPlanner />} />
          <Route path="/executive-insights" element={<ExecutiveInsights />} />
          <Route path="/refunds" element={<Refunds />} />
        </Route>

        {/* OE&S en pantalla completa, sin layout */}
        <Route path="/oes-planner/full" element={<OesPlannerFull />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
