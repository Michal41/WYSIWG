import React from "react";
import { IContractDocument } from "@/models/ContractDocument";

type Props = {
  contractDocument: IContractDocument;
  active: boolean;
  onClick: () => void;
};

const ContractVersionTile = ({ contractDocument, active, onClick }: Props) => {
  return (
    <div
      style={{
        backgroundColor: active ? "#1a1919" : "white",
        color: active ? "white" : "#1a1919",
        fontWeight: active ? "bold" : "normal",
      }}
      className="flex flex-col justify-center items-center border border-gray-300 rounded-md p-4 cursor-pointer"
      key={contractDocument.createdAt?.toString()}
      onClick={onClick}
    >
      {new Date(contractDocument.createdAt ?? "").toLocaleDateString()}
    </div>
  );
};

export default ContractVersionTile;
