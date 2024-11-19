import { IContractDocument } from "@/models/ContractDocument";
import { index } from "@/services/contractDocuments";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContractVersionTile from "./ContractVersionTile";

const ContractVersions = () => {
  const { contractId } = useParams();
  const [contractDocuments, setContractDocuments] = useState<
    IContractDocument[]
  >([]);

  useEffect(() => {
    const fetchContractDocuments = async () => {
      if (!contractId) return;
      const contractDocumentsResponse = await index(contractId);
      setContractDocuments(JSON.parse(contractDocumentsResponse));
    };
    fetchContractDocuments();
  }, [contractId]);
  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-4">
      {contractDocuments.map((contractDocument) => (
        <ContractVersionTile
          contractDocument={contractDocument}
          key={contractDocument._id}
        />
      ))}
    </div>
  );
};

export default ContractVersions;
