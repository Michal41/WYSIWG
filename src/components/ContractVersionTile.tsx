import React from "react";
import { IContractDocument } from "@/models/ContractDocument";

type Props = {
  contractDocument: IContractDocument;
};

const ContractVersionTile = ({ contractDocument }: Props) => {
  return (
    <div
      className="flex flex-col justify-center items-center border border-gray-300 rounded-md p-4 cursor-pointer"
      key={contractDocument.createdAt?.toString()}
    >
      {new Date(contractDocument.createdAt ?? "").toLocaleDateString()}
    </div>
  );
};

export default ContractVersionTile;
