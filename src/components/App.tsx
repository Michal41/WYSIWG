"use client";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import TemplateList from "./TemplateList";
import CreateContract from "./CreateContract";
import ContractList from "./ContractList";
import Admin from "./Admin";
import ContractVersions from "./ContractVersions";
import EditContract from "./EditContract";
import CompareContractVersions from "./CompareContractVersions";

export default function App() {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route path="/" Component={TemplateList} />
        <Route path="/create/:templateId" Component={CreateContract} />
        <Route path="/admin" Component={Admin} />
        <Route path="/contracts" Component={ContractList} />
        <Route
          path="/contracts/:contractId/contract-documents"
          Component={ContractVersions}
        />
        <Route path="/contracts/:contractId/edit" Component={EditContract} />
        <Route
          path="/contracts/:contractId/compare/:contractVersionFromId/:contractVersionToId"
          Component={CompareContractVersions}
        />
      </Routes>
    </BrowserRouter>
  );
}
