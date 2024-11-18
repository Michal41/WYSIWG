"use client";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import TemplateList from "./TemplateList";
import CreateContract from "./CreateContract";
import Admin from "./Admin";

export default function App() {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route path="/" Component={TemplateList} />
        <Route path="/create/:templateId" Component={CreateContract} />
        <Route path="/admin" Component={Admin} />
      </Routes>
    </BrowserRouter>
  );
}
