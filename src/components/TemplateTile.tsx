import React from "react";
import { IContractTemplate } from "@/models/ContractTemplate";

type Props = {
  template: IContractTemplate;
};

const TemplateTile = ({ template }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center border border-gray-300 rounded-md p-4 cursor-pointer">
      <p className="text-lg font-bold">{template.name}</p>
      <p className="text-sm text-gray-500">{template.description}</p>
    </div>
  );
};

export default TemplateTile;
