import { createTemplate } from "@/services/contractTemplates/create";
import { destroy } from "@/services/contractTemplates/destory";
import React from "react";
import { index } from "@/services/contractTemplates/index";
import { IContractTemplate } from "@/models/ContractTemplate";

const Admin = () => {
  const destroyAllTemplates = async () => {
    const templates = await index();
    const templatesArray = JSON.parse(templates);
    templatesArray.forEach(async (template: IContractTemplate) => {
      await destroy(template._id);
    });
  };
  return (
    <div>
      <h1>Admin</h1>
      <button onClick={() => createTemplate()}>Create Template</button>
      <button onClick={() => destroyAllTemplates()}>
        Destroy All Templates
      </button>
    </div>
  );
};

export default Admin;
