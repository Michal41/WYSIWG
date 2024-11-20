import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchWithLatestDocument } from "@/services/contracts/fetchWithLatestDocument";
import { useEffect, useState } from "react";
import { IContractDocument } from "@/models/ContractDocument";
import { IContract } from "@/models/Contract";
import BlockEditor, { BlockEditorRef } from "./BlockEditor/BlockEditor";
import CreateContractMenu from "./CreateContractMenu";
import { create } from "@/services/contractDocuments/create";
import { useNavigate } from "react-router-dom";

const EditContract = () => {
  const navigate = useNavigate();
  const { contractId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setContract] = useState<IContract>();
  const [latestDocument, setLatestDocument] = useState<IContractDocument>();
  const blockEditorRef = useRef<BlockEditorRef>(null);

  useEffect(() => {
    const fetchContract = async () => {
      if (!contractId) return;
      const { contract, latestDocument } = JSON.parse(
        await fetchWithLatestDocument(contractId),
      );
      setContract(contract);
      setLatestDocument(latestDocument);
    };
    fetchContract();
  }, [contractId]);

  const createNewVersionOfDocument = async () => {
    if (!contractId) return;
    const document = blockEditorRef.current?.getContent();
    await create({ document: JSON.stringify(document), contractId });
    navigate("/contract/thank-you");
  };

  return (
    <div>
      <div className="mt-4 flex flex-col justify-center items-center">
        {latestDocument?.content && (
          <BlockEditor content={latestDocument?.content} ref={blockEditorRef} />
        )}
        <CreateContractMenu
          createContract={createNewVersionOfDocument}
          buttonLabel="Save"
        />
      </div>
    </div>
  );
};

export default EditContract;
