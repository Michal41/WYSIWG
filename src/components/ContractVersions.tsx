import { IContractDocument } from "@/models/ContractDocument";
import { index } from "@/services/contractDocuments";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContractVersionTile from "./ContractVersionTile";
import Button from "./Button";

const ContractVersions = () => {
  const { contractId } = useParams();
  const navigate = useNavigate();
  const [activeContractDocumentId, setActiveContractDocumentId] = useState<
    string[]
  >([]);
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

  const addContractToActive = (contractDocumentId: string) => {
    if (activeContractDocumentId.includes(contractDocumentId)) {
      setActiveContractDocumentId(
        activeContractDocumentId.filter((id) => id !== contractDocumentId),
      );
    } else {
      if (activeContractDocumentId.length < 2) {
        setActiveContractDocumentId([
          ...activeContractDocumentId,
          contractDocumentId,
        ]);
      }
    }
  };

  const compareContractVersions = () => {
    if (activeContractDocumentId.length === 2) {
      navigate(
        `/contracts/${contractId}/compare/${activeContractDocumentId[0]}/${activeContractDocumentId[1]}`,
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-4">
      {contractDocuments.map((contractDocument) => (
        <ContractVersionTile
          contractDocument={contractDocument}
          key={contractDocument._id}
          active={activeContractDocumentId.includes(contractDocument._id)}
          onClick={() => addContractToActive(contractDocument._id)}
        />
      ))}
      <Button label="Compare" onClick={compareContractVersions} />
    </div>
  );
};

export default ContractVersions;
