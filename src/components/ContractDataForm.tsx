import React from "react";
import { ContractData } from "./CreateContract";

const ContractDataForm = ({
  contractData,
  setContractData,
}: {
  contractData: ContractData;
  setContractData: (contractData: ContractData) => void;
}) => {
  return (
    <div className="flex flex-row justify-center items-center gap-2 mb-2">
      <input
        className="border-2 border-gray-300 rounded-md p-2"
        placeholder="Contract Name"
        type="text"
        value={contractData.name}
        onChange={(e) =>
          setContractData({ ...contractData, name: e.target.value })
        }
      />
      <input
        className="border-2 border-gray-300 rounded-md p-2"
        placeholder="Customer Name"
        type="text"
        value={contractData.customerName}
        onChange={(e) =>
          setContractData({ ...contractData, customerName: e.target.value })
        }
      />
    </div>
  );
};

export default ContractDataForm;
