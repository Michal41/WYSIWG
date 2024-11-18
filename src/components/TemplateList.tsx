"use client";
import React, { useEffect, useState } from "react";
import { index } from "@/services/contractTemplates";
import { IContractTemplate } from "@/models/ContractTemplate";
import TemplateTile from "./TemplateTile";
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
    </div>
  );
};

export default TemplateList;
