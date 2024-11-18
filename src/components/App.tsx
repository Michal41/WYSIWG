"use client";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import TemplateList from "./TemplateList";

export default function App() {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route path="/" Component={TemplateList} />
      </Routes>
    </BrowserRouter>
  );
}
