import React, { useState } from "react";
import { icons } from "lucide-react";

interface Props {
  initialValue: string;
  placeholder: string;
  onSubmit: (value: string) => void;
}

const TextInput = (props: Props) => {
  const { initialValue, placeholder, onSubmit } = props;
  const [value, setValue] = useState(initialValue);
  return (
    <div className="flex">
      <input
        type="text"
        className="px-1 rounded-md"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div
        onClick={() => onSubmit(value)}
        className="p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer"
      >
        <icons.Check />
      </div>
    </div>
  );
};

export default TextInput;
