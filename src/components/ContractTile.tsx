import React from "react";
import { IContract } from "@/models/Contract";
import { useNavigate } from "react-router-dom";
type Props = {
  contract: IContract;
};

const ContractTile = ({ contract }: Props) => {
  const navigate = useNavigate();
  console.log("contract", contract);
  return (
    <div
      className="flex flex-col justify-center items-center border border-gray-300 rounded-md p-4 cursor-pointer"
      onClick={() => navigate(`/contracts/${contract._id}/contract-documents`)}
    >
      <p className="text-lg font-bold">{contract.name}</p>
      <p className="text-sm text-gray-500">{contract.clientName}</p>
      {contract.metadata?.contractStartDate && (
        <p className="text-sm text-gray-500">
          Contract start date: {contract.metadata?.contractStartDate}
        </p>
      )}
      {contract.metadata?.contractEndDate && (
        <p className="text-sm text-gray-500">
          Contract end date: {contract.metadata?.contractEndDate}
        </p>
      )}
      {contract.metadata?.liquefaction && (
        <p className="text-sm text-gray-500">
          Liquefaction rate: {contract.metadata?.liquefaction}
        </p>
      )}
    </div>
  );
};

export default ContractTile;
