import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IContractTemplate } from "@/models/ContractTemplate";
import { show } from "@/services/contractTemplates/show";
import BlockEditor from "./BlockEditor/BlockEditor";
import CreateContractMenu from "./CreateContractMenu";
import ContractDataForm from "./ContractDataForm";

export interface ContractData {
  name: string;
  customerName: string;
}

const CreateContract = () => {
  const { templateId } = useParams();
  const [template, setTemplate] = useState<IContractTemplate | null>(null);
  const [contractData, setContractData] = useState<ContractData>({
    name: "",
    customerName: "",
  });

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!templateId) return;
      const templateResponse = await show(templateId);
      const template: IContractTemplate = JSON.parse(templateResponse);
      setTemplate(template);
    };
    fetchTemplate();
  }, [templateId]);

  return (
    <div>
      <div className="mt-4 flex flex-col justify-center items-center">
        <ContractDataForm
          contractData={contractData}
          setContractData={setContractData}
        />
        <div>
          {template?.content && <BlockEditor content={template?.content} />}
        </div>
      </div>
      <CreateContractMenu />
    </div>
  );
};

export default CreateContract;
