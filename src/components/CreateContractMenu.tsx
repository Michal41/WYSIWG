import React from "react";

interface CreateContractMenuProps {
  createContract: () => void;
}

const CreateContractMenu = ({ createContract }: CreateContractMenuProps) => {
  return (
    <div className="fixed bottom-0 w-full">
      <div className="flex justify-center items-center mb-5 gap-4">
        <button
          className="bg-[#1a1919] text-white p-2 rounded-md px-4"
          onClick={createContract}
        >
          Create
        </button>
        <button className="bg-[#1a1919] text-white p-2 rounded-md px-4">
          Reset
        </button>
      </div>
    </div>
  );
};

export default CreateContractMenu;
