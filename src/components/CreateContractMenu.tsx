import React from "react";

const CreateContractMenu = () => {
  return (
    <div className="fixed bottom-0 w-full">
      <div className="flex justify-center items-center mb-5 gap-4">
        <button className="bg-[#1a1919] text-white p-2 rounded-md px-4">
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