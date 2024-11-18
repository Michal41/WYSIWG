import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IContractTemplate } from "@/models/ContractTemplate";
import { show } from "@/services/contractTemplates/show";

const CreateContract = () => {
  const { templateId } = useParams();
  const [template, setTemplate] = useState<IContractTemplate | null>(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!templateId) return;
      const templateResponse = await show(templateId);
      const template: IContractTemplate = JSON.parse(templateResponse);
      setTemplate(template);
    };
    fetchTemplate();
  }, [templateId]);

  return <div>{template?.name}</div>;
};

export default CreateContract;
