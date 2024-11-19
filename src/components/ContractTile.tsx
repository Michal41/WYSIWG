import React from "react";
import { IContract } from "@/models/Contract";
import { useNavigate } from "react-router-dom";
type Props = {
  contract: IContract;
};

const ContractTile = ({ contract }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col justify-center items-center border border-gray-300 rounded-md p-4 cursor-pointer"
      onClick={() => navigate(`/foo`)}
    >
      <p className="text-lg font-bold">{contract.name}</p>
      <p className="text-sm text-gray-500">{contract.clientName}</p>
    </div>
  );
};

export default ContractTile;
