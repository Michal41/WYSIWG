"use client";
import React, { useEffect, useState } from "react";
import { index } from "@/services/contractTemplates";
import { IContractTemplate } from "@/models/ContractTemplate";
import TemplateTile from "./TemplateTile";
import { Link } from "react-router-dom";
const TemplateList = () => {
  const [templates, setTemplates] = useState<IContractTemplate[]>([]);
  useEffect(() => {
    const fetchTemplates = async () => {
      const templatesResponse = await index();
      const templates: IContractTemplate[] = JSON.parse(templatesResponse);
      setTemplates(templates);
    };
    fetchTemplates();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-4">
      {templates.map((template) => (
        <TemplateTile key={template._id} template={template} />
      ))}

      <Link to="/contracts">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          View Contracts
        </button>
      </Link>
    </div>
  );
};

export default TemplateList;
