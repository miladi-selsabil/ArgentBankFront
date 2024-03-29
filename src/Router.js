
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Layout from "./Pages/Layout";
import Sign from "./Pages/Sign";
import Content from "./Pages/Content";
import Profile from "./Pages/Profile";
function Router() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Layout />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/sign" element={<Sign />} />
          <Route exact path="/content" element={<Content />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default Router;
