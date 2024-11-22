import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { IContractTemplate } from "@/models/ContractTemplate";
import { show } from "@/services/contractTemplates/show";
import BlockEditor from "./BlockEditor/BlockEditor";
import CreateContractMenu from "./CreateContractMenu";
import ContractDataForm from "./ContractDataForm";
import { BlockEditorRef } from "./BlockEditor/BlockEditor";
import { create } from "@/services/contracts/create";
import { useNavigate } from "react-router-dom";
export interface ContractData {
  name: string;
  customerName: string;
}

const CreateContract = () => {
  const { templateId } = useParams();
  const blockEditorRef = useRef<BlockEditorRef>(null);
  const [template, setTemplate] = useState<IContractTemplate | null>(null);
  const navigate = useNavigate();
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

  const createContract = async () => {
    const content = blockEditorRef.current?.getContent();
    await create({
      name: contractData.name,
      clientName: contractData.customerName,
      document: JSON.stringify(content),
    });
    navigate("/contracts");
  };

  return (
    <div>
      <div className="mt-4 flex flex-col justify-center items-center">
        <ContractDataForm
          contractData={contractData}
          setContractData={setContractData}
        />
        <div>
          {template?.content && (
            <BlockEditor content={template?.content} ref={blockEditorRef} />
          )}
        </div>
      </div>
      <CreateContractMenu createContract={createContract} />
    </div>
  );
};

export default CreateContract;
