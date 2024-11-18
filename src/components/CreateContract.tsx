import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IContractTemplate } from "@/models/ContractTemplate";

const CreateContract = () => {
  const { templateId } = useParams();
  const [template, setTemplate] = useState<IContractTemplate | null>(null);

  useEffect(() => {
    console.log(templateId);
  }, [templateId]);

  return <div>CreateContract</div>;
};

export default CreateContract;
