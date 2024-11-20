import React, { useEffect, useState } from "react";
import { index } from "@/services/contracts";
import { IContract } from "@/models/Contract";
import ContractTile from "./ContractTile";

const ContractList = () => {
  const [contracts, setContracts] = useState<IContract[]>([]);
  useEffect(() => {
    const fetchContracts = async () => {
      const contractsResponse = await index();
      setContracts(JSON.parse(contractsResponse));
    };
    fetchContracts();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-4">
      {contracts.map((contract) => (
        <ContractTile key={contract._id} contract={contract} />
      ))}
    </div>
  );
};

export default ContractList;
