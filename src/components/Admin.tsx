import { createTemplate } from "@/services/contractTemplates/create";
import { destroy } from "@/services/contractTemplates/destory";
import React from "react";
import { index } from "@/services/contractTemplates/index";
import { IContractTemplate } from "@/models/ContractTemplate";
import { IContract } from "@/models/Contract";
import { index as indexContracts } from "@/services/contracts/index";
import { destroy as destroyContract } from "@/services/contracts/destory";
const Admin = () => {
  const destroyAllTemplates = async () => {
    const templates = await index();
    const templatesArray = JSON.parse(templates);
    templatesArray.forEach(async (template: IContractTemplate) => {
      await destroy(template._id);
    });
  };

  const destroyAllContracts = async () => {
    const contracts = await indexContracts();
    const contractsArray = JSON.parse(contracts);
    contractsArray.forEach(async (contract: IContract) => {
      await destroyContract(contract._id);
    });
  };
  return (
    <div>
      <h1>Admin</h1>
      <button onClick={() => createTemplate()}>Create Template</button>
      <button onClick={() => destroyAllTemplates()}>
        Destroy All Templates
      </button>
      <button onClick={() => destroyAllContracts()}>
        Destroy All Contracts
      </button>
    </div>
  );
};

export default Admin;
